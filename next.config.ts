import type { NextConfig } from "next";

/**
 * Cloudflare Pages（@cloudflare/next-on-pages）向け:
 * `runtime: 'edge'` は next.config では指定できません。
 * App Router では各 layout / page / route で
 *   export const runtime = 'edge';
 * を export します（ルートは src/app/layout.tsx）。
 */
const nextConfig: NextConfig = {
  // 開発インジケーター（右下バッジ）のみ非表示。nextjs-portal はエラー表示用コンテナ
  devIndicators: false,
  turbopack: {
    root: import.meta.dirname,
  },
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
