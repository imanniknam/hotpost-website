/**
 * Real product photography pulled from the client's WordPress uploads
 * directory (D:\hotpost\2026 — an export of wp-content/uploads/2026), matched
 * to the shop categories already in the CMS.
 *
 * Every product here is created with price 0 and stock 0 deliberately. The
 * client has not provided real prices — fabricating numbers would be worse
 * than admitting they're missing, exactly like the WooCommerce price-divisor
 * guess this project already backed away from once. Price 0 renders on the
 * frontend as "قیمت به‌زودی اعلام می‌شود" (see lib/format.ts:isPricePending)
 * rather than "۰ تومان", and the add-to-cart button stays disabled until a
 * real price is entered in the admin panel.
 *
 * A handful of real photos existed for sizes/variants that don't map to a
 * clean single SKU (e.g. an illustrated marketing graphic for size 7, a
 * second bubble-envelope flatlay) — those were left out in favour of the one
 * clean product photo per item, rather than guessing which one the client
 * would want live.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Payload } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = path.join(dirname, "assets", "products");

type ProductSpec = {
  slug: string;
  title: string;
  categorySlug: string;
  file: string;
  alt: string;
};

const PRODUCTS: ProductSpec[] = [
  // کارتن پستی
  {
    slug: "postal-carton-2-plain",
    title: "کارتن پستی سایز ۲ (بدون چاپ)",
    categorySlug: "postal-carton",
    file: "carton-2.jpg",
    alt: "کارتن پستی سایز ۲ بدون چاپ",
  },
  {
    slug: "postal-carton-6-3layer",
    title: "کارتن پستی سایز ۶ سه‌لایه",
    categorySlug: "postal-carton",
    file: "carton-6-3layer.jpg",
    alt: "کارتن پستی سایز ۶ سه‌لایه",
  },
  {
    slug: "postal-carton-6-5layer",
    title: "کارتن پستی سایز ۶ پنج‌لایه",
    categorySlug: "postal-carton",
    file: "carton-6-5layer.jpg",
    alt: "کارتن پستی سایز ۶ پنج‌لایه",
  },
  {
    slug: "postal-carton-7",
    title: "کارتن پستی سایز ۷",
    categorySlug: "postal-carton",
    file: "carton-7.jpg",
    alt: "کارتن پستی سایز ۷",
  },
  {
    slug: "postal-carton-8",
    title: "کارتن پستی سایز ۸",
    categorySlug: "postal-carton",
    file: "carton-8.jpg",
    alt: "کارتن پستی سایز ۸",
  },
  {
    slug: "postal-carton-9",
    title: "کارتن پستی سایز ۹",
    categorySlug: "postal-carton",
    file: "carton-9.jpg",
    alt: "کارتن پستی سایز ۹",
  },
  {
    slug: "packing-carton-small",
    title: "کارتن بسته‌بندی کوچک",
    categorySlug: "postal-carton",
    file: "carton-pack-small.jpg",
    alt: "کارتن بسته‌بندی کوچک",
  },
  {
    slug: "packing-carton-special",
    title: "کارتن بسته‌بندی ویژه",
    categorySlug: "postal-carton",
    file: "carton-pack-special.jpg",
    alt: "کارتن بسته‌بندی ویژه",
  },
  {
    slug: "packing-carton-large",
    title: "کارتن بسته‌بندی بزرگ",
    categorySlug: "postal-carton",
    file: "carton-pack-large.jpg",
    alt: "کارتن بسته‌بندی بزرگ",
  },

  // پاکت پستی
  {
    slug: "bubble-envelope",
    title: "پاکت پستی حباب‌دار",
    categorySlug: "postal-envelope",
    file: "envelope-bubble.jpg",
    alt: "پاکت پستی حباب‌دار",
  },
  {
    slug: "nylon-envelope",
    title: "پاکت پستی نایلون‌دار",
    categorySlug: "postal-envelope",
    file: "envelope-nylon.jpg",
    alt: "پاکت پستی نایلون‌دار",
  },
  {
    slug: "flyer-envelope-a4",
    title: "پاکت فلایر A4",
    categorySlug: "postal-envelope",
    file: "envelope-flyer-a4.jpg",
    alt: "پاکت فلایر A4",
  },

  // چسب
  {
    slug: "water-tape-standard",
    title: "آبچسب استاندارد قهوه‌ای",
    categorySlug: "tape",
    file: "tape-water-standard.jpg",
    alt: "آبچسب استاندارد ساده قهوه‌ای",
  },
  {
    slug: "water-tape-kraft",
    title: "آبچسب کرافت قهوه‌ای",
    categorySlug: "tape",
    file: "tape-water-kraft.jpg",
    alt: "آبچسب کرافت قهوه‌ای",
  },
  {
    slug: "paper-tape-10cm",
    title: "چسب کاغذی ۱۰ سانتی",
    categorySlug: "tape",
    file: "tape-paper-10cm.jpg",
    alt: "چسب کاغذی ۱۰ سانتی",
  },
  {
    slug: "carton-tape",
    title: "چسب کارتن",
    categorySlug: "tape",
    file: "tape-carton.jpg",
    alt: "چسب کارتن",
  },

  // ریبون
  {
    slug: "ribbon-75m",
    title: "ریبون ۷۵ متری",
    categorySlug: "ribbon",
    file: "ribbon-75m.jpg",
    alt: "ریبون پرینتر ۷۵ متری",
  },
  {
    slug: "ribbon-wax-resin-60",
    title: "ریبون وکس‌رزین ۳۰۰×۶۰",
    categorySlug: "ribbon",
    file: "ribbon-wax-resin-60.jpg",
    alt: "ریبون وکس‌رزین ۳۰۰ در ۶۰",
  },
  {
    slug: "ribbon-wax-resin-80",
    title: "ریبون وکس‌رزین ۳۰۰×۸۰",
    categorySlug: "ribbon",
    file: "ribbon-wax-resin-80.jpg",
    alt: "ریبون وکس‌رزین ۳۰۰ در ۸۰",
  },

  // لیبل
  {
    slug: "paper-label",
    title: "برچسب کاغذی",
    categorySlug: "label",
    file: "label-paper.jpg",
    alt: "برچسب کاغذی",
  },

  // لیبل پرینتر (هات پست چاپ)
  {
    slug: "label-printer",
    title: "لیبل پرینتر",
    categorySlug: "label-printer",
    file: "label-printer.jpg",
    alt: "دستگاه لیبل پرینتر",
  },
];

/** Safe to call on every deploy: skips anything already uploaded or created. */
export const importRealProducts = async (payload: Payload) => {
  const categoryIdBySlug = new Map<string, number>();

  for (const spec of PRODUCTS) {
    let categoryId = categoryIdBySlug.get(spec.categorySlug);
    if (categoryId === undefined) {
      const { docs } = await payload.find({
        collection: "product-categories",
        where: { slug: { equals: spec.categorySlug } },
        limit: 1,
        depth: 0,
      });
      if (!docs[0]) {
        payload.logger.warn(`realProducts: دسته‌بندی «${spec.categorySlug}» پیدا نشد — رد شد.`);
        continue;
      }
      categoryId = docs[0].id;
      categoryIdBySlug.set(spec.categorySlug, categoryId);
    }

    const existingProduct = await payload.find({
      collection: "products",
      where: { slug: { equals: spec.slug } },
      limit: 1,
      depth: 0,
    });
    if (existingProduct.docs.length > 0) continue;

    const existingMedia = await payload.find({
      collection: "media",
      where: { filename: { equals: spec.file } },
      limit: 1,
    });

    let mediaId: number;
    if (existingMedia.docs.length > 0) {
      mediaId = existingMedia.docs[0].id;
    } else {
      const buffer = readFileSync(path.join(PRODUCTS_DIR, spec.file));
      const media = await payload.create({
        collection: "media",
        data: { alt: spec.alt },
        file: {
          data: buffer,
          name: spec.file,
          mimetype: "image/jpeg",
          size: buffer.byteLength,
        },
      });
      mediaId = media.id;
    }

    await payload.create({
      collection: "products",
      data: {
        title: spec.title,
        slug: spec.slug,
        category: categoryId,
        price: 0,
        stock: 0,
        images: [{ image: mediaId }],
      },
    });
    payload.logger.info(`realProducts: «${spec.title}» ساخته شد.`);
  }

  // Category cover photo for کارتن پستی, reusing the plain branded-box shot.
  const cartonCategory = categoryIdBySlug.get("postal-carton");
  if (cartonCategory) {
    const current = await payload.findByID({
      collection: "product-categories",
      id: cartonCategory,
      depth: 0,
    });
    if (!current.image) {
      const coverFile = "carton-category-cover.jpg";
      const existingCover = await payload.find({
        collection: "media",
        where: { filename: { equals: coverFile } },
        limit: 1,
      });
      const coverMediaId =
        existingCover.docs[0]?.id ??
        (
          await payload.create({
            collection: "media",
            data: { alt: "کارتن پستی برند هات پست" },
            file: {
              data: readFileSync(path.join(PRODUCTS_DIR, coverFile)),
              name: coverFile,
              mimetype: "image/jpeg",
              size: readFileSync(path.join(PRODUCTS_DIR, coverFile)).byteLength,
            },
          })
        ).id;
      await payload.update({
        collection: "product-categories",
        id: cartonCategory,
        data: { image: coverMediaId },
      });
      payload.logger.info("realProducts: تصویر دسته «کارتن پستی» وصل شد.");
    }
  }
};
