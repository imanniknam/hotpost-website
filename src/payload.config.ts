import path from "path";
import { fileURLToPath } from "url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
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
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is not set. Copy .env.example to .env and fill it in.");
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " — پنل هات پست",
    },
  },
  collections: [Products, ProductCategories, Services, Faqs, Media, Users],
  globals: [HomePage, AboutPage, SiteSettings],
  editor: lexicalEditor(),
  // Admin UI language. Site content itself is single-locale Persian.
  i18n: { supportedLanguages: { fa, en }, fallbackLanguage: "fa" },
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./hotpost.db",
    },
  }),
  sharp,
  upload: {
    limits: { fileSize: 8_000_000 },
  },
});
