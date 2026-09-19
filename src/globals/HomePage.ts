import type { GlobalConfig } from "payload";

import { seoField } from "../fields/seo";
import { globalRevalidationHooks } from "../hooks/revalidate";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "صفحه اصلی",
  admin: { group: "صفحات سایت", description: "اولین صفحه‌ای که بازدیدکننده می‌بیند." },
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
          label: "عنوان بخش‌ها و دکمه‌ها",
          description: "تیتر بخش‌های صفحه اصلی و نوشته روی دکمه‌ها.",
          fields: [
            {
              type: "row",
              fields: [
                { name: "heroPrimaryLabel", type: "text", label: "دکمه اول بخش اصلی", defaultValue: "خدمات ما ←", admin: { width: "50%" } },
                { name: "heroSecondaryLabel", type: "text", label: "دکمه دوم بخش اصلی", defaultValue: "تماس با ما", admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "servicesHeading", type: "text", label: "تیتر بخش خدمات", defaultValue: "خدمات اصلی هات پست", admin: { width: "50%" } },
                { name: "servicesSubheading", type: "text", label: "زیرتیتر بخش خدمات", defaultValue: "چهار مدل خدماتی، متناسب با هر کسب‌وکار", admin: { width: "50%" } },
              ],
            },
            { name: "servicesLinkLabel", type: "text", label: "لینک «مشاهده خدمات»", defaultValue: "مشاهده خدمات" },
            {
              type: "row",
              fields: [
                { name: "shopHeading", type: "text", label: "تیتر بخش فروشگاه", defaultValue: "اقلام فروشگاه هات پست", admin: { width: "50%" } },
                { name: "shopSubheading", type: "text", label: "زیرتیتر بخش فروشگاه", defaultValue: "ملزومات بسته‌بندی، ارسال و تجهیزات چاپ", admin: { width: "50%" } },
              ],
            },
            { name: "aboutButtonLabel", type: "text", label: "دکمه بخش درباره ما", defaultValue: "درباره ما ←" },
            { name: "faqHeading", type: "text", label: "تیتر بخش پرسش‌های متداول", defaultValue: "پرسش‌های متداول" },
          ],
        },
        {
          label: "سئو",
          fields: [seoField()],
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
