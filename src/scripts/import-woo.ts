/**
 * Pulls products out of the existing WooCommerce site and into Payload.
 *
 *   npm run import:woo -- --dry-run     report only, writes nothing (default)
 *   npm run import:woo -- --apply       actually create products and media
 *
 * Two corrections are applied on the way in, both flagged in the report:
 *
 *  1. Prices on the live site are inflated by PRICE_DIVISOR (1000). A size-2
 *     postal carton is listed at ۱۳,۴۹۰,۰۰۰ تومان; the real price is ۱۳,۴۹۰.
 *  2. Every product on the live site sits in «دسته‌بندی‌نشده». Categories are
 *     re-derived from the product title using CATEGORY_RULES below.
 *
 * Anything the rules cannot classify is listed at the end for manual assignment
 * rather than being silently dumped into a default bucket.
 */
import config from "@payload-config";
import { getPayload } from "payload";

const args = new Set(process.argv.slice(2));
const APPLY = args.has("--apply");
const PRICE_DIVISOR = Number(process.env.WOO_PRICE_DIVISOR ?? 1000);

const BASE = process.env.WOO_BASE_URL;
const KEY = process.env.WOO_CONSUMER_KEY;
const SECRET = process.env.WOO_CONSUMER_SECRET;

/** Title keyword → target category slug. First match wins, so order matters. */
const CATEGORY_RULES: [RegExp, string][] = [
  [/لیبل\s*پرینتر|پرینتر\s*لیبل/, "label-printer"],
  [/کارتریج/, "printer-cartridge"],
  [/پرینتر/, "printer"],
  [/کامپیوتر|رایانه|کیس\b/, "computer"],
  [/ریبون/, "ribbon"],
  [/لیبل/, "label"],
  [/کارتن/, "postal-carton"],
  [/پاکت|فلایر|حباب\s*دار|نایلون\s*دار/, "postal-envelope"],
  [/چسب|آبچسب/, "tape"],
  [/نخ/, "twine"],
  [/کاغذ\s*آچار|کاغذ/, "wrapping-paper"],
  [/گونی/, "plastic-sack"],
];

type WooProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number | null;
  short_description: string;
  images: { id: number; src: string; alt: string }[];
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const classify = (title: string) => CATEGORY_RULES.find(([re]) => re.test(title))?.[1];

/** Woo slugs are percent-encoded Persian; derive an ASCII one instead. */
const asciiSlug = (wooId: number, categorySlug: string | undefined) =>
  `${categorySlug ?? "product"}-${wooId}`;

const fetchAllProducts = async (): Promise<WooProduct[]> => {
  const all: WooProduct[] = [];

  for (let page = 1; ; page++) {
    const url = new URL(`${BASE}/wp-json/wc/v3/products`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("status", "publish");

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${KEY}:${SECRET}`).toString("base64")}`,
      },
    });

    if (!res.ok) {
      throw new Error(`WooCommerce API ${res.status}: ${await res.text()}`);
    }

    const batch = (await res.json()) as WooProduct[];
    all.push(...batch);
    if (batch.length < 100) break;
  }

  return all;
};

{
  if (!BASE || !KEY || !SECRET) {
    console.error(
      "WOO_BASE_URL / WOO_CONSUMER_KEY / WOO_CONSUMER_SECRET must be set in .env.\n" +
        "Generate a read-only key in WooCommerce → Settings → Advanced → REST API.",
    );
    process.exit(1);
  }

  const payload = await getPayload({ config });

  console.log(`دریافت محصولات از ${BASE} …`);
  const wooProducts = await fetchAllProducts();
  console.log(`${wooProducts.length} محصول یافت شد.\n`);

  // Map our category slugs to their Payload ids once.
  const { docs: categories } = await payload.find({
    collection: "product-categories",
    limit: 200,
    depth: 0,
  });
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  const unclassified: string[] = [];
  let created = 0;

  console.log("عنوان | قیمت سایت | قیمت اصلاح‌شده | دسته‌بندی");
  console.log("-".repeat(90));

  for (const woo of wooProducts) {
    const categorySlug = classify(woo.name);
    if (!categorySlug) unclassified.push(woo.name);

    const rawPrice = Number(woo.price || woo.regular_price || 0);
    const rawCompare = Number(woo.regular_price || 0);
    const price = Math.round(rawPrice / PRICE_DIVISOR);
    const compareAtPrice =
      rawCompare > rawPrice ? Math.round(rawCompare / PRICE_DIVISOR) : undefined;

    console.log(
      `${woo.name} | ${rawPrice.toLocaleString()} | ${price.toLocaleString()} | ${categorySlug ?? "❓ نامشخص"}`,
    );

    if (!APPLY) continue;

    const categoryId = categoryIdBySlug.get(categorySlug ?? "");
    if (!categoryId) continue; // needs manual assignment; reported below

    // Pull each image through Payload so it gets resized and stored locally.
    const imageIds: number[] = [];
    for (const img of woo.images) {
      try {
        const res = await fetch(img.src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());

        const media = await payload.create({
          collection: "media",
          data: { alt: img.alt || woo.name },
          file: {
            data: buffer,
            name: img.src.split("/").pop() || `${woo.id}.jpg`,
            mimetype: res.headers.get("content-type") || "image/jpeg",
            size: buffer.byteLength,
          },
        });
        imageIds.push(media.id);
      } catch (error) {
        console.warn(`  ⚠ تصویر دانلود نشد: ${img.src} (${(error as Error).message})`);
      }
    }

    await payload.create({
      collection: "products",
      data: {
        title: woo.name,
        slug: asciiSlug(woo.id, categorySlug),
        category: categoryId,
        price,
        compareAtPrice,
        sku: woo.sku || undefined,
        stock: woo.stock_quantity ?? 0,
        shortDescription: stripHtml(woo.short_description) || undefined,
        images: imageIds.map((id) => ({ image: id })),
      },
    });
    created++;
  }

  console.log("\n" + "=".repeat(90));
  console.log(`قیمت‌ها بر ${PRICE_DIVISOR.toLocaleString()} تقسیم شدند.`);

  if (unclassified.length) {
    console.log(`\n⚠ ${unclassified.length} محصول دسته‌بندی نشد و وارد نشد:`);
    unclassified.forEach((name) => console.log(`   - ${name}`));
    console.log("   یا CATEGORY_RULES را کامل کنید یا دستی در پنل تخصیص دهید.");
  }

  console.log(
    APPLY
      ? `\n✅ ${created} محصول ساخته شد.`
      : "\nاین یک گزارش آزمایشی بود. برای اعمال واقعی: npm run import:woo -- --apply",
  );
  process.exit(0);
}
