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
                className="portfolio-hero-bg-image object-cover object-[center_38%]"
                sizes="(min-width: 1280px) 1152px, 100vw"
                priority
              />
            </div>
            <div className="portfolio-hero-bg-overlay-top absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-bg-overlay-bottom absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-grain absolute inset-0 z-[1]" aria-hidden />
          </div>
        </div>
      )}

      <header
        className={
          isHome
            ? homeHeaderSolid
              ? "fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md"
              : "portfolio-header-on-hero fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/15 bg-transparent shadow-none"
            : "fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md"
        }
      >
        <div
          className={`relative z-10 mx-auto flex min-h-14 items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-5 ${
            isHome ? "portfolio-cinema-frame" : "max-w-7xl"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span
              className={`portfolio-script-title inline-block text-xs font-bold leading-tight sm:text-sm md:text-base ${
                headerOnHero ? "portfolio-header-hero-brand text-white" : "text-blue-900"
              }`}
            >
              {PORTFOLIO.headerBrand}
            </span>
          </Link>
          <nav
            className={
              isHome
                ? headerOnHero
                  ? "flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-white md:gap-x-7"
                  : "flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs font-medium text-slate-700 md:gap-x-7 md:text-sm"
                : "hidden flex-wrap items-center justify-end gap-3 text-xs font-medium text-slate-700 md:flex md:gap-5 md:text-sm"
            }
            aria-label="メイン"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  headerOnHero
                    ? "portfolio-cinema-nav portfolio-header-hero-nav transition hover:text-white/85"
                    : "transition hover:text-blue-600"
                }
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

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-12 md:flex-row md:items-start md:gap-10 md:px-6">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-sky-100">
            <Image
              src="/avatars/profile-avatar.png"
              alt={PORTFOLIO.name}
              width={96}
              height={96}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-bold tracking-wider text-sky-600">ABOUT ME</p>
            <p className="mt-1 text-lg font-bold text-blue-900">
              {PORTFOLIO.name}｜Yano Hideto
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              プロフィールをご覧いただき、誠にありがとうございます。Webライターの{PORTFOLIO.name}
              と申します。SEO記事執筆を中心に、医療・介護・金融分野で丁寧な仕事と円滑なコミュニケーションを心がけています。お問い合わせをお待ちしております。
            </p>
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
