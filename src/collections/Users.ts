import type { Access, CollectionBeforeChangeHook, CollectionConfig } from "payload";

/**
 * Two roles:
 *   admin  — everything, including managing users and site settings.
 *   editor — day-to-day content (pages, products, services, FAQs, media).
 *            Cannot see or manage other users.
 */
const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";

const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return { id: { equals: user.id } };
};

/** The first account ever created (the /admin first-run form) must be an admin. */
const firstUserIsAdmin: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== "create") return data;
  const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
  return totalDocs === 0 ? { ...data, role: "admin" } : data;
};

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "کاربر", plural: "کاربران" },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "سیستم",
    defaultColumns: ["name", "email", "role"],
    hidden: ({ user }) => user?.role !== "admin",
  },
  hooks: { beforeChange: [firstUserIsAdmin] },
  access: {
    // Payload lets the very first user be created without being logged in
    // (the /admin first-run form); after that only admins can add users.
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "نام",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "نقش",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "مدیر (دسترسی کامل)", value: "admin" },
        { label: "ویرایشگر محتوا", value: "editor" },
      ],
      access: {
        // Editors must not be able to promote themselves.
        create: ({ req: { user } }) => user?.role === "admin",
        update: ({ req: { user } }) => user?.role === "admin",
      },
      admin: {
        position: "sidebar",
        description: "ویرایشگر می‌تواند محتوا را عوض کند ولی به کاربران دسترسی ندارد.",
      },
    },
  ],
};
