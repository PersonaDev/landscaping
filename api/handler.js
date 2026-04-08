// Self-contained Vercel serverless function — no workspace TypeScript imports
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── DB ────────────────────────────────────────────────────────────────────────
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function ensureSchema() {
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
}
ensureSchema().catch(console.error);

// ── Auth ──────────────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

function signToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/api/healthz", (_req, res) => res.json({ status: "ok" }));

app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.json({ token: signToken() });
});

// Public: list published posts
app.get("/api/posts", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, excerpt, cover_image_url AS "coverImageUrl",
              published_at AS "publishedAt", created_at AS "createdAt"
       FROM posts WHERE published = true ORDER BY published_at DESC`
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Admin: list all posts
app.get("/api/posts/all", requireAuth, async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, excerpt, body, cover_image_url AS "coverImageUrl",
              published, published_at AS "publishedAt",
              created_at AS "createdAt", updated_at AS "updatedAt"
       FROM posts ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Public: single post by slug
app.get("/api/posts/:slug", async (req, res) => {
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
  } catch {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Admin: create post
app.post("/api/posts", requireAuth, async (req, res) => {
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
    if (err.code === "23505") return res.status(409).json({ error: "A post with that slug already exists" });
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Admin: update post
app.put("/api/posts/:slug", requireAuth, async (req, res) => {
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
  } catch {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Admin: delete post
app.delete("/api/posts/:slug", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM posts WHERE slug = $1 RETURNING id", [req.params.slug]
    );
    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
