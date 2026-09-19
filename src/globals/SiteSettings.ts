import type { GlobalConfig } from "payload";

import { globalRevalidationHooks } from "../hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "تنظیمات سایت",
  admin: { group: "تنظیمات", description: "اطلاعات تماس، منو، لوگو و فوتر که در همه صفحه‌ها نمایش داده می‌شوند." },
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
          label: "هدر و منو",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "لوگو",
              admin: { description: "اختیاری. خالی بماند لوگوی پیش‌فرض هات پست نمایش داده می‌شود. ترجیحاً PNG یا SVG با پس‌زمینه شفاف." },
            },
            {
              name: "navLinks",
              type: "array",
              label: "لینک‌های منوی بالا",
              labels: { singular: "لینک", plural: "لینک‌ها" },
              admin: { description: "خالی بماند منوی پیش‌فرض (خانه، خدمات، فروشگاه، درباره ما، تماس با ما) نمایش داده می‌شود." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", label: "عنوان", required: true, admin: { width: "50%" } },
                    { name: "href", type: "text", label: "مسیر", required: true, admin: { width: "50%", description: "مثال: /services" } },
                  ],
                },
              ],
            },
            {
              name: "customerPortalLabel",
              type: "text",
              label: "نوشته دکمه ورود مشتریان",
              defaultValue: "ورود مشتریان",
            },
            {
              name: "cartLabel",
              type: "text",
              label: "نوشته دکمه سبد خرید",
              defaultValue: "سبد خرید",
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
            { name: "quickLinksHeading", type: "text", label: "تیتر ستون دسترسی سریع", defaultValue: "دسترسی سریع" },
            { name: "contactHeading", type: "text", label: "تیتر ستون تماس", defaultValue: "تماس با هات پست" },
            { name: "hoursLabel", type: "text", label: "برچسب «روز و ساعت پاسخگویی»", defaultValue: "روز و ساعت پاسخگویی" },
            { name: "addressLabel", type: "text", label: "برچسب «آدرس»", defaultValue: "آدرس" },
            { name: "copyright", type: "text", label: "متن کپی‌رایت", defaultValue: "تمامی حقوق برای هات پست محفوظ است." },
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
