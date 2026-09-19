/**
 * Split out from Header.tsx on purpose: Header is an async Server Component
 * that reaches `getSiteSettings` -> Payload config -> the revalidation hooks,
 * which use `next/cache`'s `revalidatePath` (server-only). MobileNav is a
 * Client Component; importing anything server-only into it breaks the build.
 *
 * The live list comes from Site Settings in the admin panel. This is only the
 * fallback used when that list is empty.
 */
export type NavLink = { href: string; label: string };

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export const resolveNavLinks = (
  links: { href: string; label: string }[] | null | undefined,
): NavLink[] =>
  links && links.length > 0
    ? links.map(({ href, label }) => ({ href, label }))
    : DEFAULT_NAV_LINKS;
