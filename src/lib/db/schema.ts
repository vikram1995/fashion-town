import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  numeric,
  timestamp,
  boolean,
  varchar,
  jsonb,
  decimal,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

// Define Drizzle table
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    brand: text("brand").notNull(),
    gender: text("gender").$type<"Men" | "Women" | "Unisex">(),
    images: text("images").array().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    // Only index fields used in search/filter
    nameIdx: index("product_name_idx").on(table.name),
    brandIdx: index("product_brand_idx").on(table.brand),
  })
);

// Generate Zod schemas from Drizzle table
export const SelectProductSchema = createSelectSchema(products);
export const InsertProductSchema = createInsertSchema(products);

// Export types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

//For auth

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const authSchema = { user, session, account, verification };

export const address = pgTable("address", {
  id: varchar("id").primaryKey(),
  fullName: varchar("full_name").notNull(),
  streetAddress: varchar("street_address").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  zipCode: varchar("zip_code").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  userId: varchar("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  items: jsonb("items").notNull(),
  total: decimal("total").notNull(),
  status: varchar("status").default("pending"),
  address: jsonb("address").notNull(),
  paymentId: varchar("payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Order = typeof orders.$inferInsert;

export const cartItems = pgTable("cart_items", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  productId: varchar("product_id", { length: 255 }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  size: varchar("size", { length: 50 }),
  color: varchar("color", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Cart Items Relations
export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(user, {
    fields: [cartItems.userId],
    references: [user.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

// Type definitions
export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
