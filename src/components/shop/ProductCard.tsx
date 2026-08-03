import Image from "next/image";
import Link from "next/link";

import { HoverLift } from "@/components/motion/HoverLift";
import { discountPercent, formatPrice, isPricePending } from "@/lib/format";
import type { Product } from "@/payload-types";

import { AddToCartButton } from "./AddToCartButton";

/** First image URL, or undefined when the product has no usable upload. */
export const primaryImage = (product: Product) => {
  const first = product.images?.[0]?.image;
  return typeof first === "object" && first !== null ? (first.url ?? undefined) : undefined;
};

export function ProductCard({ product }: { product: Product }) {
  const image = primaryImage(product);
  const alt =
    typeof product.images?.[0]?.image === "object" && product.images[0].image !== null
      ? product.images[0].image.alt
      : product.title;
  const pending = isPricePending(product.price);
  const off = pending ? null : discountPercent(product.price, product.compareAtPrice);
  const category = typeof product.category === "object" ? product.category : null;

  return (
    <HoverLift as="article" className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink-900/10">
        <Link
          href={`/shop/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-linear-to-br from-surface-muted to-brand-50/60"
        >
          {image ? (
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <span className="grid h-full place-items-center text-sm text-ink-500">بدون تصویر</span>
          )}

          {off !== null && (
            <span className="nums absolute top-3 start-3 rounded-full bg-brand-gradient px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-brand-500/30">
              {formatPrice(off)}٪−
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <Link
            href={`/shop/product/${product.slug}`}
            className="line-clamp-2 font-bold leading-7 transition-colors hover:text-brand-600"
          >
            {product.title}
          </Link>

          {category && (
            <Link
              href={`/shop/${category.slug}`}
              className="mt-1 text-xs text-ink-500 transition-colors hover:text-brand-600"
            >
              {category.title}
            </Link>
          )}

          <div className="mt-auto pt-4">
            <div className="nums mb-3 flex items-baseline gap-2">
              {pending ? (
                <span className="text-sm font-bold text-ink-500">قیمت به‌زودی اعلام می‌شود</span>
              ) : (
                <>
                  {product.compareAtPrice && off !== null && (
                    <span className="text-sm text-ink-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  <span className="text-brand-gradient text-lg font-extrabold">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-medium text-ink-500">تومان</span>
                </>
              )}
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </HoverLift>
  );
}
