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
  /** False until localStorage has been read, so SSR and first paint agree. */
  hydrated: boolean;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const keyFor = (productId: number, variantLabel?: string) =>
  variantLabel ? `${productId}:${variantLabel}` : String(productId);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,

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

      setQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, qty } : i)),
        })),

      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "hotpost-cart",
      // Only the line items are worth persisting; the flag and actions are not.
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => () => {
        useCart.setState({ hydrated: true });
      },
    },
  ),
);

export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.qty, 0);
export const cartTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
