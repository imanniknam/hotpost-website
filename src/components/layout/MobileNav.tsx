"use client";

import Link from "next/link";
import { useState } from "react";

import { NAV_LINKS } from "./Header";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-lg border border-black/10"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "بستن منو" : "باز کردن منو"}
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-16 border-b border-black/5 bg-white p-2 shadow-lg"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // Closed here rather than in an effect on pathname: tapping the
              // link for the current page must dismiss the drawer too, and that
              // navigation produces no pathname change to react to.
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-700 hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
