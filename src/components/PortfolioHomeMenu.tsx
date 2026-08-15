"use client";

import { useEffect, useState } from "react";

import { PortfolioHashLink } from "@/components/PortfolioHashLink";

type NavItem = { href: string; label: string };

export function PortfolioHomeMenu({ nav }: { nav: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="portfolio-header-menu-btn"
        aria-expanded={open}
        aria-controls="portfolio-home-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="portfolio-header-menu-btn__icon" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="portfolio-header-menu-btn__label">MENU</span>
      </button>

      {open ? (
        <div
          className="portfolio-header-menu-backdrop"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id="portfolio-home-menu-panel"
        className={`portfolio-header-menu-panel${open ? " is-open" : ""}`}
        aria-label="メイン"
        aria-hidden={!open}
      >
        <ul className="portfolio-header-menu-panel__list">
          {nav.map((item) => (
            <li key={item.href}>
              <PortfolioHashLink
                href={item.href}
                className="portfolio-header-menu-panel__link"
                onNavigate={() => setOpen(false)}
              >
                {item.label}
              </PortfolioHashLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
