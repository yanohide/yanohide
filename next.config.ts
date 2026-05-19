import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sonocafe.xyz",
        pathname: "/**",
      },
    ],
  },
  /*
   * Cloudflare local bindings (requires macOS 13.5+ / supported Linux workerd runtime):
   * import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
   * initOpenNextCloudflareForDev();
   */
};

export default nextConfig;
