import { integer, pgTable, varchar, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const scriptsTable = pgTable("scripts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull().default("Novo Script"),
  content: text("content").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const settingsTable = pgTable("settings", {
  id: integer("id").primaryKey(), // Teremos apenas o id=1
  mirroring: boolean("mirroring").notNull().default(true),
  theme: varchar("theme", { length: 50 }).notNull().default("dark"),
  speed: integer("speed").notNull().default(145),
  fontSize: integer("font_size").notNull().default(110),
});
