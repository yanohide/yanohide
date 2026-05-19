"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { TYPING_DESK_UNSPLASH } from "@/lib/typing-hero-asset";

const nav = [
  { href: "/", label: "ホーム" },
  { href: "/#services", label: "私にできること" },
  { href: "/#samples", label: "サンプル記事" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const isHome = pathname === "/";

  const [homeHeaderSolid, setHomeHeaderSolid] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setHomeHeaderSolid(false);
      return;
    }

    function syncFromScroll() {
      setHomeHeaderSolid(window.scrollY > 10);
    }

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncFromScroll);
  }, [isHome]);

  if (isStudio) {
    return <div className="min-h-dvh">{children}</div>;
  }

  return (
    <>
      {isHome && (
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[min(200vh,1200px)] w-full"
          aria-hidden
        >
          <div className="absolute inset-0">
            <Image
              src={TYPING_DESK_UNSPLASH}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-br from-slate-950/50 via-slate-800/35 to-blue-900/45 backdrop-blur-[14px] supports-[backdrop-filter]:from-slate-900/30 supports-[backdrop-filter]:via-slate-800/20 supports-[backdrop-filter]:to-blue-900/30" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/5 via-transparent to-amber-50/5" />
        </div>
      )}

      <header
        className={
          isHome
            ? homeHeaderSolid
              ? "fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md"
              : "fixed top-0 left-0 right-0 z-[100] w-full border-b border-transparent bg-transparent shadow-none"
            : "fixed top-0 left-0 right-0 z-[100] w-full border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md"
        }
      >
        <div className="relative z-10 mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link
            href="/"
            className={
              isHome && !homeHeaderSolid
                ? "text-left text-base font-bold leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:text-xl"
                : "text-left text-base font-bold leading-snug text-blue-900 md:text-xl"
            }
          >
            矢野英人
            <span
              className={
                isHome && !homeHeaderSolid
                  ? "mt-0.5 block text-xs font-bold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] md:mt-0 md:inline md:text-base"
                  : "mt-0.5 block text-xs font-bold text-slate-600 md:mt-0 md:inline md:text-base"
              }
            >
              {" "}
              | 医療介護のAIクリエイター
            </span>
          </Link>
          <nav
            className={
              isHome && !homeHeaderSolid
                ? "hidden flex-wrap items-center justify-end gap-4 text-sm font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] md:flex md:gap-6"
                : "hidden flex-wrap items-center justify-end gap-4 text-sm font-medium text-slate-700 md:flex md:gap-6"
            }
            aria-label="メイン"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isHome && !homeHeaderSolid
                    ? "transition hover:text-amber-200/95"
                    : "transition hover:text-blue-600"
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className={
                isHome && !homeHeaderSolid
                  ? "rounded-full border border-white/35 bg-white/10 px-3 py-1 text-white shadow-sm backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20"
                  : "rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-900 transition hover:bg-blue-100"
              }
            >
              ブログ
            </Link>
          </nav>
        </div>
        <div
          className={
            isHome && !homeHeaderSolid
              ? "relative z-10 border-t border-transparent px-4 py-2 md:hidden"
              : "border-t border-slate-100 px-4 py-2 md:hidden"
          }
        >
          <div
            className={
              isHome && !homeHeaderSolid
                ? "mx-auto flex max-w-7xl flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                : "mx-auto flex max-w-7xl flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-600"
            }
          >
            <Link href="/" className={isHome && !homeHeaderSolid ? "hover:text-amber-200" : "hover:text-blue-600"}>
              ホーム
            </Link>
            <Link
              href="/#services"
              className={isHome && !homeHeaderSolid ? "hover:text-amber-200" : "hover:text-blue-600"}
            >
              私にできること
            </Link>
            <Link
              href="/#samples"
              className={isHome && !homeHeaderSolid ? "hover:text-amber-200" : "hover:text-blue-600"}
            >
              サンプル
            </Link>
            <Link
              href="/#contact"
              className={isHome && !homeHeaderSolid ? "hover:text-amber-200" : "hover:text-blue-600"}
            >
              お問い合わせ
            </Link>
            <Link
              href="/blog"
              className={
                isHome && !homeHeaderSolid ? "font-semibold text-amber-200" : "font-semibold text-blue-800"
              }
            >
              ブログ
            </Link>
          </div>
        </div>
      </header>

      <main
        className={
          isHome
            ? "site-main relative z-[1] w-full max-w-none flex-1 bg-transparent px-0 pb-0 pt-28 md:pt-20"
            : "site-main relative z-[1] w-full max-w-none flex-1 bg-slate-50 px-0 pb-0 pt-28 md:pt-20"
        }
      >
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="text-center text-sm text-slate-600">
            &copy; {new Date().getFullYear()} 矢野英人 | 医療介護のAIクリエイター
          </p>
        </div>
      </footer>
    </>
  );
}
