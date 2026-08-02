/**
 * Split out from Header.tsx on purpose: Header is now an async Server
 * Component that reaches `getSiteSettings` -> Payload config -> the
 * revalidation hooks, which use `next/cache`'s `revalidatePath` (server-only).
 * MobileNav is a Client Component that only needs this list, and importing it
 * straight from Header.tsx pulled that whole server-only graph into the
 * client bundle, which Next refuses to build.
 */
export const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];
