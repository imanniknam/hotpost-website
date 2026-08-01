import Image from "next/image";

import logo from "../../../public/brand/logo.png";

/**
 * The real brand mark, taken from the live site's media library. Static rather
 * than CMS-managed: it is chrome, not content, and it must render even if the
 * database is unreachable.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="هات پست"
      priority
      className={className}
      sizes="150px"
    />
  );
}
