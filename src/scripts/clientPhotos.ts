/**
 * Photography the client commissioned (AI-generated, per a brief agreed on
 * with them) to replace the placeholder illustration and give each service
 * on /services a real photo instead of just an icon.
 *
 * Unlike brandAssets.ts, these files ship inside the repo rather than being
 * fetched from a URL — there is no live source to re-download from, the
 * client sent the images directly. Committed pre-optimized (resized, JPEG)
 * rather than as the original ~2MB PNGs from the image generator.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Payload } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_DIR = path.join(dirname, "assets", "photos");

type PhotoSpec = {
  file: string;
  alt: string;
  target:
    | { kind: "service-photo"; serviceSlug: string }
    | { kind: "home-about" }
    | { kind: "about-page" };
};

const PHOTOS: PhotoSpec[] = [
  {
    file: "about.jpg",
    alt: "کارمند هات پست در حال آماده‌سازی مرسوله روی نوار نقاله در انبار",
    target: { kind: "home-about" },
  },
  {
    file: "about.jpg",
    alt: "کارمند هات پست در حال آماده‌سازی مرسوله روی نوار نقاله در انبار",
    target: { kind: "about-page" },
  },
  {
    file: "postpay.jpg",
    alt: "تحویل مرسوله دست به دست درب منزل",
    target: { kind: "service-photo", serviceSlug: "postpay" },
  },
  {
    file: "cash-on-delivery.jpg",
    alt: "دریافت وجه نقد هنگام تحویل مرسوله درب منزل",
    target: { kind: "service-photo", serviceSlug: "cash-on-delivery" },
  },
  {
    file: "fulfillment.jpg",
    alt: "قفسه‌های انبار پر از کارتن‌های آماده ارسال",
    target: { kind: "service-photo", serviceSlug: "fulfillment" },
  },
  {
    file: "courier.jpg",
    alt: "پیک موتوری هات پست در حال تحویل فوری در شهر",
    target: { kind: "service-photo", serviceSlug: "courier" },
  },
];

/** Safe to call on every deploy: skips anything already uploaded or already wired. */
export const importClientPhotos = async (payload: Payload) => {
  // The same file (about.jpg) is wired to two targets, so upload each
  // distinct filename once and reuse the media id for every target.
  const mediaIdByFile = new Map<string, number>();

  for (const photo of PHOTOS) {
    let mediaId = mediaIdByFile.get(photo.file);

    if (mediaId === undefined) {
      const existing = await payload.find({
        collection: "media",
        where: { filename: { equals: photo.file } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        mediaId = existing.docs[0].id;
      } else {
        const buffer = readFileSync(path.join(PHOTOS_DIR, photo.file));
        const media = await payload.create({
          collection: "media",
          data: { alt: photo.alt },
          file: {
            data: buffer,
            name: photo.file,
            mimetype: "image/jpeg",
            size: buffer.byteLength,
          },
        });
        mediaId = media.id;
        payload.logger.info(`clientPhotos: ${photo.file} وارد شد (${buffer.byteLength} بایت).`);
      }
      mediaIdByFile.set(photo.file, mediaId);
    }

    if (photo.target.kind === "home-about") {
      const current = await payload.findGlobal({ slug: "home-page", depth: 0 });
      if (current.aboutImage === mediaId) continue;
      await payload.updateGlobal({ slug: "home-page", data: { aboutImage: mediaId } });
      payload.logger.info("clientPhotos: تصویر بخش «درباره» صفحه اصلی وصل شد.");
    } else if (photo.target.kind === "about-page") {
      const current = await payload.findGlobal({ slug: "about-page", depth: 0 });
      if (current.image === mediaId) continue;
      await payload.updateGlobal({ slug: "about-page", data: { image: mediaId } });
      payload.logger.info("clientPhotos: تصویر صفحه درباره ما وصل شد.");
    } else {
      const { docs } = await payload.find({
        collection: "services",
        where: { slug: { equals: photo.target.serviceSlug } },
        limit: 1,
        depth: 0,
      });
      const service = docs[0];
      if (!service) {
        payload.logger.warn(`clientPhotos: خدمت «${photo.target.serviceSlug}» پیدا نشد.`);
        continue;
      }
      if (service.photo === mediaId) continue;
      await payload.update({ collection: "services", id: service.id, data: { photo: mediaId } });
      payload.logger.info(`clientPhotos: عکس «${service.title}» وصل شد.`);
    }
  }
};
