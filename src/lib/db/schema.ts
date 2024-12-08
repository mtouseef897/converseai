import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

export const chats = pgTable('chats' ,{

    
id: serial('id').primaryKey(),

pdfName :text('pdf_name').notNull(),
pdfUrl :text('pdf_url').notNull(),
createdAt: timestamp('created_at').notNull().defaultNow(),
userId :varchar('user_id', {length:256}).notNull(),
fileKey:text('file_key').notNull(),
});

export const sharedChats = pgTable('shared_chats', {
  id: serial('id').primaryKey(),
  chatId: integer('chat_id').references(() => chats.id).notNull(), // Link to the `chats` table
  sharedLink: varchar('shared_link', { length: 256 }).notNull().unique(), // Unique shareable link
  createdAt: timestamp('created_at').notNull().defaultNow(), // Timestamp of sharing
});

export type DrizzleChat = typeof chats.$inferSelect;

export const message = pgTable('message', {
    id:serial('id').primaryKey(),
    chatId:integer('chat_id').references(()=>chats.id).notNull(),
    content:text('content').notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
  role:userSystemEnum('role').notNull()
});


export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(), // Reference to the user
  username: varchar('username', { length: 256 }).notNull(), // To store the user's name
  profileImg: varchar('profile_img', { length: 256 }), // URL or path to the user's profile image
  content: text('content').notNull(), // Feedback content
  createdAt: timestamp('created_at').notNull().defaultNow(), // Timestamp for feedback submission
});

export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull().unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 })
    .notNull()
    .unique(),
  stripeSubscriptionId: varchar("stripe_subscription_id", {
    length: 256,
  }).unique(),
  stripePriceId: varchar("stripe_price_id", { length: 256 }),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_ended_at"),
});

export const premiumUsers = pgTable('premium_users', {
  id: serial('id').primaryKey(), // Unique identifier for each premium user
  userId: varchar('user_id', { length: 256 }).notNull(), // Reference to the user, assuming a 'user_id' column in the users table
  payment: varchar('payment', { length: 256 }), // Store payment information (e.g., subscription type or status)
  createdAt: timestamp('created_at').notNull().defaultNow(), // Timestamp when the user became a premium user
});