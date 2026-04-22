// Self-contained Vercel serverless function — no workspace TypeScript imports
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Startup env dump ──────────────────────────────────────────────────────────
const ENV_KEYS = [
  "DATA_DATABASE_URL", "DATA_POSTGRES_URL", "DATA_PGHOST",
  "DATABASE_URL", "DATA_URL", "POSTGRES_URL", "POSTGRES_URL_NON_POOLING",
  "DATABASE_URL_UNPOOLED", "PGHOST", "PGPORT", "PGUSER", "PGDATABASE",
  "ADMIN_PASSWORD", "JWT_SECRET",
];
console.log("[startup] env var presence check:");
for (const k of ENV_KEYS) {
  const v = process.env[k];
  if (v) {
    console.log(`  ${k} = SET (${v.length} chars, starts: ${v.slice(0, 20)}...)`);
  } else {
    console.log(`  ${k} = NOT SET`);
  }
}

// ── DB ────────────────────────────────────────────────────────────────────────
const connStr =
  process.env.DATA_DATABASE_URL ||
  process.env.DATA_POSTGRES_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.DATA_URL ||
  process.env.DATABASE_URL_UNPOOLED;

console.log("[db] resolved connStr:", connStr ? `SET (${connStr.length} chars, starts: ${connStr.slice(0, 30)}...)` : "NOT SET — all DB env vars are missing");

