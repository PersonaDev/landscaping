import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction, CookieOptions } from "express";

const INSECURE_JWT_SECRET = "change-me-in-production";
const INSECURE_ADMIN_PASSWORD = "admin";

const JWT_SECRET = process.env.JWT_SECRET ?? INSECURE_JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? INSECURE_ADMIN_PASSWORD;

const insecureSecrets: string[] = [];
if (JWT_SECRET === INSECURE_JWT_SECRET) insecureSecrets.push("JWT_SECRET");
if (ADMIN_PASSWORD === INSECURE_ADMIN_PASSWORD) insecureSecrets.push("ADMIN_PASSWORD");

if (insecureSecrets.length > 0) {
  const msg = `[SECURITY WARNING] The following environment variables are set to known insecure default values: ${insecureSecrets.join(", ")}. Set strong, unique values before running in production.`;
  if (process.env.NODE_ENV === "production") {
    throw new Error(msg);
  } else {
    console.warn(msg);
  }
}

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function signToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

function sessionCookieOptions(req: Request): CookieOptions {
  return {
    httpOnly: true,
    secure: req.secure || req.protocol === "https",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS,
  };
}

export function setSessionCookie(req: Request, res: Response, token: string): void {
  res.cookie(SESSION_COOKIE_NAME, token, sessionCookieOptions(req));
}

export function clearSessionCookie(req: Request, res: Response): void {
  const { maxAge: _maxAge, ...opts } = sessionCookieOptions(req);
  res.clearCookie(SESSION_COOKIE_NAME, opts);
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = (req.cookies as Record<string, string> | undefined)?.[SESSION_COOKIE_NAME];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
