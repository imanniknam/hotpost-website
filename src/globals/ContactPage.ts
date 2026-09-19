import type { GlobalConfig } from "payload";

import { seoField } from "../fields/seo";
import { globalRevalidationHooks } from "../hooks/revalidate";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "صفحه تماس با ما",
  admin: {
    group: "صفحات سایت",
    description: "شماره‌ها، آدرس و ساعت کاری از «تنظیمات سایت» ویرایش می‌شوند؛ اینجا فقط متن‌های این صفحه است.",
  },
  access: { read: () => true },
  hooks: globalRevalidationHooks,
  fields: [
    {
      name: "heading",
      type: "text",
      label: "تیتر صفحه",
      defaultValue: "تماس با ما",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      label: "متن معرفی",
      admin: { description: "خالی بماند، تیتر و زیرتیتر بخش پشتیبانی (در تنظیمات سایت) نمایش داده می‌شود." },
    },
    {
      type: "row",
      fields: [
        { name: "phonesLabel", type: "text", label: "عنوان کارت شماره تماس", defaultValue: "شماره تماس", admin: { width: "34%" } },
        { name: "hoursLabel", type: "text", label: "عنوان کارت ساعت پاسخگویی", defaultValue: "روز و ساعت پاسخگویی", admin: { width: "33%" } },
        { name: "addressLabel", type: "text", label: "عنوان کارت آدرس", defaultValue: "آدرس", admin: { width: "33%" } },
      ],
    },
    seoField(),
  ],
};
