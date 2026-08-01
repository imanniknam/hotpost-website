import Link from "next/link";

import { CartButton } from "./CartButton";
import { MobileNav } from "./MobileNav";

export const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="container-hp flex h-16 items-center gap-4">
        <Link href="/" className="group flex items-center gap-2 text-lg font-extrabold">
          <span className="bg-brand-gradient grid size-9 place-items-center rounded-xl text-white shadow-md shadow-brand-500/30 transition-shadow group-hover:shadow-lg group-hover:shadow-brand-500/40">
            هـ
          </span>
          <span>هات پست</span>
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

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
