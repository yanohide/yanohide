import type { TypedObject } from "@portabletext/types";

export type TocItem = {
  id: string;
  level: 2 | 3;
  number: string;
  text: string;
};

type Block = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: { text?: string }[];
};

/** 本文 PortableText から h2/h3 だけを抽出して、TOC 項目と「最初の h2 の位置」を返す。 */
export function extractToc(body: TypedObject[] | null | undefined): {
  items: TocItem[];
  firstHeadingIndex: number;
} {
  if (!Array.isArray(body) || body.length === 0) {
    return { items: [], firstHeadingIndex: -1 };
  }
  const items: TocItem[] = [];
  let h2Counter = 0;
  let h3Counter = 0;
  let firstHeadingIndex = -1;

  body.forEach((b, idx) => {
    const block = b as Block;
    if (block?._type !== "block") return;
    const style = block.style;
    if (style !== "h2" && style !== "h3") return;
    const text = (block.children ?? [])
      .map((c) => (typeof c?.text === "string" ? c.text : ""))
      .join("")
      .trim();
    if (!text || !block._key) return;
    if (firstHeadingIndex < 0) firstHeadingIndex = idx;
    if (style === "h2") {
      h2Counter++;
      h3Counter = 0;
      items.push({
        id: `h-${block._key}`,
        level: 2,
        number: `${h2Counter}`,
        text,
      });
    } else if (style === "h3") {
      // h2 の前に h3 が出ても落ちないよう 0 始まりを許容
      h3Counter++;
      items.push({
        id: `h-${block._key}`,
        level: 3,
        number: `${h2Counter}-${h3Counter}`,
        text,
      });
    }
  });

  return { items, firstHeadingIndex };
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <aside className="not-prose my-12" aria-label="目次">
      <details
        open
        className="article-toc group/toc mx-auto max-w-[40rem] px-5 py-4 sm:px-7 sm:py-5"
      >
        <summary
          className="flex cursor-pointer list-none items-center justify-center gap-2 select-none py-1 font-serif-jp text-[0.95rem] font-bold tracking-[0.14em] text-ink transition-colors hover:text-burgundy [&::-webkit-details-marker]:hidden"
        >
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-sand" />
          <span aria-hidden className="text-[0.95rem] leading-none text-gold-bright">
            ≡
          </span>
          <span>目 次</span>
          <span
            aria-hidden
            className="ml-1 inline-block text-[0.7rem] leading-none text-walnut/70 transition-transform duration-200 group-open/toc:rotate-180"
          >
            ▼
          </span>
          <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-sand" />
          <span className="sr-only group-open/toc:hidden">開く</span>
          <span className="sr-only hidden group-open/toc:inline">閉じる</span>
        </summary>
        <ol className="mt-4 space-y-0.5 text-[0.84rem] leading-snug">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? "pl-7" : ""}
            >
              <a
                href={`#${item.id}`}
                className={`article-toc-link group flex items-baseline gap-2.5 px-2 py-1 ${
                  item.level === 2
                    ? "font-semibold text-ink"
                    : "text-espresso/90"
                }`}
              >
                <span
                  className={`shrink-0 font-mono text-[0.7rem] tracking-tight ${
                    item.level === 2 ? "text-ember" : "text-walnut/75"
                  }`}
                >
                  {item.number}
                </span>
                <span aria-hidden className="text-sand">
                  │
                </span>
                <span className="min-w-0 flex-1 transition-colors group-hover:text-burgundy">
                  {item.text}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </aside>
  );
}
