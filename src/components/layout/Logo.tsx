import Image from "next/image";

import type { Media } from "@/payload-types";

import logo from "../../../public/brand/logo.png";

/**
 * Uses the logo uploaded under Site Settings when there is one, and otherwise
 * the bundled brand mark. The fallback matters: the header must still render if
 * nothing has been uploaded (or the media record is gone).
 */
export function Logo({ className, media }: { className?: string; media?: Media | number | null }) {
  const custom = media && typeof media === "object" && media.url ? media : null;

  if (custom) {
    return (
      <Image
        src={custom.url as string}
        alt={custom.alt || "هات پست"}
        width={custom.width || 160}
        height={custom.height || 48}
        priority
        className={className}
        sizes="150px"
      />
    );
  }

  return <Image src={logo} alt="هات پست" priority className={className} sizes="150px" />;
}
