import type { GlobalConfig } from "payload";

import { globalRevalidationHooks } from "../hooks/revalidate";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "صفحه اصلی",
  admin: { group: "محتوا" },
  access: { read: () => true },
  hooks: globalRevalidationHooks,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "بخش اصلی",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              label: "برچسب بالای تیتر",
              defaultValue: "هات پست",
            },
            {
              name: "heading",
              type: "text",
              label: "تیتر اصلی",
              required: true,
            },
            {
              name: "subheading",
              type: "text",
              label: "زیرتیتر",
              required: true,
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "تصویر بخش اصلی",
            },
            {
              name: "stats",
              type: "array",
              label: "آمار",
              labels: { singular: "آمار", plural: "آمارها" },
              maxRows: 3,
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      type: "text",
                      label: "مقدار",
                      required: true,
                      admin: { width: "40%", description: "مثال: ۳۰+" },
                    },
                    {
                      name: "label",
                      type: "text",
                      label: "عنوان",
                      required: true,
                      admin: { width: "60%", description: "مثال: سال تجربه مدیریت" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "درباره (خلاصه)",
          fields: [
            {
              name: "aboutHeading",
              type: "text",
              label: "تیتر",
              defaultValue: "درباره هات پست",
            },
            {
              name: "aboutSummary",
              type: "textarea",
              label: "متن خلاصه",
              required: true,
            },
            {
              name: "aboutImage",
              type: "upload",
              relationTo: "media",
              label: "تصویر",
            },
          ],
        },
        {
          label: "متن پایانی",
          fields: [
            {
              name: "closingText",
              type: "textarea",
              label: "جمله انتهایی صفحه اصلی",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
