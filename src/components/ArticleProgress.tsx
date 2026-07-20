"use client";

import { useEffect, useRef } from "react";

/** 記事ページ上部の読了プログレスバー（ゴールド〜バーガンディの編集誌トーン） */
export function ArticleProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    function sync() {
      rafId = 0;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.setProperty("--scroll-progress", progress.toFixed(4));
    }
    function onScroll() {
      if (rafId === 0) rafId = window.requestAnimationFrame(sync);
    }
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={barRef} className="article-progress" aria-hidden />;
}
