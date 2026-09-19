import type { GlobalConfig } from "payload";

import { seoField } from "../fields/seo";
import { globalRevalidationHooks } from "../hooks/revalidate";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "صفحه خدمات",
  admin: {
    group: "صفحات سایت",
    description: "متن بالای صفحه «خدمات». خود خدمت‌ها از بخش «خدمات» در منوی محتوا ویرایش می‌شوند.",
  },
  access: { read: () => true },
  hooks: globalRevalidationHooks,
  fields: [
    {
      name: "heading",
      type: "text",
      label: "تیتر صفحه",
      defaultValue: "خدمات هات پست",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      label: "متن معرفی",
      defaultValue:
        "خدمات پستی مختلف با انتخاب بهترین اپراتور از بین تیپاکس، چاپار، پینکس، ماهکس و ... انجام می‌شود.",
    },
    {
      type: "row",
      fields: [
        { name: "includesLabel", type: "text", label: "عنوان فهرست «خدمات شامل»", defaultValue: "خدمات شامل", admin: { width: "50%" } },
        { name: "benefitsLabel", type: "text", label: "عنوان فهرست «مزایا»", defaultValue: "مزایا", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "coverageLabel", type: "text", label: "عنوان فهرست «پوشش»", defaultValue: "پوشش", admin: { width: "50%" } },
        {
          name: "courierCoverageLabel",
          type: "text",
          label: "عنوان فهرست پوشش برای پیک اختصاصی",
          defaultValue: "مدل زمانی و حوزه جغرافیایی",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "bestForLabel",
      type: "text",
      label: "برچسب «بهترین گزینه برای»",
      defaultValue: "بهترین گزینه برای:",
    },
    seoField(),
  ],
};
