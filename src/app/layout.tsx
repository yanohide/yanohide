import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteChrome } from "@/components/SiteChrome";

import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-portfolio-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL.length > 0
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : new URL("http://localhost:3000"),
  title: {
    default: "矢野英人 | 医療介護のAIクリエイター ポートフォリオ",
    template: "%s | 矢野英人",
  },
  description:
    "理学療法士の臨床18年。介護・医療・金融・Web3 のライティング。記事執筆100本以上。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "矢野英人 | 医療介護のAIクリエイター",
    title: "矢野英人 | 医療介護のAIクリエイター ポートフォリオ",
    description:
      "理学療法士の臨床18年。介護・医療・金融・Web3 のライティング。記事執筆100本以上。",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" id="top">
      <body
        className={`${jetbrainsMono.variable} ${notoSerifJP.variable} ${notoSansJP.variable} ${fraunces.variable} site-body site-body-portfolio scroll-pt-28 font-sans-jp text-slate-800 antialiased md:scroll-pt-20`}
      >
        <GoogleAnalytics />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
