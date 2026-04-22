import { Router } from "express";
import { verifyPassword, signToken } from "../lib/auth.js";

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

router.post("/auth/login", (req, res) => {
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

  const { password } = req.body as { password?: string };
  if (!password || !verifyPassword(password)) {
    const existing = record && now - record.firstAttemptAt <= WINDOW_MS
      ? record
      : { count: 0, firstAttemptAt: now, lockedUntil: 0 };
    existing.count += 1;
    if (existing.count >= MAX_ATTEMPTS) {
      existing.lockedUntil = now + WINDOW_MS;
    }
    attempts.set(ip, existing);

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

  attempts.delete(ip);
  res.json({ token: signToken() });
});

export default router;
