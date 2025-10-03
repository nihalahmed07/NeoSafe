import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema from the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// New schema for data breaches
export const breaches = pgTable("breaches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  domain: text("domain"),
  breachDate: text("breach_date").notNull(),
  addedDate: text("added_date").notNull(),
  modifiedDate: text("modified_date"),
  pwnCount: integer("pwn_count").notNull(),
  description: text("description").notNull(),
  logoPath: text("logo_path"),
  dataClasses: text("data_classes").array().notNull(),
  isVerified: boolean("is_verified").default(true),
  isFabricated: boolean("is_fabricated").default(false),
  isSensitive: boolean("is_sensitive").default(false),
  isRetired: boolean("is_retired").default(false),
  isSpamList: boolean("is_spam_list").default(false),
});

export const insertBreachSchema = createInsertSchema(breaches).omit({ 
  id: true 
});

export type InsertBreach = z.infer<typeof insertBreachSchema>;
export type Breach = typeof breaches.$inferSelect;

// Schema for storing compromised data
export const compromisedData = pgTable("compromised_data", {
  id: serial("id").primaryKey(),
  dataType: text("data_type").notNull(), // "email", "phone", "password"
  dataHash: text("data_hash").notNull(), // Hashed value of the data
  breachIds: integer("breach_ids").array().notNull(), // Array of breach IDs where this data appeared
});

export const insertCompromisedDataSchema = createInsertSchema(compromisedData).omit({
  id: true
});

export type InsertCompromisedData = z.infer<typeof insertCompromisedDataSchema>;
export type CompromisedData = typeof compromisedData.$inferSelect;

// Schema for password hash prefixes
export const passwordPrefixes = pgTable("password_prefixes", {
  id: serial("id").primaryKey(),
  prefix: text("prefix").notNull().unique(), // First 5 characters of SHA-1 hash
  suffixes: text("suffixes").array().notNull(), // Array of hash suffixes
  counts: integer("counts").array().notNull(), // Array of occurrence counts corresponding to each suffix
});

export const insertPasswordPrefixSchema = createInsertSchema(passwordPrefixes).omit({
  id: true
});

export type InsertPasswordPrefix = z.infer<typeof insertPasswordPrefixSchema>;
export type PasswordPrefix = typeof passwordPrefixes.$inferSelect;

// For API responses
export type BreachSearchResult = {
  found: boolean;
  breaches: Breach[];
  count: number;
};

export type PasswordCheckResult = {
  found: boolean;
  count: number;
};

export type PhoneSearchResult = {
  found: boolean;
  breaches: Breach[];
  count: number;
};
