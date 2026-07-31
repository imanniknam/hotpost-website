"use client";

import { useState } from "react";

import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/payload-types";

export function ProductPurchase({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const add = useCart((s) => s.add);

  const [variantIndex, setVariantIndex] = useState(variants.length ? 0 : -1);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = variantIndex >= 0 ? variants[variantIndex] : undefined;
  const price = variant?.price ?? product.price;
  const stock = variant ? (variant.stock ?? 0) : (product.stock ?? 0);
  const outOfStock = stock <= 0;

  const handleAdd = () => {
    const image = product.images?.[0]?.image;
    add(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variantLabel: variant?.label,
        price,
        image: typeof image === "object" && image !== null ? (image.url ?? undefined) : undefined,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-6">
      {variants.length > 0 && (
        <fieldset>
          <legend className="mb-3 font-bold">انتخاب تنوع</legend>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, index) => (
              <button
                key={v.id ?? v.label}
                type="button"
                onClick={() => setVariantIndex(index)}
                aria-pressed={index === variantIndex}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition",
                  index === variantIndex
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-black/10 hover:border-brand-200",
                  (v.stock ?? 0) <= 0 && "opacity-50",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="nums flex items-baseline gap-3">
        {product.compareAtPrice && product.compareAtPrice > price && (
          <span className="text-ink-500 line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
        <span className="text-3xl font-extrabold text-brand-600">{formatPrice(price)}</span>
        <span className="text-sm text-ink-500">تومان</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-xl border border-black/10">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-11 place-items-center text-lg"
            aria-label="کاهش تعداد"
          >
            −
          </button>
          <span className="nums w-12 text-center font-bold">{formatPrice(qty)}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(Math.max(stock, 1), q + 1))}
            className="grid size-11 place-items-center text-lg"
            aria-label="افزایش تعداد"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className={cn(
            "flex-1 rounded-xl px-6 py-3 text-sm font-bold transition",
            outOfStock
              ? "cursor-not-allowed bg-surface-muted text-ink-500"
              : added
                ? "bg-emerald-600 text-white"
                : "bg-brand-500 text-white hover:bg-brand-600",
          )}
        >
          {outOfStock ? "ناموجود" : added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
        </button>
      </div>

      <p className="text-sm text-ink-500">
        {outOfStock ? "این محصول در حال حاضر موجود نیست." : `موجودی: ${formatPrice(stock)} عدد`}
      </p>
    </div>
  );
}
