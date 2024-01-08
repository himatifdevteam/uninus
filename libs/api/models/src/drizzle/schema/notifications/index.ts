import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "..";

export const notifications = pgTable("app_notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  detail: text("detail"),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  users: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
