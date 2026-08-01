"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { cartTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const reduced = useReducedMotion();

  if (!hydrated) {
    return (
      <section className="container-hp py-20">
        <div className="mx-auto h-40 max-w-3xl animate-pulse rounded-3xl bg-surface-muted" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-hp py-20 text-center">
        <h1 className="text-2xl font-extrabold">سبد خرید شما خالی است</h1>
        <p className="mt-3 text-ink-500">هنوز کالایی به سبد اضافه نکرده‌اید.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          رفتن به فروشگاه
        </Link>
      </section>
    );
  }

  const total = cartTotal(items);

  return (
    <section className="container-hp py-10">
      <h1 className="text-3xl font-extrabold">سبد خرید</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.key}
                layout={!reduced}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                // Collapsing height on exit stops the list from snapping shut.
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: 40, height: 0, marginBottom: 0, transition: { duration: 0.22 } }
                }
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-surface-muted to-brand-50/60">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill sizes="80px" className="object-contain p-2" />
                  )}
                </div>

                <div className="min-w-40 flex-1">
                  <Link
                    href={`/shop/product/${item.slug}`}
                    className="font-bold transition-colors hover:text-brand-600"
                  >
                    {item.title}
                  </Link>
                  {item.variantLabel && (
                    <p className="mt-1 text-xs text-ink-500">{item.variantLabel}</p>
                  )}
                  <p className="nums mt-1 text-sm text-brand-600">
                    {formatPrice(item.price)} تومان
                  </p>
                </div>

                <div className="flex items-center rounded-xl border border-black/10">
                  <motion.button
                    type="button"
                    onClick={() => setQty(item.key, item.qty - 1)}
                    whileTap={reduced ? undefined : { scale: 0.85 }}
                    className="grid size-10 place-items-center transition-colors hover:text-brand-600"
                    aria-label="کاهش تعداد"
                  >
                    −
                  </motion.button>
                  <span className="nums w-10 text-center font-bold">{formatPrice(item.qty)}</span>
                  <motion.button
                    type="button"
                    onClick={() => setQty(item.key, item.qty + 1)}
                    whileTap={reduced ? undefined : { scale: 0.85 }}
                    className="grid size-10 place-items-center transition-colors hover:text-brand-600"
                    aria-label="افزایش تعداد"
                  >
                    +
                  </motion.button>
                </div>

                <div className="nums w-28 text-end font-extrabold">
                  {formatPrice(item.price * item.qty)}
                  <span className="ms-1 text-xs font-medium text-ink-500">تومان</span>
                </div>

                <button
                  type="button"
                  onClick={() => remove(item.key)}
                  className="text-sm text-ink-500 transition-colors hover:text-red-600"
                >
                  حذف
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="bg-surface-gradient h-fit rounded-2xl p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 font-bold">خلاصه سفارش</h2>
          <div className="nums flex justify-between border-t border-black/5 pt-4 text-lg font-extrabold">
            <span>مبلغ کل</span>
            <span className="text-brand-gradient">
              {formatPrice(total)}
              <span className="ms-1 text-xs font-medium text-ink-500">تومان</span>
            </span>
          </div>

          <p className="mt-4 text-xs leading-6 text-ink-500">
            هزینه ارسال در مرحله بعد و بر اساس آدرس شما محاسبه می‌شود.
          </p>

          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl bg-brand-500/50 px-6 py-3 text-sm font-bold text-white"
          >
            ادامه و پرداخت
          </button>
          <p className="mt-2 text-center text-xs text-ink-500">
            درگاه پرداخت هنوز متصل نشده است.
          </p>
        </aside>
      </div>
    </section>
  );
}
