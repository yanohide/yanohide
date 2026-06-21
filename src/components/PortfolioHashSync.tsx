"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  dispatchPortfolioHashSync,
  normalizePortfolioHash,
  scrollToPortfolioSection,
  setPortfolioHash,
} from "@/lib/portfolio-hash";

/** ホームのハッシュ URL を正規化し、該当セクションへスクロールする */
export function PortfolioHashSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    function syncFromHash(behavior: ScrollBehavior) {
      const raw = window.location.hash;
      if (!raw) return;

      const id = normalizePortfolioHash(raw);
      if (!id) {
        history.replaceState(null, "", pathname);
        return;
      }

      if (raw !== `#${id}`) {
        setPortfolioHash(id);
      }

      scrollToPortfolioSection(id, { behavior });
      dispatchPortfolioHashSync();
    }

    syncFromHash("auto");

    function onHashChange() {
      syncFromHash("smooth");
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) syncFromHash("auto");
    }

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
