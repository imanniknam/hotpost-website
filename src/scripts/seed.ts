/**
 * Replaces all site content with what the content team supplied in the four
 * docx briefs.
 *
 *   npm run seed
 *
 * DESTRUCTIVE — it empties the collections it owns first, so anything edited in
 * the admin panel is lost. That is fine on a development machine, which is the
 * only place this is meant to run. Deploys use `bootstrap.ts`, which only fills
 * an empty database and never deletes.
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { OWNED_COLLECTIONS, writeContent } from "./content";

// Must be awaited at the top level: `payload run` exits once module evaluation
// settles, so a floating promise here would be cut off before it does anything.
{
  const payload = await getPayload({ config });

  payload.logger.info("پاک کردن داده‌های قبلی…");
  for (const collection of OWNED_COLLECTIONS) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }

  await writeContent(payload);
  process.exit(0);
}
