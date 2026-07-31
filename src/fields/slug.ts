import type { Field } from "payload";

/**
 * Persian titles do not transliterate to useful ASCII slugs, so the slug is a
 * required author-supplied field rather than something derived from the title.
 * It is validated to the character set that is safe in a URL path segment.
 */
export const slugField = (): Field[] => [
  {
    name: "slug",
    type: "text",
    label: "نامک (slug)",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "فقط حروف انگلیسی کوچک، عدد و خط تیره. مثال: postal-carton",
    },
    validate: (value: string | null | undefined) => {
      if (!value) return "نامک الزامی است.";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
        return "نامک فقط می‌تواند شامل حروف کوچک انگلیسی، عدد و خط تیره باشد.";
      }
      return true;
    },
  },
];
