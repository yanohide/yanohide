"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { PortfolioHashLink } from "@/components/PortfolioHashLink";

export type PortfolioNavItem = {
  href: string;
  label: string;
};

export function PortfolioHeaderNav({ items }: { items: readonly PortfolioNavItem[] }) {
  const [open, setOpen] = useState(false);
  const [headerEl, setHeaderEl] = useState<HTMLElement | null>(null);
  const panelId = useId();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-portfolio-header]");
    setHeaderEl(header);
    if (!header) return;

    function syncOffset() {
      document.documentElement.style.setProperty(
        "--portfolio-header-offset",
        `${header.getBoundingClientRect().height}px`,
      );
    }

    syncOffset();
    window.addEventListener("resize", syncOffset);
    return () => window.removeEventListener("resize", syncOffset);
  }, []);

  useEffect(() => {
    headerEl?.setAttribute("data-menu-open", open ? "true" : "false");
  }, [headerEl, open]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const drawer = (
    <>
      <div
        className={`portfolio-header-drawer-backdrop${open ? " is-open" : ""}`}
        hidden={!open}
        onClick={() => setOpen(false)}
      />
      <nav
        id={panelId}
        className={`portfolio-header-drawer${open ? " is-open" : ""}`}
        aria-label="モバイル"
        hidden={!open}
      >
        {items.map((item) => (
          <PortfolioHashLink
            key={item.href}
            href={item.href}
            className="portfolio-header-drawer-link"
            onNavigate={() => setOpen(false)}
          >
            {item.label}
          </PortfolioHashLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <nav className="portfolio-header-nav" aria-label="メイン">
        {items.map((item) => (
          <PortfolioHashLink key={item.href} href={item.href} className="portfolio-header-nav-link">
            {item.label}
          </PortfolioHashLink>
        ))}
      </nav>

      <button
        type="button"
        className="portfolio-header-menu-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">{open ? "メニューを閉じる" : "メニューを開く"}</span>
        <span className={`portfolio-header-menu-icon${open ? " is-open" : ""}`} aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </button>

      {headerEl ? createPortal(drawer, document.body) : null}
    </>
  );
}
