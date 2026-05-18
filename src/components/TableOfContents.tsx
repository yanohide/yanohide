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
    <aside className="not-prose my-10 border-y border-sand/70 py-4" aria-label="目次">
      <details
        open
        className="group/toc mx-auto max-w-[40rem]"
      >
        <summary
          className="flex cursor-pointer list-none items-center justify-center gap-2 select-none py-1 font-sans text-[0.85rem] font-semibold tracking-wide text-walnut transition-colors hover:text-ink [&::-webkit-details-marker]:hidden"
        >
          <span aria-hidden className="text-[0.95rem] leading-none">
            ≡
          </span>
          <span>目次</span>
          <span
            aria-hidden
            className="ml-1 inline-block text-[0.7rem] leading-none text-walnut/70 transition-transform duration-200 group-open/toc:rotate-180"
          >
            ▼
          </span>
          <span className="sr-only group-open/toc:hidden">開く</span>
          <span className="sr-only hidden group-open/toc:inline">閉じる</span>
        </summary>
        <ol className="mt-3 space-y-1 px-2 text-[0.82rem] leading-snug">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? "pl-7" : ""}
            >
              <a
                href={`#${item.id}`}
                className="group flex items-baseline gap-2 py-0.5 text-digital decoration-digital/30 underline-offset-4 transition-colors hover:text-burgundy hover:underline hover:decoration-burgundy/40"
              >
                <span className="shrink-0 font-mono text-[0.72rem] text-walnut/70">
                  {item.number}
                </span>
                <span aria-hidden className="text-walnut/50">
                  │
                </span>
                <span className="min-w-0 flex-1">{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </aside>
  );
}
