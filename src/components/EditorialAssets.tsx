import { JetBrains_Mono } from "next/font/google";

import "@/app/article-layout.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-portfolio-mono",
  display: "swap",
});

/** ブログ／記事ページだけ Mono と記事レイアウト CSS を載せる */
export function EditorialAssets({ children }: { children: React.ReactNode }) {
  return <div className={jetbrainsMono.variable}>{children}</div>;
}
