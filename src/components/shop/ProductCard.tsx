import Image from "next/image";
import Link from "next/link";

import { discountPercent, formatPrice } from "@/lib/format";
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
  const off = discountPercent(product.price, product.compareAtPrice);
  const category = typeof product.category === "object" ? product.category : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:shadow-lg">
      <Link href={`/shop/product/${product.slug}`} className="relative block aspect-square bg-surface-muted">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition group-hover:scale-105"
          />
        ) : (
          <span className="grid h-full place-items-center text-sm text-ink-500">بدون تصویر</span>
        )}

        {off !== null && (
          <span className="nums absolute top-3 start-3 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-bold text-white">
            {formatPrice(off)}٪−
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/shop/product/${product.slug}`} className="line-clamp-2 font-bold leading-7 hover:text-brand-600">
          {product.title}
        </Link>

        {category && (
          <Link
            href={`/shop/${category.slug}`}
            className="mt-1 text-xs text-ink-500 hover:text-brand-600"
          >
            {category.title}
          </Link>
        )}

        <div className="mt-auto pt-4">
          <div className="nums mb-3 flex items-baseline gap-2">
            {product.compareAtPrice && off !== null && (
              <span className="text-sm text-ink-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-lg font-extrabold text-brand-600">
              {formatPrice(product.price)}
              <span className="ms-1 text-xs font-medium text-ink-500">تومان</span>
            </span>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
