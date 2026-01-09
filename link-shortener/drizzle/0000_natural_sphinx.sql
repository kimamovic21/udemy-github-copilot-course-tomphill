CREATE TABLE "shortened_links" (
	"id" varchar PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"code" varchar NOT NULL,
	"url" text NOT NULL,
	"user_id" varchar NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "shortened_links_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE INDEX "shortened_links_code_idx" ON "shortened_links" USING btree ("code");--> statement-breakpoint
CREATE INDEX "shortened_links_user_id_idx" ON "shortened_links" USING btree ("user_id");