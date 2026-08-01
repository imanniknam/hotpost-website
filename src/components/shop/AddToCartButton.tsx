"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import type { Product } from "@/payload-types";

export function AddToCartButton({
  product,
  variantLabel,
  price,
  className,
}: {
  product: Product;
  variantLabel?: string;
  price?: number;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const reduced = useReducedMotion();
  const [added, setAdded] = useState(false);

  const outOfStock = (product.stock ?? 0) <= 0 && !product.variants?.length;

  const handleAdd = () => {
    const image = product.images?.[0]?.image;
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      variantLabel,
      price: price ?? product.price,
      image: typeof image === "object" && image !== null ? (image.url ?? undefined) : undefined,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.button
      type="button"
      onClick={handleAdd}
      disabled={outOfStock}
      whileHover={outOfStock || reduced ? undefined : { scale: 1.03 }}
      whileTap={outOfStock || reduced ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
        outOfStock
          ? "cursor-not-allowed bg-surface-muted text-ink-500"
          : added
            ? "bg-linear-to-l from-emerald-500 to-emerald-600 text-white"
            : "bg-brand-gradient text-white shadow-md shadow-brand-500/25",
        className,
      )}
    >
      {/* Swapped in place so the button never changes size mid-interaction. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={outOfStock ? "out" : added ? "added" : "add"}
          className="block"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
        >
          {outOfStock ? "ناموجود" : added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
