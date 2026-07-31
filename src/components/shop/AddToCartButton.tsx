"use client";

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
    <button
      type="button"
      onClick={handleAdd}
      disabled={outOfStock}
      className={cn(
        "w-full rounded-xl px-4 py-2.5 text-sm font-bold transition",
        outOfStock
          ? "cursor-not-allowed bg-surface-muted text-ink-500"
          : added
            ? "bg-emerald-600 text-white"
            : "bg-brand-500 text-white hover:bg-brand-600",
        className,
      )}
    >
      {outOfStock ? "ناموجود" : added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
    </button>
  );
}
