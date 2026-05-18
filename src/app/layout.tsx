import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL.length > 0
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
  title: {
    default: "The Literary Review",
    template: "%s | The Literary Review",
  },
  description:
    "エディトリアル・マガジンスタイルの日本語ブログ。「思考と言葉の交差点」より。",
};

function Header() {
  return (
    <header className="mb-14 space-y-5 text-center animate-reveal">
      <div
        aria-hidden="true"
        className="mx-auto h-[2px] w-full max-w-3xl animate-expand-width bg-gradient-to-r from-transparent via-espresso to-transparent"
      />

      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 text-[10px] font-medium uppercase tracking-[0.22em] text-walnut sm:px-0">
        <span className="issue-badge rounded-full border-transparent bg-transparent px-3 py-1 text-[10px] normal-case tracking-[0.06em] text-gold ring-1 ring-gold/50">
          Est. 2026
        </span>
        <span className="font-medium normal-case tracking-wide text-espresso font-sans">
          思考と言葉の交差点
        </span>
        <span className="font-medium uppercase tracking-[0.2em] text-walnut">東京</span>
      </div>

      <Link href="/" className="group mx-auto flex max-w-4xl flex-col items-center px-6">
        <p className="masthead-title text-balance px-6 text-[clamp(2.6rem,6vw,3.95rem)] leading-[1.06] tracking-tight text-ink decoration-transparent transition-colors group-hover:text-espresso md:px-0">
          The Literary Review
        </p>
      </Link>

      <div className="mx-auto px-10">
        <p className="text-center font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-walnut">
          Essays · Criticism · Stories
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-10">
        <div className="masthead-rule animate-reveal-delay-1 mx-auto mb-2 h-px w-full max-w-2xl rounded-full opacity-95" />
        <div className="mx-auto h-px w-full max-w-2xl rounded-full bg-gradient-to-r from-transparent via-sand to-transparent opacity-95" />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 animate-reveal border-t border-sand bg-cream pb-14 pt-12">
      <div className="mx-auto max-w-4xl px-6 text-center text-walnut">
        <hr className="divider-double mx-auto mb-10 max-w-sm" />

        <p className="masthead-title mb-8 text-xl text-espresso md:text-2xl">The Literary Review</p>

        <p className="mb-8 text-xl text-sand md:text-2xl" aria-hidden="true">
          ◆
        </p>

        <p className="font-mono text-xs tracking-[0.2em] text-walnut">© {new Date().getFullYear()} THE LITERARY REVIEW</p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${notoSerifJp.variable} ${notoSansJp.variable} ${cormorantGaramond.variable}`;

  return (
    <html lang="ja" id="top">
      <body
        className={`${fontVars} min-h-screen bg-cream text-ink antialiased selection:bg-burgundy selection:text-ivory`}
        style={{ fontFamily: "var(--font-sans-jp)" }}
      >
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-24 pt-10 md:pb-28 md:pt-14">
            <Header />

            <div className="flex-1 animate-reveal-delay-2">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
