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
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="container-hp flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-white">
            هـ
          </span>
          <span>هات پست</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label="ناوبری اصلی">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-surface-muted hover:text-brand-600"
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
