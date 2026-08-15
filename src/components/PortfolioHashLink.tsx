"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import {
  dispatchPortfolioHashSync,
  parsePortfolioHashLink,
  scrollToPortfolioSection,
  setPortfolioHash,
} from "@/lib/portfolio-hash";

type PortfolioHashLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function PortfolioHashLink({
  href,
  className,
  children,
  onNavigate,
}: PortfolioHashLinkProps) {
  const pathname = usePathname();
  const sectionId = parsePortfolioHashLink(href);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;

    if (sectionId) {
      event.preventDefault();
      setPortfolioHash(sectionId);
      scrollToPortfolioSection(sectionId);
      dispatchPortfolioHashSync();
      onNavigate?.();
      return;
    }

    if (href === "/") {
      event.preventDefault();
      setPortfolioHash(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatchPortfolioHashSync();
      onNavigate?.();
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
