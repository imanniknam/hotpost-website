"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { formatPrice, isPricePending } from "@/lib/format";
import type { Product } from "@/payload-types";

export function ProductPurchase({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const add = useCart((s) => s.add);
  const reduced = useReducedMotion();

  const [variantIndex, setVariantIndex] = useState(variants.length ? 0 : -1);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = variantIndex >= 0 ? variants[variantIndex] : undefined;
  const price = variant?.price ?? product.price;
  const stock = variant ? (variant.stock ?? 0) : (product.stock ?? 0);
  const pending = isPricePending(price);
  const outOfStock = stock <= 0;
  const disabled = pending || outOfStock;

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
              <motion.button
                key={v.id ?? v.label}
                type="button"
                onClick={() => setVariantIndex(index)}
                aria-pressed={index === variantIndex}
                whileHover={reduced ? undefined : { scale: 1.05 }}
                whileTap={reduced ? undefined : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                  index === variantIndex
                    ? "border-transparent bg-brand-gradient text-white shadow-md shadow-brand-500/25"
                    : "border-black/10 hover:border-brand-300",
                  (v.stock ?? 0) <= 0 && "opacity-50",
                )}
              >
                {v.label}
              </motion.button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="nums flex items-baseline gap-3">
        {pending ? (
          <span className="text-lg font-bold text-ink-500">قیمت این محصول به‌زودی اعلام می‌شود</span>
        ) : (
          <>
            {product.compareAtPrice && product.compareAtPrice > price && (
              <span className="text-ink-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <motion.span
              // Keyed on price so switching variant animates the number swap.
              key={price}
              className="text-brand-gradient text-3xl font-extrabold"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {formatPrice(price)}
            </motion.span>
            <span className="text-sm text-ink-500">تومان</span>
          </>
        )}
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

        <motion.button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          whileHover={disabled || reduced ? undefined : { scale: 1.02 }}
          whileTap={disabled || reduced ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={cn(
            "flex-1 rounded-xl px-6 py-3 text-sm font-bold transition-colors",
            disabled
              ? "cursor-not-allowed bg-surface-muted text-ink-500"
              : added
                ? "bg-linear-to-l from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/25"
                : "bg-brand-gradient text-white shadow-md shadow-brand-500/30",
          )}
        >
          {pending ? "به‌زودی" : outOfStock ? "ناموجود" : added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
        </motion.button>
      </div>

      <p className="text-sm text-ink-500">
        {pending
          ? "برای اطلاع از قیمت و موجودی با ما تماس بگیرید."
          : outOfStock
            ? "این محصول در حال حاضر موجود نیست."
            : `موجودی: ${formatPrice(stock)} عدد`}
      </p>
    </div>
  );
}
