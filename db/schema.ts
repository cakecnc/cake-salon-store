import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const purchaseRequests = sqliteTable("purchase_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  product: text("product").notNull(),
  provider: text("provider").notNull(),
  reference: text("reference").notNull(),
  buyerEmail: text("buyer_email").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at").notNull(),
  issuedAt: integer("issued_at"),
}, (table) => [uniqueIndex("purchase_provider_reference").on(table.provider, table.reference)]);

export const accessCodes = sqliteTable("access_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  codeHash: text("code_hash").notNull().unique(),
  product: text("product").notNull(),
  expiresAt: integer("expires_at").notNull(),
  maxActivations: integer("max_activations").notNull().default(2),
  activationCount: integer("activation_count").notNull().default(0),
  sourceProvider: text("source_provider").notNull(),
  sourceReference: text("source_reference").notNull(),
  buyerEmail: text("buyer_email").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: integer("created_at").notNull(),
});

export const accessSessions = sqliteTable("access_sessions", {
  tokenHash: text("token_hash").primaryKey(),
  codeId: integer("code_id").notNull().references(() => accessCodes.id),
  product: text("product").notNull(),
  expiresAt: integer("expires_at").notNull(),
  createdAt: integer("created_at").notNull(),
});
