/**
 * Fails the build early, with an explanation, when deploying to Postgres
 * without any migration files.
 *
 * `payload migrate` exits 0 on an empty migrations directory ("No migrations to
 * run. Done."), so without this check the build carries on and dies much later
 * against a schema-less database, with an error that points nowhere near the
 * actual cause.
 *
 * Runs before the build; see vercel.json.
 */
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = path.join(root, "src", "migrations");

const usingPostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

if (!usingPostgres) {
  // SQLite build: Payload creates the schema on connect, nothing to check.
  process.exit(0);
}

const migrations = existsSync(migrationsDir)
  ? readdirSync(migrationsDir).filter((f) => f.endsWith(".ts") || f.endsWith(".js"))
  : [];

if (migrations.length === 0) {
  console.error(
    [
      "",
      "  Build stopped: deploying to Postgres with no migrations.",
      "",
      "  Payload only creates the schema automatically when NODE_ENV is not",
      "  'production', so this deploy would build against empty tables.",
      "",
      "  Generate them once, from a machine that can reach the database:",
      "",
      '    POSTGRES_URL="<connection string>" npm run migrate:create -- initial',
      "    git add src/migrations && git commit -m 'Add initial Postgres migration'",
      "",
      "  Then redeploy.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

console.log(`preflight: ${migrations.length} migration file(s) found`);
