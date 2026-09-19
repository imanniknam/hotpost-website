import type { GlobalConfig } from "payload";

import { seoField } from "../fields/seo";
import { globalRevalidationHooks } from "../hooks/revalidate";

export const ShopPage: GlobalConfig = {
  slug: "shop-page",
  label: "صفحه فروشگاه",
  admin: {
    group: "صفحات سایت",
    description: "متن بالای صفحه «فروشگاه». محصولات و دسته‌بندی‌ها از منوی «فروشگاه» ویرایش می‌شوند.",
  },
  access: { read: () => true },
  hooks: globalRevalidationHooks,
  fields: [
    {
      name: "heading",
      type: "text",
      label: "تیتر صفحه",
      defaultValue: "فروشگاه هات پست",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      label: "متن معرفی",
      defaultValue: "هر چه برای بسته‌بندی، برچسب‌زنی و ارسال مرسولات لازم دارید — یکجا.",
    },
    {
      name: "allProductsHeading",
      type: "text",
      label: "تیتر بخش «همه محصولات»",
      defaultValue: "همه محصولات",
    },
    {
      name: "emptyText",
      type: "text",
      label: "متن وقتی محصولی نیست",
      defaultValue: "هنوز محصولی ثبت نشده است.",
    },
    seoField(),
  ],
};
