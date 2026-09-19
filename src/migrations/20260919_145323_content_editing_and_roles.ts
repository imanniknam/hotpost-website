import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'خدمات هات پست' NOT NULL,
  	"intro" varchar DEFAULT 'خدمات پستی مختلف با انتخاب بهترین اپراتور از بین تیپاکس، چاپار، پینکس، ماهکس و ... انجام می‌شود.',
  	"includes_label" varchar DEFAULT 'خدمات شامل',
  	"benefits_label" varchar DEFAULT 'مزایا',
  	"coverage_label" varchar DEFAULT 'پوشش',
  	"courier_coverage_label" varchar DEFAULT 'مدل زمانی و حوزه جغرافیایی',
  	"best_for_label" varchar DEFAULT 'بهترین گزینه برای:',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "shop_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'فروشگاه هات پست' NOT NULL,
  	"intro" varchar DEFAULT 'هر چه برای بسته‌بندی، برچسب‌زنی و ارسال مرسولات لازم دارید — یکجا.',
  	"all_products_heading" varchar DEFAULT 'همه محصولات',
  	"empty_text" varchar DEFAULT 'هنوز محصولی ثبت نشده است.',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'تماس با ما' NOT NULL,
  	"intro" varchar,
  	"phones_label" varchar DEFAULT 'شماره تماس',
  	"hours_label" varchar DEFAULT 'روز و ساعت پاسخگویی',
  	"address_label" varchar DEFAULT 'آدرس',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'editor' NOT NULL;
  -- Everyone who exists before roles were introduced already had full access.
  UPDATE "users" SET "role" = 'admin';
  ALTER TABLE "home_page" ADD COLUMN "hero_primary_label" varchar DEFAULT 'خدمات ما ←';
  ALTER TABLE "home_page" ADD COLUMN "hero_secondary_label" varchar DEFAULT 'تماس با ما';
  ALTER TABLE "home_page" ADD COLUMN "services_heading" varchar DEFAULT 'خدمات اصلی هات پست';
  ALTER TABLE "home_page" ADD COLUMN "services_subheading" varchar DEFAULT 'چهار مدل خدماتی، متناسب با هر کسب‌وکار';
  ALTER TABLE "home_page" ADD COLUMN "services_link_label" varchar DEFAULT 'مشاهده خدمات';
  ALTER TABLE "home_page" ADD COLUMN "shop_heading" varchar DEFAULT 'اقلام فروشگاه هات پست';
  ALTER TABLE "home_page" ADD COLUMN "shop_subheading" varchar DEFAULT 'ملزومات بسته‌بندی، ارسال و تجهیزات چاپ';
  ALTER TABLE "home_page" ADD COLUMN "about_button_label" varchar DEFAULT 'درباره ما ←';
  ALTER TABLE "home_page" ADD COLUMN "faq_heading" varchar DEFAULT 'پرسش‌های متداول';
  ALTER TABLE "home_page" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "home_page" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "customer_portal_label" varchar DEFAULT 'ورود مشتریان';
  ALTER TABLE "site_settings" ADD COLUMN "cart_label" varchar DEFAULT 'سبد خرید';
  ALTER TABLE "site_settings" ADD COLUMN "quick_links_heading" varchar DEFAULT 'دسترسی سریع';
  ALTER TABLE "site_settings" ADD COLUMN "contact_heading" varchar DEFAULT 'تماس با هات پست';
  ALTER TABLE "site_settings" ADD COLUMN "hours_label" varchar DEFAULT 'روز و ساعت پاسخگویی';
  ALTER TABLE "site_settings" ADD COLUMN "address_label" varchar DEFAULT 'آدرس';
  ALTER TABLE "site_settings" ADD COLUMN "copyright" varchar DEFAULT 'تمامی حقوق برای هات پست محفوظ است.';
  ALTER TABLE "site_settings_nav_links" ADD CONSTRAINT "site_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_nav_links_order_idx" ON "site_settings_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_links_parent_id_idx" ON "site_settings_nav_links" USING btree ("_parent_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_nav_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "shop_page" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "site_settings_nav_links" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_logo_id_media_id_fk";
  
  DROP INDEX "site_settings_logo_idx";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "home_page" DROP COLUMN "hero_primary_label";
  ALTER TABLE "home_page" DROP COLUMN "hero_secondary_label";
  ALTER TABLE "home_page" DROP COLUMN "services_heading";
  ALTER TABLE "home_page" DROP COLUMN "services_subheading";
  ALTER TABLE "home_page" DROP COLUMN "services_link_label";
  ALTER TABLE "home_page" DROP COLUMN "shop_heading";
  ALTER TABLE "home_page" DROP COLUMN "shop_subheading";
  ALTER TABLE "home_page" DROP COLUMN "about_button_label";
  ALTER TABLE "home_page" DROP COLUMN "faq_heading";
  ALTER TABLE "home_page" DROP COLUMN "seo_meta_title";
  ALTER TABLE "home_page" DROP COLUMN "seo_meta_description";
  ALTER TABLE "about_page" DROP COLUMN "seo_meta_title";
  ALTER TABLE "about_page" DROP COLUMN "seo_meta_description";
  ALTER TABLE "site_settings" DROP COLUMN "logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "customer_portal_label";
  ALTER TABLE "site_settings" DROP COLUMN "cart_label";
  ALTER TABLE "site_settings" DROP COLUMN "quick_links_heading";
  ALTER TABLE "site_settings" DROP COLUMN "contact_heading";
  ALTER TABLE "site_settings" DROP COLUMN "hours_label";
  ALTER TABLE "site_settings" DROP COLUMN "address_label";
  ALTER TABLE "site_settings" DROP COLUMN "copyright";
  DROP TYPE "public"."enum_users_role";`)
}
