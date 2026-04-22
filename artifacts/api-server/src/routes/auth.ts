import { Router } from "express";
import {
  verifyPassword,
  signToken,
  setSessionCookie,
  clearSessionCookie,
  requireAuth,
} from "../lib/auth.js";
import {
  isTwoFactorEnabled,
  getTwoFactor,
  startEnrollment,
  confirmEnrollment,
  disableTwoFactor,
  verifyTwoFactorCode,
} from "../lib/twofa.js";

const router = Router();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

interface AttemptRecord {
  count: number;
  firstAttemptAt: number;
  lockedUntil: number;
}

const attempts = new Map<string, AttemptRecord>();

function getClientIp(req: import("express").Request): string {
  // Rely on Express's `trust proxy` setting (configured in app.ts) to
  // populate req.ip correctly. Do NOT trust the raw X-Forwarded-For
  // header here — an attacker could spoof it to bypass rate limiting.
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

function pruneAttempts(now: number): void {
  for (const [ip, record] of attempts) {
    if (record.lockedUntil <= now && now - record.firstAttemptAt > WINDOW_MS) {
      attempts.delete(ip);
    }
  }
}

function registerFailure(ip: string, now: number): AttemptRecord {
  const record = attempts.get(ip);
  const existing = record && now - record.firstAttemptAt <= WINDOW_MS
    ? record
    : { count: 0, firstAttemptAt: now, lockedUntil: 0 };
  existing.count += 1;
  if (existing.count >= MAX_ATTEMPTS) {
    existing.lockedUntil = now + WINDOW_MS;
  }
  attempts.set(ip, existing);
  return existing;
}

router.post("/auth/login", async (req, res) => {
  const now = Date.now();
  const ip = getClientIp(req);

  if (attempts.size > 1000) pruneAttempts(now);

  const record = attempts.get(ip);
  if (record && record.lockedUntil > now) {
    const retryAfterSec = Math.ceil((record.lockedUntil - now) / 1000);
    res.setHeader("Retry-After", String(retryAfterSec));
    res.status(429).json({
      error: "Too many attempts. Please try again later.",
      retryAfter: retryAfterSec,
    });
    return;
  }

  const { password, code } = req.body as { password?: string; code?: string };
  if (!password || !verifyPassword(password)) {
    const existing = registerFailure(ip, now);
    if (existing.lockedUntil > now) {
      const retryAfterSec = Math.ceil((existing.lockedUntil - now) / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      res.status(429).json({
        error: "Too many attempts. Please try again later.",
        retryAfter: retryAfterSec,
      });
      return;
    }
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  // Password OK — check 2FA if enabled.
  if (await isTwoFactorEnabled()) {
    if (!code) {
      res.status(401).json({ error: "Two-factor code required", requires2fa: true });
      return;
    }
    const ok = await verifyTwoFactorCode(code);
    if (!ok) {
      const existing = registerFailure(ip, now);
      if (existing.lockedUntil > now) {
        const retryAfterSec = Math.ceil((existing.lockedUntil - now) / 1000);
        res.setHeader("Retry-After", String(retryAfterSec));
        res.status(429).json({
          error: "Too many attempts. Please try again later.",
          retryAfter: retryAfterSec,
        });
        return;
      }
      res.status(401).json({ error: "Invalid two-factor code", requires2fa: true });
      return;
    }
  }

  attempts.delete(ip);
  setSessionCookie(req, res, signToken());
  res.json({ ok: true });
});

router.post("/auth/logout", (req, res) => {
  clearSessionCookie(req, res);
  res.json({ ok: true });
});

router.get("/auth/me", requireAuth, (_req, res) => {
  res.json({ authenticated: true });
});

// --- Two-factor authentication management ---

router.get("/auth/2fa/status", requireAuth, async (_req, res) => {
  const row = await getTwoFactor();
  res.json({
    enabled: !!row?.enabled,
    pending: !!row && !row.enabled,
    remainingRecoveryCodes: row?.enabled ? row.recoveryCodes.length : 0,
  });
});

router.post("/auth/2fa/setup", requireAuth, async (_req, res) => {
  try {
    const result = await startEnrollment();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to start enrollment" });
  }
});

router.post("/auth/2fa/enable", requireAuth, async (req, res) => {
  const { code } = req.body as { code?: string };
  if (!code || !/^\d{6}$/.test(code.trim())) {
    res.status(400).json({ error: "A 6-digit code is required" });
    return;
  }
  const result = await confirmEnrollment(code.trim());
  if (!result) {
    res.status(400).json({ error: "Invalid code or no pending enrollment" });
    return;
  }
  res.json({ ok: true, recoveryCodes: result.recoveryCodes });
});

router.post("/auth/2fa/disable", requireAuth, async (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || !verifyPassword(password)) {
    res.status(401).json({ error: "Password required to disable two-factor auth" });
    return;
  }
  await disableTwoFactor();
  res.json({ ok: true });
});

export default router;
