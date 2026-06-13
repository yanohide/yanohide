"use client";

import { useEffect, useRef } from "react";

/**
 * ポートフォリオのプレミアム演出をまとめて担うクライアントコンポーネント。
 * - スクロール進捗バー（上部のグラデーションバー）
 * - data-reveal 要素のスクロールリビール（IntersectionObserver）
 * - data-countup 要素の数字カウントアップ
 * - data-spotlight 要素のカーソル追従スポットライト（--spot-x / --spot-y）
 *
 * React state を使わず DOM 直接操作で完結させ、hydration を安全に保つ。
 */
export function PortfolioMotion() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── スクロール進捗バー ──────────────────────────────
    const bar = barRef.current;
    let rafId = 0;
    function syncProgress() {
      rafId = 0;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.setProperty("--scroll-progress", progress.toFixed(4));
    }
    function onScroll() {
      if (rafId === 0) rafId = window.requestAnimationFrame(syncProgress);
    }
    syncProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // ── スクロールリビール ──────────────────────────────
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let revealObserver: IntersectionObserver | null = null;
    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
    } else {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
      );
      revealEls.forEach((el) => revealObserver!.observe(el));
    }

    // ── 数字カウントアップ ──────────────────────────────
    const countEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-countup]"),
    );
    function formatCount(el: HTMLElement, value: number) {
      const prefix = el.dataset.countupPrefix ?? "";
      const suffix = el.dataset.countupSuffix ?? "";
      const rounded = Math.round(value);
      const useGroup = el.dataset.countupGroup === "true";
      const body = useGroup ? rounded.toLocaleString("en-US") : String(rounded);
      el.textContent = `${prefix}${body}${suffix}`;
    }
    function runCount(el: HTMLElement) {
      const target = Number(el.dataset.countup ?? "0");
      if (prefersReduced || !Number.isFinite(target)) {
        formatCount(el, target);
        return;
      }
      const duration = 1400;
      const start = performance.now();
      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        formatCount(el, target * eased);
        if (t < 1) window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    }
    countEls.forEach((el) => formatCount(el, 0));
    let countObserver: IntersectionObserver | null = null;
    if (prefersReduced) {
      countEls.forEach((el) => runCount(el));
    } else {
      countObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target as HTMLElement);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      countEls.forEach((el) => countObserver!.observe(el));
    }

    // ── カーソル追従スポットライト ─────────────────────
    const spotlightEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]"),
    );
    function onPointerMove(event: PointerEvent) {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
    }
    if (!prefersReduced) {
      spotlightEls.forEach((el) =>
        el.addEventListener("pointermove", onPointerMove),
      );
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      revealObserver?.disconnect();
      countObserver?.disconnect();
      spotlightEls.forEach((el) =>
        el.removeEventListener("pointermove", onPointerMove),
      );
    };
  }, []);

  return <div ref={barRef} className="portfolio-scroll-progress" aria-hidden />;
}
