import type { CollectionConfig } from "payload";

import { collectionRevalidationHooks } from "../hooks/revalidate";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "پرسش متداول", plural: "پرسش‌های متداول" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
    group: "محتوا",
  },
  access: { read: () => true },
  hooks: collectionRevalidationHooks,
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", label: "پرسش", required: true },
    { name: "answer", type: "textarea", label: "پاسخ", required: true },
    { name: "order", type: "number", label: "ترتیب", defaultValue: 0 },
  ],
};
