"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { cartCount, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/lib/useHydrated";

const MotionLink = motion.create(Link);

export function CartButton() {
  const items = useCart((s) => s.items);
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const count = cartCount(items);

  return (
    <MotionLink
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-2 text-sm font-medium text-brand-700 ring-1 ring-brand-200/70 transition-shadow hover:shadow-md hover:shadow-brand-500/15"
      aria-label={`سبد خرید${hydrated && count ? `، ${formatPrice(count)} کالا` : ""}`}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
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

      <AnimatePresence>
        {hydrated && count > 0 && (
          <motion.span
            // Keyed on the count so each change remounts and replays the pop,
            // which is the point: it confirms the item landed in the cart.
            key={count}
            className="nums absolute -top-1 -start-1 grid size-5 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white shadow-sm"
            initial={reduced ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
          >
            {formatPrice(count)}
          </motion.span>
        )}
      </AnimatePresence>
    </MotionLink>
  );
}
