/**
 * Imports the genuine brand assets from the live WordPress site.
 *
 *   npm run import:assets
 *
 * An audit of h0tpost.ir found that almost nothing there is real: the five
 * products, three product categories and every page body are Woodmart theme
 * demo content (Xiaomi gadgets), and 74 of the 80 media items are theme demo
 * imagery. Only these assets belong to hotpost, so only these are imported.
 *
 * Uses the public WordPress REST API — no credentials required.
 */
import config from "@payload-config";
import { getPayload } from "payload";

const WP_UPLOADS = "https://h0tpost.ir/wp-content/uploads/2026/07";

type AssetSpec = {
  file: string;
  alt: string;
  /** Where this asset gets wired once uploaded. */
  target: { kind: "home-hero" } | { kind: "service-icon"; serviceSlug: string };
};

/**
 * `cash-on-delivery-1-1.png` on the live site is a byte-identical duplicate of
 * `cash-on-delivery-1.png`, so it is skipped. That leaves three icons for four
 * services — پیک اختصاصی has none and needs one from the client.
 */
const ASSETS: AssetSpec[] = [
  {
    file: "hotpost.png",
    alt: "دستی که گوشی با لوگوی هات پست را نگه داشته است",
    target: { kind: "home-hero" },
  },
  {
    file: "cash-on-delivery.png",
    alt: "آیکون وانت تحویل با نوشته Cash on Delivery",
    target: { kind: "service-icon", serviceSlug: "cash-on-delivery" },
  },
  {
    file: "cash-on-delivery-1.png",
    alt: "آیکون تبادل پول و بسته میان دو دست",
    target: { kind: "service-icon", serviceSlug: "postpay" },
  },
  {
    file: "cash-on-delivery-2.png",
    alt: "آیکون تحویل بسته به مشتری در ازای پرداخت",
    target: { kind: "service-icon", serviceSlug: "fulfillment" },
  },
];

{
  const payload = await getPayload({ config });

  for (const asset of ASSETS) {
    const url = `${WP_UPLOADS}/${asset.file}`;

    // Skip anything already imported so the script can be re-run safely.
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: asset.file } },
      limit: 1,
    });

    let mediaId: number;

    if (existing.docs.length > 0) {
      mediaId = existing.docs[0].id;
      payload.logger.info(`${asset.file} از قبل موجود است.`);
    } else {
      const res = await fetch(url);
      if (!res.ok) {
        payload.logger.error(`دانلود ${url} ناموفق بود: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());

      const media = await payload.create({
        collection: "media",
        data: { alt: asset.alt },
        file: {
          data: buffer,
          name: asset.file,
          mimetype: res.headers.get("content-type") || "image/png",
          size: buffer.byteLength,
        },
      });
      mediaId = media.id;
      payload.logger.info(`${asset.file} وارد شد (${buffer.byteLength} بایت).`);
    }

    if (asset.target.kind === "home-hero") {
      await payload.updateGlobal({ slug: "home-page", data: { heroImage: mediaId } });
      payload.logger.info("  → به تصویر بخش اصلی صفحه اصلی وصل شد.");
    } else {
      const { docs } = await payload.find({
        collection: "services",
        where: { slug: { equals: asset.target.serviceSlug } },
        limit: 1,
      });
      if (!docs[0]) {
        payload.logger.warn(`  ⚠ خدمت «${asset.target.serviceSlug}» پیدا نشد.`);
        continue;
      }
      await payload.update({
        collection: "services",
        id: docs[0].id,
        data: { icon: mediaId },
      });
      payload.logger.info(`  → به آیکون «${docs[0].title}» وصل شد.`);
    }
  }

  payload.logger.info("\n⚠ «پیک اختصاصی» آیکون ندارد — روی سایت فعلی هم نبود.");
  payload.logger.info("✅ دارایی‌ها وارد شدند.");
  process.exit(0);
}
