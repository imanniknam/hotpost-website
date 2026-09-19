import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Payload loads `sharp` as an external module, so Next's file tracing does not
  // see its native binaries and the serverless bundle ships without them. On
  // Vercel that makes every route that touches Payload's admin fail with
  // "libvips-cpp.so ... cannot open shared object file". Listing them here
  // forces them into the trace. Only the linux-x64 builds are needed there.
  outputFileTracingIncludes: {
    "/*": [
      "node_modules/sharp/**/*",
      "node_modules/@img/sharp-linux-x64/**/*",
      "node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  images: {
    // Locally, uploads are served from public/media as same-origin paths and
    // need no entry here. On Vercel they come from Blob, which is a different
    // origin — next/image refuses any remote host that is not listed.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
