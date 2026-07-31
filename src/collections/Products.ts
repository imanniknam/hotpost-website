import type { CollectionConfig } from "payload";

import { collectionRevalidationHooks } from "../hooks/revalidate";

import { slugField } from "../fields/slug";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "محصول", plural: "محصولات" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "price", "stock", "featured"],
    group: "فروشگاه",
  },
  access: { read: () => true },
  hooks: collectionRevalidationHooks,
  fields: [
    {
      name: "title",
      type: "text",
      label: "نام محصول",
      required: true,
    },
    ...slugField(),
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      label: "دسته‌بندی",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "نمایش در صفحه اصلی",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "قیمت و موجودی",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "price",
                  type: "number",
                  label: "قیمت (تومان)",
                  required: true,
                  min: 0,
                  admin: {
                    width: "50%",
                    description: "عدد خام به تومان. مثال: ۱۳۴۹۰ برای ۱۳,۴۹۰ تومان",
                  },
                },
                {
                  name: "compareAtPrice",
                  type: "number",
                  label: "قیمت پیش از تخفیف (تومان)",
                  min: 0,
                  admin: {
                    width: "50%",
                    description: "اختیاری. اگر پر شود، خط‌خورده کنار قیمت نمایش داده می‌شود.",
                  },
                },
              ],
            },
            {
              name: "sku",
              type: "text",
              label: "کد محصول",
            },
            {
              name: "stock",
              type: "number",
              label: "موجودی",
              defaultValue: 0,
              min: 0,
            },
          ],
        },
        {
          label: "تنوع محصول",
          description: "مثلاً سایزهای کارتن پستی یا طول ریبون. اگر محصول تنوع ندارد خالی بگذارید.",
          fields: [
            {
              name: "variants",
              type: "array",
              label: "تنوع‌ها",
              labels: { singular: "تنوع", plural: "تنوع‌ها" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "عنوان",
                      required: true,
                      admin: { width: "40%", description: "مثال: سایز ۵ سه لایه" },
                    },
                    {
                      name: "price",
                      type: "number",
                      label: "قیمت (تومان)",
                      min: 0,
                      admin: { width: "30%", description: "خالی = قیمت پایه محصول" },
                    },
                    {
                      name: "stock",
                      type: "number",
                      label: "موجودی",
                      defaultValue: 0,
                      min: 0,
                      admin: { width: "30%" },
                    },
                  ],
                },
                { name: "sku", type: "text", label: "کد" },
              ],
            },
          ],
        },
        {
          label: "مشخصات",
          fields: [
            {
              name: "specs",
              type: "array",
              label: "مشخصات فنی",
              labels: { singular: "مشخصه", plural: "مشخصات" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      label: "عنوان",
                      required: true,
                      admin: { width: "50%", description: "مثال: طول" },
                    },
                    {
                      name: "value",
                      type: "text",
                      label: "مقدار",
                      required: true,
                      admin: { width: "50%", description: "مثال: ۲۵ سانتی‌متر" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "array",
      label: "تصاویر",
      labels: { singular: "تصویر", plural: "تصاویر" },
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "توضیح کوتاه",
      admin: { description: "در کارت محصول و متا دیسکریپشن استفاده می‌شود." },
    },
    {
      name: "description",
      type: "richText",
      label: "توضیحات کامل",
    },
  ],
};
