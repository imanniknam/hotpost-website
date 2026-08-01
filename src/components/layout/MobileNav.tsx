"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { NAV_LINKS } from "./Header";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-lg border border-black/10"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "بستن منو" : "باز کردن منو"}
        whileTap={reduced ? undefined : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            className="absolute inset-x-0 top-16 origin-top border-b border-black/5 bg-white/95 p-2 shadow-xl backdrop-blur-xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.96 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scaleY: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // Closed here rather than in an effect on pathname: tapping the
                // link for the current page must dismiss the drawer too, and that
                // navigation produces no pathname change to react to.
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
