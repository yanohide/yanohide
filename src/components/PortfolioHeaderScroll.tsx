"use client";

import { useEffect } from "react";

/** ホームの固定ヘッダー：React state ではなく data-solid で見た目だけ切り替える（hydration 安全） */
export function PortfolioHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-portfolio-header]");
    if (!header) {
      return;
    }

    const el = header;

    function syncFromScroll() {
      el.dataset.solid = window.scrollY > 10 ? "true" : "false";
    }

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncFromScroll);
  }, []);

  return null;
}
