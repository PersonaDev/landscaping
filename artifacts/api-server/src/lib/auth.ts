import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

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

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function signToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
