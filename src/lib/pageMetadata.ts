import type { Metadata } from "next";

/**
 * Turns a page's optional SEO group into Next metadata, falling back to the
 * wording the page shipped with so an empty field never blanks the tag.
 */
export function pageMetadata(
  seo: { metaTitle?: string | null; metaDescription?: string | null } | null | undefined,
  fallback: { title: string; description?: string },
): Metadata {
  return {
    title: seo?.metaTitle || fallback.title,
    description: seo?.metaDescription || fallback.description,
  };
}
