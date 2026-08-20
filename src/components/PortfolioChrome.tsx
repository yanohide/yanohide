import Image from "next/image";
import { headers } from "next/headers";

import { PortfolioHashLink } from "@/components/PortfolioHashLink";
import { PortfolioHashSync } from "@/components/PortfolioHashSync";
import { PortfolioHeaderNav } from "@/components/PortfolioHeaderNav";
import { PortfolioHeaderScroll } from "@/components/PortfolioHeaderScroll";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import { PORTFOLIO } from "@/lib/portfolio-content";

const nav = [
  { href: "/", label: "ホーム" },
  { href: "/#profile", label: "プロフィール" },
  { href: "/#services", label: "私にできること" },
  { href: "/#samples", label: "実績・サンプル記事" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

const COPYRIGHT_YEAR = 2026;

export async function PortfolioChrome({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const isHome = pathname === "/";

  return (
    <>
      <PortfolioHeaderScroll />
      {isHome ? <PortfolioMotion /> : null}
      <PortfolioHashSync />

      <header
        data-portfolio-header=""
        data-solid="false"
        data-menu-open="false"
        className="portfolio-header-bar portfolio-header-bar--teo fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/70 bg-white"
      >
        <div className="portfolio-header-inner portfolio-layout-inner relative z-10 flex w-full min-h-14 flex-row items-center justify-between gap-3 py-2 lg:min-h-[4.25rem] lg:gap-4 lg:py-3">
          <PortfolioHashLink
            href="/"
            className="portfolio-header-brand-link shrink-0"
            aria-label={PORTFOLIO.headerTitle}
          >
            <span className="portfolio-header-brand portfolio-header-brand--teo">
              <span className="portfolio-header-brand-copy">
                <span className="portfolio-header-brand-copy__primary">{PORTFOLIO.headerBrand}</span>
              </span>
            </span>
          </PortfolioHashLink>
          <PortfolioHeaderNav items={nav} />
        </div>
      </header>

      <main
        className={
          isHome
            ? "site-main relative z-[1] w-full max-w-none flex-1 bg-transparent px-0 pb-0 pt-0"
            : "site-main relative z-[1] w-full max-w-none flex-1 bg-clinic-glow px-0 pb-0 pt-20 lg:pt-24"
        }
      >
        {children}
      </main>

      <footer className="portfolio-footer-shell relative z-[2] isolate border-t border-slate-200/80">
        <div className="portfolio-layout-inner relative z-[1] pt-8 pb-10 md:pt-10 md:pb-12">
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
        <div className="portfolio-footer-bottom relative z-[1] border-t border-slate-100/80 bg-slate-50 py-4">
          <nav className="portfolio-footer-nav" aria-label="フッター">
            {nav.map((item) => (
              <PortfolioHashLink
                key={item.href}
                href={item.href}
                className="portfolio-footer-nav-link"
              >
                {item.label}
              </PortfolioHashLink>
            ))}
          </nav>
          <p className="portfolio-footer-copyright">
            &copy; {COPYRIGHT_YEAR} {PORTFOLIO.headerBrand}
          </p>
        </div>
      </footer>
    </>
  );
}