let pool;
try {
  pool = new Pool({
    connectionString: connStr,
    ssl: (connStr || "").includes("localhost") ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  console.log("[db] pool created");
} catch (err) {
  console.error("[db] pool creation failed:", err.message, err.stack);
}

async function ensureSchema() {
  if (!pool) { console.error("[db] ensureSchema skipped — no pool"); return; }
  console.log("[db] running ensureSchema...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id            SERIAL PRIMARY KEY,
      title         TEXT NOT NULL,
      slug          TEXT NOT NULL UNIQUE,
      excerpt       TEXT NOT NULL DEFAULT '',
      body          TEXT NOT NULL DEFAULT '',
      cover_image_url TEXT,
      published     BOOLEAN NOT NULL DEFAULT false,
      published_at  TIMESTAMP,
      created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_config (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  console.log("[db] schema ready");
}
ensureSchema().catch((err) => console.error("[db] ensureSchema failed:", err.message, err.stack));

// ── Auth ──────────────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function signToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  const out = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

function isHttps(req) {
  if (req.secure) return true;
  const xfp = req.headers["x-forwarded-proto"];
  if (typeof xfp === "string" && xfp.split(",")[0].trim() === "https") return true;
  return false;
}

function setSessionCookie(req, res, token) {
  const parts = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${Math.floor(SESSION_MAX_AGE_MS / 1000)}`,
  ];
  if (isHttps(req)) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function clearSessionCookie(req, res) {
  const parts = [
    `${SESSION_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
  ];
  if (isHttps(req)) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function requireAuth(req, res, next) {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE_NAME];
  if (!token) {
    // Backward-compat: still accept Bearer token in case anything depends on it
    const header = req.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      try {
        jwt.verify(header.slice(7), JWT_SECRET);
        return next();
      } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// trust the single Vercel edge proxy so req.secure / req.ip are correct
app.set("trust proxy", 1);

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/api/healthz", (_req, res) => res.json({ status: "ok" }));

// Debug endpoint — shows env presence and tests DB connectivity
app.get("/api/debug", async (_req, res) => {
  const envReport = {};
  for (const k of ENV_KEYS) {
    const v = process.env[k];
    envReport[k] = v ? `SET (${v.length} chars)` : "NOT SET";
  }
  envReport._connStrResolved = connStr
    ? `${connStr.slice(0, 35)}...`
    : "NONE";

  let dbTest = "not attempted";
  if (pool) {
    try {
      const t0 = Date.now();
      await pool.query("SELECT 1");
      dbTest = `ok (${Date.now() - t0}ms)`;
    } catch (err) {
      dbTest = `FAILED: ${err.message}`;
    }
  } else {
    dbTest = "FAILED: no pool";
  }

  res.json({ env: envReport, db: dbTest });
});

app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }
  // 2FA is not yet provisioned in production; if it ever is, this endpoint
  // would also check req.body.code. For now login succeeds with password only.
  setSessionCookie(req, res, signToken());
  res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ ok: true });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  clearSessionCookie(req, res);
  res.json({ ok: true });
});

// 2FA is not configured in production. Return a stable "disabled" response
// so the admin Security tab renders without errors.
app.get("/api/auth/2fa/status", requireAuth, (_req, res) => {
  res.json({ enabled: false, pending: false, remainingRecoveryCodes: 0 });
});

app.post("/api/auth/2fa/setup", requireAuth, (_req, res) => {
  res.status(501).json({ error: "2FA enrollment is not available on this deployment yet." });
});

app.post("/api/auth/2fa/enable", requireAuth, (_req, res) => {
  res.status(501).json({ error: "2FA enrollment is not available on this deployment yet." });
});

app.post("/api/auth/2fa/disable", requireAuth, (_req, res) => {
  res.status(501).json({ error: "2FA is not enabled on this deployment." });
});

// ── Plan config ──────────────────────────────────────────────────────────────

const DEFAULT_PLAN_CONFIG = {
  frequencies: [
    { label: "Monthly", price: 45, text: "monthly" },
    { label: "Bi-weekly", price: 60, text: "bi-weekly", recommended: true },
    { label: "Weekly", price: 90, text: "weekly" },
  ],
  scopes: [
    { label: "Basic", addon: 0, text: "basic" },
    { label: "Full service", addon: 20, text: "full service" },
    { label: "Total care", addon: 40, text: "total care" },
  ],
  services: [
    { name: "Lawn mowing", minScope: 0 },
    { name: "Edging & trimming", minScope: 0 },
    { name: "Driveway blowout", minScope: 0 },
    { name: "Weed control", minScope: 0 },
    { name: "Garden bed care", minScope: 1 },
    { name: "Yard haul-off", minScope: 2 },
    { name: "Front yard service", minScope: 2 },
  ],
};

app.get("/api/plan-config", async (_req, res) => {
  if (!pool) return res.json(DEFAULT_PLAN_CONFIG);
  try {
    const { rows } = await pool.query(
      "SELECT value FROM site_config WHERE key = 'plan_config' LIMIT 1"
    );
    res.json(rows[0] ? rows[0].value : DEFAULT_PLAN_CONFIG);
  } catch (err) {
    console.error("[api] GET /api/plan-config error:", err.message);
    res.json(DEFAULT_PLAN_CONFIG);
  }
});

app.put("/api/plan-config", requireAuth, async (req, res) => {
  if (!pool) return res.status(500).json({ error: "No database pool" });
  try {
    const config = req.body;
    if (!config.frequencies || !config.scopes || !config.services) {
      return res.status(400).json({ error: "Missing frequencies, scopes, or services" });
    }
    await pool.query(
      `INSERT INTO site_config (key, value, updated_at)
       VALUES ('plan_config', $1::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $1::jsonb, updated_at = NOW()`,
      [JSON.stringify(config)]
    );
    res.json({ success: true, config });
  } catch (err) {
    console.error("[api] PUT /api/plan-config error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Public: list published posts
app.get("/api/posts", async (_req, res) => {
  console.log("[api] GET /api/posts — pool exists:", !!pool, "connStr exists:", !!connStr);
  if (!pool) return res.status(500).json({ error: "No database pool — check env vars" });
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, excerpt, cover_image_url AS "coverImageUrl",
              published_at AS "publishedAt", created_at AS "createdAt"
       FROM posts WHERE published = true ORDER BY published_at DESC`
    );
    console.log("[api] GET /api/posts — returned", rows.length, "rows");
    res.json(rows);
  } catch (err) {
    console.error("[api] GET /api/posts error:", err.message, err.stack);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Admin: list all posts
app.get("/api/posts/all", requireAuth, async (_req, res) => {
  console.log("[api] GET /api/posts/all — pool exists:", !!pool, "connStr exists:", !!connStr);
  if (!pool) return res.status(500).json({ error: "No database pool — check env vars" });
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, excerpt, body, cover_image_url AS "coverImageUrl",
              published, published_at AS "publishedAt",
              created_at AS "createdAt", updated_at AS "updatedAt"
       FROM posts ORDER BY created_at DESC`
    );
    console.log("[api] GET /api/posts/all — returned", rows.length, "rows");
    res.json(rows);
  } catch (err) {
    console.error("[api] GET /api/posts/all error:", err.message, err.stack);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Public: single post by slug
app.get("/api/posts/:slug", async (req, res) => {
  if (!pool) return res.status(500).json({ error: "No database pool — check env vars" });
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, excerpt, body, cover_image_url AS "coverImageUrl",
              published, published_at AS "publishedAt",
              created_at AS "createdAt", updated_at AS "updatedAt"
       FROM posts WHERE slug = $1 AND published = true LIMIT 1`,
      [req.params.slug]
    );
    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("[api] GET /api/posts/:slug error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Admin: create post
app.post("/api/posts", requireAuth, async (req, res) => {
  console.log("[api] POST /api/posts — body keys:", Object.keys(req.body));
  if (!pool) return res.status(500).json({ error: "No database pool — check env vars" });
  const { title, slug, excerpt, body, coverImageUrl, published } = req.body;
  if (!title || !slug) return res.status(400).json({ error: "Title and slug are required" });
  try {
    const { rows } = await pool.query(
      `INSERT INTO posts (title, slug, excerpt, body, cover_image_url, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, title, slug, excerpt, body,
                 cover_image_url AS "coverImageUrl", published,
                 published_at AS "publishedAt",
                 created_at AS "createdAt", updated_at AS "updatedAt"`,
      [title, slug, excerpt || "", body || "", coverImageUrl || null,
       !!published, published ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("[api] POST /api/posts error:", err.message, err.stack);
    if (err.code === "23505") return res.status(409).json({ error: "A post with that slug already exists" });
    res.status(500).json({ error: err.message });
  }
});

// Admin: update post
app.put("/api/posts/:slug", requireAuth, async (req, res) => {
  if (!pool) return res.status(500).json({ error: "No database pool — check env vars" });
  const { title, slug: newSlug, excerpt, body, coverImageUrl, published } = req.body;
  try {
    const { rows: existing } = await pool.query(
      "SELECT * FROM posts WHERE slug = $1 LIMIT 1", [req.params.slug]
    );
    if (!existing[0]) return res.status(404).json({ error: "Post not found" });
    const post = existing[0];
    const nowPublished = published !== undefined ? !!published : post.published;
    const publishedAt = (!post.published && nowPublished) ? new Date() : post.published_at;
    const { rows } = await pool.query(
      `UPDATE posts SET
         title = $1, slug = $2, excerpt = $3, body = $4,
         cover_image_url = $5, published = $6, published_at = $7, updated_at = NOW()
       WHERE slug = $8
       RETURNING id, title, slug, excerpt, body,
                 cover_image_url AS "coverImageUrl", published,
                 published_at AS "publishedAt",
                 created_at AS "createdAt", updated_at AS "updatedAt"`,
      [title ?? post.title, newSlug ?? post.slug, excerpt ?? post.excerpt,
       body ?? post.body, coverImageUrl !== undefined ? coverImageUrl : post.cover_image_url,
       nowPublished, publishedAt, req.params.slug]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("[api] PUT /api/posts/:slug error:", err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Admin: delete post
app.delete("/api/posts/:slug", requireAuth, async (req, res) => {
  if (!pool) return res.status(500).json({ error: "No database pool — check env vars" });
  try {
    const { rows } = await pool.query(
      "DELETE FROM posts WHERE slug = $1 RETURNING id", [req.params.slug]
    );
    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("[api] DELETE /api/posts/:slug error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("[global error handler]", err.message, err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
