/**
 * The genuine brand assets from the live WordPress site, and the code that
 * imports and wires them.
 *
 * An audit of h0tpost.ir found that almost nothing there is real: the five
 * products, three product categories and every page body are Woodmart theme
 * demo content (Xiaomi gadgets), and 74 of the 80 media items are theme demo
 * imagery. Only these four files belong to hotpost, so only these are
 * imported. Uses the public WordPress REST API — no credentials required.
 *
 * Shared by `npm run import:assets` (manual, any environment) and
 * `bootstrap.ts` (automatic, runs on every deploy).
 */
import type { Payload } from "payload";

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

/** Safe to call on every deploy: skips anything already imported or wired. */
export const importBrandAssets = async (payload: Payload) => {
  for (const asset of ASSETS) {
    const url = `${WP_UPLOADS}/${asset.file}`;

    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: asset.file } },
      limit: 1,
    });

    let mediaId: number;

    if (existing.docs.length > 0) {
      mediaId = existing.docs[0].id;
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
      payload.logger.info(`brandAssets: ${asset.file} وارد شد (${buffer.byteLength} بایت).`);
    }

    if (asset.target.kind === "home-hero") {
      const current = await payload.findGlobal({ slug: "home-page", depth: 0 });
      if (current.heroImage === mediaId) continue;
      await payload.updateGlobal({ slug: "home-page", data: { heroImage: mediaId } });
      payload.logger.info("brandAssets: تصویر بخش اصلی صفحه اصلی وصل شد.");
    } else {
      const { docs } = await payload.find({
        collection: "services",
        where: { slug: { equals: asset.target.serviceSlug } },
        limit: 1,
        depth: 0,
      });
      const service = docs[0];
      if (!service) {
        payload.logger.warn(`brandAssets: خدمت «${asset.target.serviceSlug}» پیدا نشد.`);
        continue;
      }
      if (service.icon === mediaId) continue;
      await payload.update({ collection: "services", id: service.id, data: { icon: mediaId } });
      payload.logger.info(`brandAssets: آیکون «${service.title}» وصل شد.`);
    }
  }
};
