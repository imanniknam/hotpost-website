import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
