import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "کاربر", plural: "کاربران" },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "سیستم",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "نام",
      required: true,
    },
  ],
};
