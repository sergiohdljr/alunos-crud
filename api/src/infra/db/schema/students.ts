import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

export const studentTable = pgTable("students", {
    id: serial().primaryKey(),
    cpf: text().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});