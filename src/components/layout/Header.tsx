import Link from "next/link";

import { getSiteSettings } from "@/lib/queries";

import { CartButton } from "./CartButton";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NAV_LINKS } from "./navLinks";

// getSiteSettings is wrapped in React's cache(), so the layout's own call for
// the footer and this one dedupe into a single query per request.
export async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="container-hp flex h-16 items-center gap-2 sm:gap-4">
        <Link href="/" className="flex shrink-0 items-center transition-opacity hover:opacity-80">
          <Logo className="h-8 w-auto sm:h-9" />
          <span className="sr-only">هات پست</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label="ناوبری اصلی">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // The underline is a pseudo-element so it can scale from the
              // centre without affecting layout.
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-linear-to-l after:from-brand-400 after:to-brand-600 after:transition-transform after:duration-300 hover:text-brand-600 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1.5 sm:gap-2 md:ms-0">
          {settings.customerPortalUrl && (
            <a
              href={settings.customerPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-brand-200 px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 sm:inline-flex"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M16 17l5-5-5-5M21 12H9M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
              </svg>
              ورود مشتریان
            </a>
          )}
          <CartButton />
          <MobileNav customerPortalUrl={settings.customerPortalUrl} />
        </div>
      </div>
    </header>
  );
}
