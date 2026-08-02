/**
 * Imports the genuine brand assets from the live WordPress site.
 *
 *   npm run import:assets
 *
 * Runs automatically on every deploy too (see bootstrap.ts), so this manual
 * entrypoint exists mainly for re-running against local SQLite during
 * development.
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { importBrandAssets } from "./brandAssets";

{
  const payload = await getPayload({ config });
  await importBrandAssets(payload);
  payload.logger.info("\n⚠ «پیک اختصاصی» آیکون ندارد — روی سایت فعلی هم نبود.");
  payload.logger.info("✅ دارایی‌ها وارد شدند.");
  process.exit(0);
}
