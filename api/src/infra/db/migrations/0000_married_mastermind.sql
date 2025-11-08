CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"cpf" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
