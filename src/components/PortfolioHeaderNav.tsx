"use client";

import { PortfolioHashLink } from "@/components/PortfolioHashLink";

export type PortfolioNavItem = {
  href: string;
  label: string;
};

export function PortfolioHeaderNav({ items }: { items: readonly PortfolioNavItem[] }) {
  return (
    <nav className="portfolio-header-nav" aria-label="メイン">
      {items.map((item) => (
        <PortfolioHashLink key={item.href} href={item.href} className="portfolio-header-nav-link">
          {item.label}
        </PortfolioHashLink>
      ))}
    </nav>
  );
}
