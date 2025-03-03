import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

// Define Drizzle table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  brand: text("brand").notNull(),
  gender: text("gender").$type<"Men" | "Women" | "Unisex">(),
  images: text("images").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Generate Zod schemas from Drizzle table
export const SelectProductSchema = createSelectSchema(products);
export const InsertProductSchema = createInsertSchema(products);

// Export types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
