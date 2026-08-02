import type { GlobalConfig } from "payload";

import { globalRevalidationHooks } from "../hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "تنظیمات سایت",
  admin: { group: "محتوا" },
  access: { read: () => true },
  hooks: globalRevalidationHooks,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "تماس",
          fields: [
            {
              name: "phones",
              type: "array",
              label: "شماره‌های تماس",
              labels: { singular: "شماره", plural: "شماره‌ها" },
              minRows: 1,
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "display",
                      type: "text",
                      label: "نمایش",
                      required: true,
                      admin: { width: "50%", description: "مثال: ۰۲۱۵۵۰۲۶۰۹۹" },
                    },
                    {
                      name: "dial",
                      type: "text",
                      label: "شماره‌گیری",
                      required: true,
                      admin: { width: "50%", description: "لاتین و بدون فاصله. مثال: 02155026099" },
                    },
                  ],
                },
              ],
            },
            {
              name: "hours",
              type: "text",
              label: "روز و ساعت پاسخگویی",
              required: true,
            },
            {
              name: "address",
              type: "textarea",
              label: "آدرس",
              required: true,
            },
            {
              name: "supportHeading",
              type: "text",
              label: "تیتر بخش پشتیبانی",
              defaultValue: "نیاز به پشتیبانی دارید؟",
            },
            {
              name: "supportSubheading",
              type: "text",
              label: "زیرتیتر بخش پشتیبانی",
              defaultValue: "آماده پاسخگویی هستیم...",
            },
          ],
        },
        {
          label: "پنل مشتریان",
          fields: [
            {
              name: "customerPortalUrl",
              type: "text",
              label: "آدرس ورود مشتریان",
              defaultValue: "http://customers.h0tpost.ir/",
              admin: {
                description:
                  "پنل کاربری جداگانه مشتریان است، بیرون از این سایت. دکمه «ورود مشتریان» در هدر به همین آدرس می‌رود.",
              },
            },
          ],
        },
        {
          label: "فوتر",
          fields: [
            {
              name: "footerText",
              type: "textarea",
              label: "متن معرفی فوتر",
              required: true,
            },
            {
              name: "quickLinks",
              type: "array",
              label: "دسترسی سریع",
              labels: { singular: "لینک", plural: "لینک‌ها" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", label: "عنوان", required: true, admin: { width: "50%" } },
                    { name: "href", type: "text", label: "مسیر", required: true, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "سئو",
          fields: [
            {
              name: "defaultTitle",
              type: "text",
              label: "عنوان پیش‌فرض",
              required: true,
            },
            {
              name: "defaultDescription",
              type: "textarea",
              label: "توضیح پیش‌فرض",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
