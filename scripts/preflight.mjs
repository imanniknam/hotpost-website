/**
 * Checks the deploy environment before anything expensive runs, and reports
 * every problem at once rather than one per failed build.
 *
 * Two of these cannot be left to fail on their own:
 *
 *   - No migrations on Postgres. `payload migrate` exits 0 on an empty
 *     migrations directory ("No migrations to run. Done."), so the build would
 *     carry on and die inside `next build` against a schema-less database.
 *
 *   - No POSTGRES_URL on Vercel. This one is worse, because it does not fail:
 *     the config falls back to SQLite, the build sandbox is writable so it
 *     succeeds, and you get a green deploy serving a site whose database is
 *     read-only and thrown away between requests. A broken build is much
 *     better than a broken site that looks fine.
 *
 * Runs before the build; see vercel.json.
 */
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = path.join(root, "src", "migrations");

const onVercel = process.env.VERCEL === "1";
const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const errors = [];
const warnings = [];

if (!process.env.PAYLOAD_SECRET) {
  errors.push([
    "PAYLOAD_SECRET is not set.",
    "  Signs admin login tokens. Generate one and add it to the environment:",
    "    node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
  ]);
}

if (onVercel && !databaseUrl) {
  errors.push([
    "POSTGRES_URL is not set, but this is a Vercel build.",
    "  Without it the app falls back to SQLite, which cannot work here: the",
    "  filesystem is read-only at request time and discarded between deploys,",
    "  so nothing saved in the admin panel would survive.",
    "  Fix: Vercel dashboard -> Storage -> create a Postgres database and",
    "  connect it to this project. The variable is then injected for you.",
  ]);
}

if (databaseUrl) {
  const migrations = existsSync(migrationsDir)
    ? readdirSync(migrationsDir).filter((f) => f.endsWith(".ts") || f.endsWith(".js"))
    : [];

  if (migrations.length === 0) {
    errors.push([
      "Deploying to Postgres with no migration files.",
      "  Payload only creates the schema automatically when NODE_ENV is not",
      "  'production', so this build would run against empty tables.",
      "  Generate and commit them (no live database needed — the schema comes",
      "  from the Payload config, so any placeholder URL works):",
      '    POSTGRES_URL="postgres://placeholder@127.0.0.1:5432/db" \\',
      "      npm run migrate:create -- initial",
      "    git add src/migrations && git commit -m 'Add Postgres migration'",
    ]);
  }
}

if (onVercel && !process.env.BLOB_READ_WRITE_TOKEN) {
  // Not fatal: the site builds and renders. Only uploads break, and only once
  // someone tries to add an image in the admin panel.
  warnings.push([
    "BLOB_READ_WRITE_TOKEN is not set.",
    "  Uploads will fail at runtime, because public/media is not writable on",
    "  Vercel. Add a Blob store under Storage when you need image uploads.",
  ]);
}

if (onVercel && !process.env.NEXT_PUBLIC_SITE_URL) {
  warnings.push([
    "NEXT_PUBLIC_SITE_URL is not set.",
    "  Canonical URLs and Open Graph tags will point at localhost.",
  ]);
}

for (const lines of warnings) {
  console.warn(`\n  warning: ${lines[0]}\n${lines.slice(1).join("\n")}`);
}

if (errors.length > 0) {
  console.error(`\n  Build stopped — ${errors.length} problem(s) with the environment:\n`);
  errors.forEach((lines, i) => {
    console.error(`  ${i + 1}. ${lines[0]}`);
    console.error(`${lines.slice(1).join("\n")}\n`);
  });
  console.error("  Set these in Vercel: Settings -> Environment Variables, then redeploy.\n");
  process.exit(1);
}

console.log(`preflight: ok (${databaseUrl ? "postgres" : "sqlite"})`);
