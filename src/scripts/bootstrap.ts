/**
 * Brings a fresh database up to a usable state during deploy, then gets out of
 * the way. Runs on every build (see vercel.json), so it must be idempotent.
 *
 * This exists because production secrets cannot be read back out of Vercel —
 * `vercel env pull` returns empty values for them — so there is no way to point
 * a local `npm run seed` at the production database without someone copying the
 * connection string around by hand. Seeding from inside the deploy, where
 * POSTGRES_URL already exists, avoids that entirely.
 *
 * Nothing here overwrites or deletes. Once the site has content, every step
 * short-circuits, so an editor's changes in the admin panel are never clobbered
 * by a later deploy.
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { importBrandAssets } from "./brandAssets";
import { importClientPhotos } from "./clientPhotos";
import { hasContent, writeContent } from "./content";
import { importRealProducts } from "./realProducts";

{
  const payload = await getPayload({ config });

  if (await hasContent(payload)) {
    payload.logger.info("bootstrap: محتوا از قبل وجود دارد — رد شد.");
  } else {
    payload.logger.info("bootstrap: دیتابیس خالی است، محتوای اولیه وارد می‌شود…");
    await writeContent(payload);
  }

  // All three are idempotent on their own (check each asset/product before
  // uploading or creating), so it is safe to call them on every deploy
  // rather than gating on hasContent.
  await importBrandAssets(payload);
  await importClientPhotos(payload);
  await importRealProducts(payload);

  // Admin user. Skipped silently when the credentials are not configured, so a
  // deploy without them still succeeds — the panel just has no user yet.
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (email && password) {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 0,
    });

    if (existing.totalDocs > 0) {
      payload.logger.info(`bootstrap: کاربر ${email} از قبل وجود دارد — رد شد.`);
    } else {
      await payload.create({
        collection: "users",
        data: { email, password, name: process.env.ADMIN_NAME || "مدیر" },
      });
      payload.logger.info(`bootstrap: کاربر ادمین ساخته شد (${email}).`);
    }
  } else {
    payload.logger.info("bootstrap: ADMIN_EMAIL/ADMIN_PASSWORD ست نشده — کاربر ساخته نشد.");
  }

  payload.logger.info("bootstrap: تمام.");
  process.exit(0);
}
