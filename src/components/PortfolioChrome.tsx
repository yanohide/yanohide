import Image from "next/image";
import { headers } from "next/headers";

import { PortfolioHashLink } from "@/components/PortfolioHashLink";
import { PortfolioHashSync } from "@/components/PortfolioHashSync";
import { PortfolioHeaderScroll } from "@/components/PortfolioHeaderScroll";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import { PORTFOLIO } from "@/lib/portfolio-content";

const nav = [
  { href: "/", label: "ホーム" },
  { href: "/#profile", label: "プロフィール" },
  { href: "/#services", label: "私にできること" },
  { href: "/#samples", label: "実績・サンプル記事" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

const COPYRIGHT_YEAR = 2026;

export async function PortfolioChrome({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const isHome = pathname === "/";

  return (
    <>
      {isHome ? <PortfolioHeaderScroll /> : null}
      {isHome ? <PortfolioMotion /> : null}
      <PortfolioHashSync />

      {isHome ? (
        <div className="portfolio-ambient-layer" aria-hidden>
          <div className="portfolio-ambient-layer__wash" />
          <div className="portfolio-ambient-layer__orb portfolio-ambient-layer__orb--1" />
          <div className="portfolio-ambient-layer__orb portfolio-ambient-layer__orb--2" />
          <div className="portfolio-ambient-layer__orb portfolio-ambient-layer__orb--3" />
        </div>
      ) : null}

      <header
        data-portfolio-header={isHome ? "" : undefined}
        className={
          isHome
            ? "portfolio-header-on-hero portfolio-header-bar portfolio-header-bar--on-hero fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/20 bg-transparent shadow-none"
            : "portfolio-header-bar fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/80 bg-white/92 shadow-sm backdrop-blur-md"
        }
      >
        <div
          className={`portfolio-header-inner relative z-10 flex w-full min-h-12 items-center gap-3 px-4 py-2.5 md:min-h-[3.25rem] md:gap-4 md:px-8 md:py-3 ${
            isHome ? "" : "mx-auto max-w-7xl"
          }`}
        >
          <PortfolioHashLink href="/" className="portfolio-header-brand-link shrink-0">
            <span
              className={
                isHome
                  ? "portfolio-header-brand portfolio-header-hero-brand whitespace-nowrap text-white"
                  : "portfolio-header-brand whitespace-nowrap text-slate-800"
              }
            >
              {PORTFOLIO.headerBrand}
            </span>
          </PortfolioHashLink>
          <nav
            className={`portfolio-header-nav ml-auto shrink-0 ${
              isHome ? "text-white" : "hidden text-slate-600 md:flex"
            }`}
            aria-label="メイン"
          >
            {nav.map((item) => (
              <PortfolioHashLink
                key={item.href}
                href={item.href}
                className={
                  isHome
                    ? "portfolio-header-nav-link portfolio-header-hero-nav"
                    : "portfolio-header-nav-link portfolio-header-nav-link-solid"
                }
              >
                {item.label}
              </PortfolioHashLink>
            ))}
          </nav>
        </div>
        {!isHome ? (
          <div className="border-t border-slate-100 px-4 py-2 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-slate-600">
              {nav.map((item) => (
                <PortfolioHashLink key={item.href} href={item.href} className="hover:text-blue-600">
                  {item.label}
                </PortfolioHashLink>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main
        className={
          isHome
            ? "site-main relative z-[1] w-full max-w-none flex-1 bg-transparent px-0 pb-0 pt-0"
            : "site-main relative z-[1] w-full max-w-none flex-1 bg-clinic-glow px-0 pb-0 pt-24 md:pt-20"
        }
      >
        {children}
      </main>

      <footer
        className={`portfolio-footer-shell relative z-[2] isolate border-t border-slate-200/80${
          isHome ? " portfolio-ambient-zone" : ""
        }`}
      >
        <div className="relative z-[1] mx-auto max-w-3xl px-4 pt-8 pb-10 md:px-6 md:pt-10 md:pb-12">
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
                  unoptimized
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
        <div
          className={`border-t border-slate-100 py-4${
            isHome ? " bg-slate-50/35" : " bg-slate-50"
          }`}
        >
          <p className="text-center text-xs text-slate-500">
            &copy; {COPYRIGHT_YEAR} {PORTFOLIO.headerBrand}
          </p>
        </div>
      </footer>
    </>
  );
}
