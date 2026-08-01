"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  /** `${productId}` for simple products, `${productId}:${variantLabel}` for variants. */
  key: string;
  productId: number;
  slug: string;
  title: string;
  variantLabel?: string;
  price: number;
  image?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  /**
   * Adjust a line by a delta rather than assigning an absolute quantity.
   *
   * The +/- buttons must use this. Assigning `item.qty - 1` reads the quantity
   * captured by the current render, so two clicks landing in the same batch
   * both compute the same target and one of them is silently lost. A delta is
   * applied against whatever the store holds at the time, so rapid clicks
   * accumulate correctly.
   */
  changeQty: (key: string, delta: number) => void;
  /** Absolute set, for a quantity input where the user types a number. */
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

/** Dropping to zero or below removes the line rather than leaving an empty row. */
const applyQty = (items: CartItem[], key: string, next: (current: number) => number) => {
  const target = items.find((i) => i.key === key);
  if (!target) return items;

  const qty = next(target.qty);
  return qty <= 0
    ? items.filter((i) => i.key !== key)
    : items.map((i) => (i.key === key ? { ...i, qty } : i));
};

const keyFor = (productId: number, variantLabel?: string) =>
  variantLabel ? `${productId}:${variantLabel}` : String(productId);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (item, qty = 1) =>
        set((state) => {
          const key = keyFor(item.productId, item.variantLabel);
          const existing = state.items.find((i) => i.key === key);

          if (existing) {
            return {
              items: state.items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)),
            };
          }
          return { items: [...state.items, { ...item, key, qty }] };
        }),

      changeQty: (key, delta) =>
        set((state) => ({ items: applyQty(state.items, key, (current) => current + delta) })),

      setQty: (key, qty) => set((state) => ({ items: applyQty(state.items, key, () => qty) })),

      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "hotpost-cart",
      // Only the line items are worth persisting; the actions are not.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/*
 * There is deliberately no `hydrated` flag in this store.
 *
 * An earlier version set one from `onRehydrateStorage`. That callback fires
 * while `create()` is still running — localStorage is synchronous, so persist
 * hydrates during store construction — at which point the `useCart` binding it
 * referenced did not exist yet. The flag stayed false forever and the cart page
 * showed its loading skeleton permanently, with nothing logged.
 *
 * Since localStorage is synchronous, the store already holds the persisted
 * items by the time React renders on the client. The only real problem is that
 * the server rendered an empty cart, so the first client render has to match
 * it. That is a render-timing question, not a storage question, so components
 * gate on `useHydrated()` instead.
 */

export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.qty, 0);
export const cartTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
