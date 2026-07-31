import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Media is served from Payload's local upload handler.
    remotePatterns: [],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
