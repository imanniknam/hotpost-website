import type { Field } from "payload";

/**
 * Per-page search-engine title and description. Both are optional: the page
 * falls back to its built-in wording, so leaving them blank is always safe.
 */
export const seoField = (): Field => ({
  name: "seo",
  type: "group",
  label: "سئو (نمایش در گوگل)",
  admin: {
    description: "عنوان و توضیحی که در نتایج گوگل و هنگام اشتراک‌گذاری لینک نمایش داده می‌شود. خالی بماند از متن پیش‌فرض استفاده می‌شود.",
  },
  fields: [
    {
      name: "metaTitle",
      type: "text",
      label: "عنوان صفحه",
      admin: { description: "بهتر است کمتر از ۶۰ کاراکتر باشد." },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "توضیح صفحه",
      admin: { description: "بهتر است بین ۱۲۰ تا ۱۶۰ کاراکتر باشد." },
    },
  ],
});
