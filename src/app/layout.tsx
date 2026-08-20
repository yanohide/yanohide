import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

import { DevPreviewHydrationFix } from "@/components/DevPreviewHydrationFix";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PORTFOLIO } from "@/lib/portfolio-content";

import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL.length > 0
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : new URL("http://localhost:3000"),
  title: {
    default: `${PORTFOLIO.headerBrand} ポートフォリオ`,
    template: "%s | 矢野英人",
  },
  description:
    "理学療法士の臨床18年。介護・医療・金融・Web3 のライティング。記事執筆100本以上。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: PORTFOLIO.headerBrand,
    title: `${PORTFOLIO.headerBrand} ポートフォリオ`,
    description:
      "理学療法士の臨床18年。介護・医療・金融・Web3 のライティング。記事執筆100本以上。",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" id="top" suppressHydrationWarning>
      <head>
        <DevPreviewHydrationFix />
      </head>
      <body
        className={`${notoSerifJP.variable} ${notoSansJP.variable} site-body site-body-portfolio scroll-pt-24 font-sans-jp text-slate-800 antialiased lg:scroll-pt-28`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
