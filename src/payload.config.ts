import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fa } from "@payloadcms/translations/languages/fa";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Faqs } from "./collections/Faqs";
import { Media } from "./collections/Media";
import { ProductCategories } from "./collections/ProductCategories";
import { Products } from "./collections/Products";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { HomePage } from "./globals/HomePage";
import { ServicesPage } from "./globals/ServicesPage";
import { ShopPage } from "./globals/ShopPage";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is not set. Copy .env.example to .env and fill it in.");
}

/**
 * Postgres when a connection string is present, SQLite otherwise.
 *
 * Vercel cannot run SQLite: the filesystem is read-only at request time and
 * discarded between deploys, so the admin panel could not save anything. Local
 * development stays on SQLite because there is no Postgres on the dev machine
 * and hosted providers are not dependably reachable from Iran.
 *
 * Both adapters create their schema on connect, so neither needs a migration
 * step at this stage. If migrations are ever added they must be generated per
 * adapter — that is the point at which this branch should be removed and
 * everything moved onto Postgres.
 */
const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const db = databaseUrl
  ? postgresAdapter({ pool: { connectionString: databaseUrl } })
  : sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./hotpost.db" } });

/**
 * Uploads go to Vercel Blob in production for the same reason: `public/media`
 * is not writable there. Without the token the plugin is disabled and Payload
 * falls back to writing to disk, which is what local development wants.
 */
const storagePlugins = process.env.BLOB_READ_WRITE_TOKEN
  ? [
      vercelBlobStorage({
        enabled: true,
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
  : [];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " — پنل هات پست",
    },
    components: {
      graphics: {
        Logo: "/components/admin/AdminLogo#AdminLogo",
        Icon: "/components/admin/AdminIcon#AdminIcon",
      },
      beforeDashboard: ["/components/admin/DashboardGuide#DashboardGuide"],
    },
  },
  collections: [Products, ProductCategories, Services, Faqs, Media, Users],
  globals: [HomePage, AboutPage, ServicesPage, ShopPage, ContactPage, SiteSettings],
  editor: lexicalEditor(),
  // Admin UI is Persian only: the client edits content in Persian, and a browser
  // set to English would otherwise flip the whole panel to LTR English.
  i18n: { supportedLanguages: { fa }, fallbackLanguage: "fa" },
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db,
  plugins: storagePlugins,
  sharp,
  upload: {
    limits: { fileSize: 8_000_000 },
  },
});
