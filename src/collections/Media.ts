import type { CollectionConfig } from "payload";

import { collectionRevalidationHooks } from "../hooks/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "رسانه", plural: "رسانه‌ها" },
  admin: { group: "محتوا" },
  access: {
    read: () => true,
  },
  hooks: collectionRevalidationHooks,
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 320, height: 320, position: "centre" },
      { name: "card", width: 640 },
      { name: "hero", width: 1600 },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "متن جایگزین",
      required: true,
      admin: {
        description: "برای سئو و دسترس‌پذیری. مثلاً: کارتن پستی سایز ۲ سه لایه",
      },
    },
  ],
};
