import type { GlobalConfig } from "payload";

import { seoField } from "../fields/seo";
import { globalRevalidationHooks } from "../hooks/revalidate";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "صفحه درباره ما",
  admin: { group: "صفحات سایت" },
  access: { read: () => true },
  hooks: globalRevalidationHooks,
  fields: [
    {
      name: "heading",
      type: "text",
      label: "تیتر",
      defaultValue: "درباره ما",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "تصویر",
    },
    {
      name: "body",
      type: "richText",
      label: "متن کامل",
      required: true,
    },
    seoField(),
  ],
};
