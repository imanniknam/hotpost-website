import type { CollectionConfig } from "payload";

import { collectionRevalidationHooks } from "../hooks/revalidate";

import { slugField } from "../fields/slug";

/**
 * The four service models from «خدمات هات پست»:
 * پس‌کرایه، تسویه درب منزل (COD)، فول‌فیلمنت، پیک اختصاصی
 */
export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "خدمت", plural: "خدمات" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "englishTitle", "order"],
    group: "محتوا",
  },
  access: { read: () => true },
  hooks: collectionRevalidationHooks,
  defaultSort: "order",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          label: "عنوان",
          required: true,
          admin: { width: "50%", description: "مثال: سرویس پس‌کرایه" },
        },
        {
          name: "englishTitle",
          type: "text",
          label: "عنوان انگلیسی",
          admin: { width: "50%", description: "مثال: PostPay" },
        },
      ],
    },
    ...slugField(),
    {
      name: "tagline",
      type: "text",
      label: "یک‌خطی",
      required: true,
      admin: { description: "مثال: هزینه پست از گیرنده دریافت می‌شود" },
    },
    {
      name: "summary",
      type: "textarea",
      label: "توضیح",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      label: "آیکون",
    },
    {
      name: "benefits",
      type: "array",
      label: "مزایا",
      labels: { singular: "مزیت", plural: "مزایا" },
      fields: [{ name: "text", type: "text", label: "متن", required: true }],
    },
    {
      name: "includes",
      type: "array",
      label: "خدمات شامل",
      labels: { singular: "مورد", plural: "موارد" },
      admin: { description: "فقط برای فول‌فیلمنت پر شده است." },
      fields: [{ name: "text", type: "text", label: "متن", required: true }],
    },
    {
      name: "coverage",
      type: "array",
      label: "حوزه جغرافیایی / مدل زمانی",
      labels: { singular: "مورد", plural: "موارد" },
      admin: { description: "فقط برای پیک اختصاصی پر شده است." },
      fields: [{ name: "text", type: "text", label: "متن", required: true }],
    },
    {
      name: "bestFor",
      type: "textarea",
      label: "بهترین گزینه برای",
      required: true,
    },
    {
      name: "order",
      type: "number",
      label: "ترتیب نمایش",
      defaultValue: 0,
    },
  ],
};
