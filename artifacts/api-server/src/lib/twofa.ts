import crypto from "node:crypto";
import { authenticator } from "otplib";
import qrcode from "qrcode";
import { db, adminTwoFactorTable } from "@workspace/db";
import { eq } from "drizzle-orm";

authenticator.options = { window: 1 };

const ISSUER = "EDH Landscaping Admin";
const ACCOUNT = "admin";
const RECOVERY_CODE_COUNT = 10;

export interface TwoFactorRow {
  id: number;
  secret: string;
  enabled: boolean;
  recoveryCodes: string[];
}

export async function getTwoFactor(): Promise<TwoFactorRow | null> {
  const rows = await db.select().from(adminTwoFactorTable).limit(1);
  return rows[0] ?? null;
}

export async function isTwoFactorEnabled(): Promise<boolean> {
  const row = await getTwoFactor();
  return !!row?.enabled;
}

export interface SetupResult {
  secret: string;
  otpauthUrl: string;
  qrDataUrl: string;
}

export async function startEnrollment(): Promise<SetupResult> {
  const secret = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(ACCOUNT, ISSUER, secret);
  const qrDataUrl = await qrcode.toDataURL(otpauthUrl);

  const existing = await getTwoFactor();
  if (existing) {
    await db
      .update(adminTwoFactorTable)
      .set({ secret, enabled: false, recoveryCodes: [], updatedAt: new Date() })
      .where(eq(adminTwoFactorTable.id, existing.id));
  } else {
    await db.insert(adminTwoFactorTable).values({
      secret,
      enabled: false,
      recoveryCodes: [],
    });
  }

  return { secret, otpauthUrl, qrDataUrl };
}

function generateRecoveryCode(): string {
  // 10 hex chars, formatted as xxxxx-xxxxx for readability
  const raw = crypto.randomBytes(5).toString("hex");
  return `${raw.slice(0, 5)}-${raw.slice(5, 10)}`;
}

function hashRecoveryCode(code: string): string {
  return crypto.createHash("sha256").update(code.trim().toLowerCase()).digest("hex");
}

export interface ConfirmResult {
  recoveryCodes: string[];
}

export async function confirmEnrollment(code: string): Promise<ConfirmResult | null> {
  const row = await getTwoFactor();
  if (!row) return null;
  if (!authenticator.verify({ token: code, secret: row.secret })) return null;

  const plainCodes = Array.from({ length: RECOVERY_CODE_COUNT }, generateRecoveryCode);
  const hashed = plainCodes.map(hashRecoveryCode);

  await db
    .update(adminTwoFactorTable)
    .set({ enabled: true, recoveryCodes: hashed, updatedAt: new Date() })
    .where(eq(adminTwoFactorTable.id, row.id));

  return { recoveryCodes: plainCodes };
}

export async function disableTwoFactor(): Promise<void> {
  await db.delete(adminTwoFactorTable);
}

/**
 * Verify a 6-digit TOTP code OR a recovery code. If a recovery code is used,
 * it is consumed (removed from the stored set).
 */
export async function verifyTwoFactorCode(code: string): Promise<boolean> {
  const row = await getTwoFactor();
  if (!row || !row.enabled) return false;
  const trimmed = code.trim();

  if (/^\d{6}$/.test(trimmed)) {
    return authenticator.verify({ token: trimmed, secret: row.secret });
  }

  const hashed = hashRecoveryCode(trimmed);
  const idx = row.recoveryCodes.indexOf(hashed);
  if (idx === -1) return false;

  const remaining = row.recoveryCodes.filter((_, i) => i !== idx);
  await db
    .update(adminTwoFactorTable)
    .set({ recoveryCodes: remaining, updatedAt: new Date() })
    .where(eq(adminTwoFactorTable.id, row.id));
  return true;
}
