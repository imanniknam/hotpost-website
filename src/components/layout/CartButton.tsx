"use client";

import Link from "next/link";

import { cartCount, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function CartButton() {
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const count = cartCount(items);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
      aria-label={`سبد خرید${hydrated && count ? `، ${formatPrice(count)} کالا` : ""}`}
    >
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
      </svg>
      <span className="hidden sm:inline">سبد خرید</span>
      {hydrated && count > 0 && (
        <span className="nums absolute -top-1 -start-1 grid size-5 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
          {formatPrice(count)}
        </span>
      )}
    </Link>
  );
}
