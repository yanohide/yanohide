"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PORTFOLIO } from "@/lib/portfolio-content";
import { TYPING_DESK_UNSPLASH } from "@/lib/typing-hero-asset";

const nav = [
  { href: "/", label: "ホーム" },
  { href: "/#services", label: "私にできること" },
  { href: "/#samples", label: "実績・サンプル記事" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const isHome = pathname === "/";

  const [homeScrollPastHero, setHomeScrollPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    function syncFromScroll() {
      setHomeScrollPastHero(window.scrollY > 10);
    }

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncFromScroll);
  }, [isHome]);

  const homeHeaderSolid = isHome && homeScrollPastHero;

  if (isStudio) {
    return <div className="min-h-dvh">{children}</div>;
  }

  const headerOnHero = isHome && !homeHeaderSolid;

  return (
    <>
      {isHome && (
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[58svh] min-h-[400px] w-full"
          aria-hidden
        >
          <div className="portfolio-cinema-frame relative mx-auto h-full">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={TYPING_DESK_UNSPLASH}
                alt=""
                fill
                className="portfolio-hero-bg-image object-cover object-center"
                sizes="(min-width: 1280px) 1152px, 100vw"
                priority
              />
            </div>
            <div className="portfolio-hero-ai-grid absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-ai-mesh absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-ai-glow absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-bg-overlay-top absolute inset-0 z-[2]" aria-hidden />
            <div className="portfolio-hero-bg-overlay-bottom absolute inset-0 z-[2]" aria-hidden />
            <div className="portfolio-hero-grain absolute inset-0 z-[2]" aria-hidden />
          </div>
        </div>
      )}

      <header
        className={
          isHome
            ? homeHeaderSolid
              ? "portfolio-header-bar fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/80 bg-white/92 shadow-sm backdrop-blur-md"
              : "portfolio-header-on-hero portfolio-header-bar fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/20 bg-transparent shadow-none"
            : "portfolio-header-bar fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/80 bg-white/92 shadow-sm backdrop-blur-md"
        }
      >
        <div
          className={`portfolio-header-inner relative z-10 mx-auto flex min-h-12 items-center justify-between gap-4 px-4 py-2.5 md:min-h-[3.25rem] md:px-8 md:py-3 ${
            isHome ? "portfolio-cinema-frame" : "max-w-7xl"
          }`}
        >
          <Link href="/" className="portfolio-header-brand-link shrink-0">
            <span
              className={`portfolio-header-brand ${
                headerOnHero ? "portfolio-header-hero-brand text-white" : "text-slate-800"
              }`}
            >
              {PORTFOLIO.headerBrand}
            </span>
          </Link>
          <nav
            className={`portfolio-header-nav ${
              isHome
                ? headerOnHero
                  ? "text-white"
                  : "text-slate-600"
                : "hidden text-slate-600 md:flex"
            }`}
            aria-label="メイン"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`portfolio-header-nav-link ${
                  headerOnHero ? "portfolio-header-hero-nav" : "portfolio-header-nav-link-solid"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {!isHome && !headerOnHero && (
          <div className="border-t border-slate-100 px-4 py-2 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-slate-600">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main
        className={
          isHome
            ? "site-main relative z-[1] w-full max-w-none flex-1 bg-transparent px-0 pb-0 pt-0"
            : "site-main relative z-[1] w-full max-w-none flex-1 bg-slate-50 px-0 pb-0 pt-24 md:pt-20"
        }
      >
        {children}
      </main>

      <footer className="relative z-[2] isolate border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl bg-white px-4 pt-8 pb-10 md:px-6 md:pt-10 md:pb-12">
          <div className="portfolio-footer-about">
            <p className="portfolio-footer-about-label">ABOUT ME</p>
            <div className="portfolio-footer-about-inner">
              <div className="portfolio-footer-about-avatar shrink-0">
                <Image
                  src="/avatars/profile-avatar.png"
                  alt={PORTFOLIO.name}
                  width={144}
                  height={144}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="portfolio-footer-about-content min-w-0 flex-1 text-left">
                <p className="portfolio-footer-about-name">
                  {PORTFOLIO.name} | {PORTFOLIO.nameEn}
                </p>
                <div className="portfolio-footer-about-social">
                  <span className="portfolio-footer-about-social-link" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                  <a
                    href={`mailto:${PORTFOLIO.email}`}
                    className="portfolio-footer-about-social-link"
                    aria-label="メールでお問い合わせ"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <p className="portfolio-footer-about-bio">{PORTFOLIO.footerBio}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 py-4">
          <p className="text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {PORTFOLIO.headerBrand}
          </p>
        </div>
      </footer>
    </>
  );
}
