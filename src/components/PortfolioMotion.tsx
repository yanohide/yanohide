"use client";

import { useEffect, useRef } from "react";

const REVEAL_THRESHOLD = 0.1;
const REVEAL_ROOT_MARGIN = "0px 0px -5% 0px";

function revealThresholdFor(el: HTMLElement): number {
  return el.dataset.reveal === "zoom" ? 0.05 : REVEAL_THRESHOLD;
}

/** IntersectionObserver と同じ基準で、すでに画面内にある要素を即座に表示する */
function revealIfInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return false;
  const rootBottom = window.innerHeight * 0.95;
  const visible = Math.max(
    0,
    Math.min(rect.bottom, rootBottom) - Math.max(rect.top, 0),
  );
  if (visible / rect.height >= revealThresholdFor(el)) {
    el.classList.add("is-revealed");
    return true;
  }
  return false;
}

function syncVisibleReveals(els: HTMLElement[]) {
  els.forEach((el) => {
    if (!el.classList.contains("is-revealed")) {
      revealIfInViewport(el);
    }
  });
}

/**
 * スクロール進捗バーと data-reveal の表示を担う。
 * React state を使わず DOM 直接操作で完結させ、hydration を安全に保つ。
 */
export function PortfolioMotion() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("portfolio-motion-ready");
    if (prefersReduced) {
      root.classList.add("portfolio-motion-reduced");
    }

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

    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let revealObserver: IntersectionObserver | null = null;
    let scrollRestoreTimer: number | undefined;
    let onPageShow: ((event: PageTransitionEvent) => void) | undefined;
    let onHashSync: (() => void) | undefined;
    let onRevealScroll: (() => void) | undefined;
    let revealScrollRaf = 0;
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
        { threshold: [0, REVEAL_THRESHOLD, 0.16], rootMargin: REVEAL_ROOT_MARGIN },
      );
      revealEls.forEach((el) => revealObserver!.observe(el));
      const syncAfterScrollRestore = () => syncVisibleReveals(revealEls);
      requestAnimationFrame(() => {
        requestAnimationFrame(syncAfterScrollRestore);
      });
      scrollRestoreTimer = window.setTimeout(syncAfterScrollRestore, 150);
      onRevealScroll = () => {
        if (revealScrollRaf !== 0) return;
        revealScrollRaf = window.requestAnimationFrame(() => {
          revealScrollRaf = 0;
          syncVisibleReveals(
            Array.from(
              document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"),
            ),
          );
        });
      };
      window.addEventListener("scroll", onRevealScroll, { passive: true });
      onPageShow = (event: PageTransitionEvent) => {
        if (!event.persisted) return;
        syncVisibleReveals(
          Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")),
        );
      };
      window.addEventListener("pageshow", onPageShow);
      onHashSync = () => {
        const syncAllReveals = () =>
          syncVisibleReveals(
            Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")),
          );
        window.setTimeout(syncAllReveals, 150);
        window.setTimeout(syncAllReveals, 450);
        window.setTimeout(syncAllReveals, 900);
      };
      window.addEventListener("portfolio:hash-sync", onHashSync);
    }

    return () => {
      root.classList.remove("portfolio-motion-ready", "portfolio-motion-reduced");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollRestoreTimer !== undefined) {
        window.clearTimeout(scrollRestoreTimer);
      }
      if (onPageShow) {
        window.removeEventListener("pageshow", onPageShow);
      }
      if (onHashSync) {
        window.removeEventListener("portfolio:hash-sync", onHashSync);
      }
      if (onRevealScroll) {
        window.removeEventListener("scroll", onRevealScroll);
      }
      if (revealScrollRaf) window.cancelAnimationFrame(revealScrollRaf);
      if (rafId) window.cancelAnimationFrame(rafId);
      revealObserver?.disconnect();
    };
  }, []);

  return <div ref={barRef} className="portfolio-scroll-progress" aria-hidden />;
}
