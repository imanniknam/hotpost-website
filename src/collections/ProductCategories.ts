import type { CollectionConfig } from "payload";

import { collectionRevalidationHooks } from "../hooks/revalidate";

import { slugField } from "../fields/slug";

/**
 * Two-level tree. The doc defines exactly two roots:
 *   هات پست پک  (۸ زیردسته)  و  هات پست چاپ (۴ زیردسته)
 * Roots are the ones with no `parent`.
 */
export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  labels: { singular: "دسته‌بندی محصول", plural: "دسته‌بندی محصولات" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "parent", "order"],
    group: "فروشگاه",
  },
  access: { read: () => true },
  hooks: collectionRevalidationHooks,
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      label: "عنوان",
      required: true,
    },
    ...slugField(),
    {
      name: "parent",
      type: "relationship",
      relationTo: "product-categories",
      label: "دسته والد",
      admin: {
        description: "خالی بگذارید تا یک گروه اصلی شود (هات پست پک / هات پست چاپ).",
      },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    {
      name: "description",
      type: "textarea",
      label: "توضیح کوتاه",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "تصویر شاخص",
    },
    {
      name: "order",
      type: "number",
      label: "ترتیب نمایش",
      defaultValue: 0,
    },
  ],
};
