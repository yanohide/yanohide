const HASH_LINK = /^\/#([\w-]+)$/;

export function parsePortfolioHashLink(href: string): string | null {
  const match = href.match(HASH_LINK);
  return match?.[1] ?? null;
}

/** `#profile#profile` のような重複ハッシュから先頭のセクション ID だけ取り出す */
export function normalizePortfolioHash(raw: string): string | null {
  if (!raw) return null;
  const id = raw.replace(/^#+/, "").split("#").filter(Boolean)[0];
  return id ?? null;
}

export function setPortfolioHash(id: string | null) {
  const target = id ? `#${id}` : window.location.pathname;
  if (window.location.hash === (id ? `#${id}` : "")) return;
  history.replaceState(null, "", target);
}

export function scrollToPortfolioSection(
  id: string,
  opts?: { behavior?: ScrollBehavior },
) {
  document.getElementById(id)?.scrollIntoView({
    behavior: opts?.behavior ?? "smooth",
  });
}

export function dispatchPortfolioHashSync() {
  window.dispatchEvent(new CustomEvent("portfolio:hash-sync"));
}
