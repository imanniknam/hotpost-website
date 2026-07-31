import { cache } from "react";

import type { AboutPage, Faq, HomePage, Product, ProductCategory, Service, SiteSetting } from "@/payload-types";

import { getPayload } from "./payload";

/**
 * `cache` dedupes within a single render pass; every one of these is also
 * reachable from generateMetadata, which renders separately from the page.
 */

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayload();
  return payload.findGlobal({ slug: "site-settings", depth: 1 });
});

export const getHomePage = cache(async (): Promise<HomePage> => {
  const payload = await getPayload();
  return payload.findGlobal({ slug: "home-page", depth: 2 });
});

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  const payload = await getPayload();
  return payload.findGlobal({ slug: "about-page", depth: 2 });
});

export const getServices = cache(async (): Promise<Service[]> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "services",
    sort: "order",
    limit: 20,
    depth: 1,
  });
  return docs;
});

export const getService = cache(async (slug: string): Promise<Service | null> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "faqs",
    sort: "order",
    limit: 50,
  });
  return docs;
});

/** Top-level groups only: هات پست پک / هات پست چاپ */
export const getRootCategories = cache(async (): Promise<ProductCategory[]> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "product-categories",
    where: { parent: { exists: false } },
    sort: "order",
    limit: 20,
    depth: 1,
  });
  return docs;
});

export const getCategoryTree = cache(async () => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "product-categories",
    sort: "order",
    limit: 200,
    depth: 1,
  });

  const roots = docs.filter((c) => !c.parent);
  return roots.map((root) => ({
    ...root,
    children: docs.filter((c) => {
      const parentId = typeof c.parent === "object" && c.parent !== null ? c.parent.id : c.parent;
      return parentId === root.id;
    }),
  }));
});

export const getCategoryBySlug = cache(async (slug: string): Promise<ProductCategory | null> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "product-categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});

export const getFeaturedProducts = cache(async (limit = 8): Promise<Product[]> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "products",
    where: { featured: { equals: true } },
    limit,
    depth: 2,
  });
  return docs;
});

export const getProductsByCategory = cache(
  async (categoryIds: number[], page = 1, limit = 24) => {
    const payload = await getPayload();
    return payload.find({
      collection: "products",
      where: { category: { in: categoryIds } },
      page,
      limit,
      depth: 2,
    });
  },
);

export const getAllProducts = cache(async (page = 1, limit = 24) => {
  const payload = await getPayload();
  return payload.find({ collection: "products", page, limit, depth: 2 });
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
});
