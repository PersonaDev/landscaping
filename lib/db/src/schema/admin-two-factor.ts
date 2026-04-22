import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const adminTwoFactorTable = pgTable("admin_two_factor", {
  id: serial("id").primaryKey(),
  secret: text("secret").notNull(),
  enabled: boolean("enabled").notNull().default(false),
  recoveryCodes: text("recovery_codes").array().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type AdminTwoFactor = typeof adminTwoFactorTable.$inferSelect;
