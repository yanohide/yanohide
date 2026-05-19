"use client";

import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useId } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import type { TypedObject } from "@portabletext/types";
import { urlForImage } from "@/sanity/lib/imageUrl";

type RichTableCell = { _key?: string; content?: TypedObject[] | null };
type RichTableRow = { _key?: string; title?: string; cells?: RichTableCell[] };
type RichTableBlockValue = {
  rows?: RichTableRow[];
  columnHeaders?: { _key?: string; title?: string; cellIndex?: number }[];
  hasColumnTitles?: boolean;
  hasRowTitles?: boolean;
};

function shouldBypassImageOptimization(src: string) {
  // SVG は next/image の最適化対象外（dangerouslyAllowSVG が無いと 400 となる）
  if (src.endsWith(".svg")) return true;
  return src.startsWith("http") && !src.startsWith("https://cdn.sanity.io/");
}

const codeBlock = ({
  value,
}: { value?: { code?: string; language?: string } }) => (
  <div className="my-6 overflow-x-auto rounded-lg border border-sand/50 bg-ink/90 p-4 text-ivory">
    <pre className="m-0 font-mono text-[0.85rem] leading-relaxed text-ivory/95">
      <code
        className={value?.language ? `language-${value.language}` : undefined}
      >
        {value?.code}
      </code>
    </pre>
  </div>
);

const dividerBlock = ({ value }: { value?: { label?: string } }) => (
  <hr
    className="my-10 border-0 border-t-2 border-dotted border-sand/60"
    aria-label={value?.label || "区切り"}
  />
);

type TableRow = { _key?: string; cells?: string[] };

const tableBlock = ({
  value,
}: {
  value?: {
    caption?: string;
    hasHeaderRow?: boolean;
    rows?: TableRow[];
  };
}) => {
  const rows = value?.rows ?? [];
  if (rows.length === 0) return null;
  const hasHeader = value?.hasHeaderRow !== false;
  const headRow = hasHeader ? rows[0] : null;
  const bodyRows = hasHeader ? rows.slice(1) : rows;

  return (
    <figure className="my-7 w-full overflow-x-auto">
      {value?.caption && (
        <figcaption className="mb-[0.35rem] text-center text-sm font-semibold text-ink">
          {value.caption}
        </figcaption>
      )}
      <table className="w-full min-w-[20rem] border-collapse border border-stone-300 text-[0.95rem] leading-[1.05]">
        {headRow && (
          <thead>
            <tr>
              {(headRow.cells ?? []).map((cell, i) => (
                <th
                  key={i}
                  className="border border-sand/50 bg-gold-soft px-4 py-[0.525rem] text-left font-serif-jp font-bold text-white"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={row._key ?? ri} className="bg-white">
              {(row.cells ?? []).map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-stone-300 px-4 py-[0.525rem] align-top text-espresso/95"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};

const imageBlock = ({
  value,
}: { value?: { asset?: unknown; alt?: string; caption?: string } }) => {
  if (!value?.asset) return null;
  const src = urlForImage(value as SanityImageSource)
    .width(1200)
    .auto("format")
    .url();
  if (!src) return null;
  return (
    <figure className="my-8 w-full max-w-3xl">
      <div className="overflow-hidden rounded-lg border border-sand/40">
        <Image
          src={src}
          alt={value.alt || ""}
          width={1200}
          height={800}
          className="h-auto w-full"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-walnut">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
};

const portableBlocksListsMarks: Pick<
  PortableTextComponents,
  "block" | "list" | "listItem" | "marks" | "unknownMark"
> = {
  block: {
    h1: ({ children, value }) => (
      <h1
        id={value?._key ? `h-${value._key}` : undefined}
        className="mt-10 scroll-mt-24 font-serif-jp text-2xl font-bold text-ink md:text-3xl"
      >
        {children}
      </h1>
    ),
    h2: ({ children, value }) => {
      const text = (
        (value as { children?: { text?: string }[] } | undefined)?.children ?? []
      )
        .map((c) => (typeof c?.text === "string" ? c.text : ""))
        .join("")
        .trim();
      const isReferenceHeading = /^(参考|出典|引用|注釈)/.test(text);
      const id = value?._key ? `h-${value._key}` : undefined;
      if (isReferenceHeading) {
        return (
          <h2
            id={id}
            className="mt-16 scroll-mt-24 border-b border-sand/60 pb-2 font-serif-jp text-base font-bold tracking-wide text-walnut md:text-lg"
          >
            {children}
          </h2>
        );
      }
      return (
        <h2
          id={id}
          className="mt-16 flex min-h-[3.25rem] scroll-mt-24 items-center rounded-sm bg-gold-soft px-5 py-2.5 font-serif-jp text-lg font-bold leading-tight text-white md:text-xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => (
      <h3
        id={value?._key ? `h-${value._key}` : undefined}
        className="relative mt-12 scroll-mt-24 pb-2 font-serif-jp text-lg font-bold text-ink"
      >
        {children}
        <span
          className="absolute bottom-0 left-0 block h-[2px] w-1/3 bg-gold-soft"
          aria-hidden
        />
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 border-l-[3px] border-gold-soft pl-3 font-sans text-base font-bold text-ink">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-care/40 pl-4 text-espresso/95 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-1.5 pl-6 text-espresso/95">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-1.5 pl-6 text-espresso/95">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-0.5">{children}</li>,
    number: ({ children }) => <li className="pl-0.5">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href as string}
        className="text-digital underline decoration-digital/30 underline-offset-2 hover:decoration-digital"
        rel="noopener noreferrer"
        target={value?.href?.toString().startsWith("/") ? undefined : "_blank"}
      >
        {children}
      </a>
    ),
    affiliateLink: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const disclosure = (value?.disclosure as string | undefined)?.trim() || "PR";
      if (!href) return <span>{children}</span>;
      return (
        <span className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 align-baseline">
          <a
            href={href}
            className="text-digital underline decoration-digital/30 underline-offset-2 hover:decoration-digital"
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
          <span className="whitespace-nowrap rounded bg-sand/80 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-espresso">
            {disclosure}
          </span>
        </span>
      );
    },
    "strike-through": ({ children }) => (
      <del className="line-through opacity-80">{children}</del>
    ),
  },
  unknownMark: ({ children }) => <span>{children}</span>,
};

/** 表セル内用（ネストしたブロック型を持たない） */
const cellPortableComponents = {
  ...portableBlocksListsMarks,
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="my-1 leading-snug text-espresso/95 first:mt-0 last:mb-0">
        {children}
      </p>
    ),
    ...portableBlocksListsMarks.block,
  },
  types: {},
} as PortableTextComponents;

/** リッチ表セル用（タイトル付きボックス等の cellPortableComponents とは別に、行の縦を詰める） */
const richTableCellPortableComponents = {
  ...portableBlocksListsMarks,
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="my-[0.175rem] text-espresso/95 first:mt-0 last:mb-0">
        {children}
      </p>
    ),
    ...portableBlocksListsMarks.block,
  },
  types: {},
} as PortableTextComponents;

const richTableBlockComponent = ({
  value,
}: {
  value?: RichTableBlockValue;
}) => {
  const rows = value?.rows ?? [];
  if (rows.length === 0) return null;

  const hasCol = value?.hasColumnTitles !== false;
  const hasRow = value?.hasRowTitles !== false;
  const headers = value?.columnHeaders ?? [];

  const colCount =
    Math.max(
      ...rows.map((r) => r.cells?.length ?? 0),
      hasCol ? Math.max(0, ...headers.map((h) => (h.cellIndex ?? -1) + 1)) : 0,
    ) || 1;

  const headerLabels: string[] = [];
  if (hasCol) {
    for (let i = 0; i < colCount; i++) {
      const h = headers.find((ch) => ch.cellIndex === i);
      headerLabels.push(h?.title ?? "");
    }
  }

  return (
    <figure className="my-[1.4rem] w-full overflow-x-auto">
      <table className="w-full min-w-[20rem] border-collapse border border-sand/60 text-sm leading-[1.05]">
        {hasCol && (
          <thead>
            <tr>
              {hasRow && (
                <th className="border border-sand/50 bg-gold-soft px-3 py-[0.35rem] text-left font-serif-jp font-bold text-white" />
              )}
              {headerLabels.map((label, i) => (
                <th
                  key={i}
                  className="border border-sand/50 bg-gold-soft px-3 py-[0.35rem] text-left font-serif-jp font-bold text-white"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row._key ?? ri}>
              {hasRow && (
                <th
                  scope="row"
                  className="border border-sand/60 bg-clinic-depth/40 px-3 py-[0.35rem] text-left font-semibold text-ink"
                >
                  {row.title ?? ""}
                </th>
              )}
              {(row.cells ?? []).map((cell, ci) => (
                <td
                  key={cell._key ?? ci}
                  className="align-top border border-sand/60 px-3 py-[0.35rem] text-espresso/95"
                >
                  <PortableText
                    value={(cell.content ?? []) as PortableTextBlock[]}
                    components={richTableCellPortableComponents}
                    onMissingComponent={(message, { nodeType }) => {
                      if (nodeType === "mark") return;
                      console.warn(message);
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};

type TitledBoxValue = {
  title?: string;
  body?: PortableTextBlock[];
};

function TitledBoxBlockView({ value }: { value?: TitledBoxValue }) {
  const labelId = useId();
  const title = value?.title?.trim();
  if (!title) return null;
  const body = value?.body ?? [];
  return (
    <section
      className="not-prose my-8"
      aria-labelledby={labelId}
    >
      <div className="relative mt-5 border border-[#8B7E74] p-5">
        <span
          id={labelId}
          className="absolute -top-[1.2em] left-0 bg-[#8B7E74] px-3 py-0.5 text-[0.9em] font-bold leading-tight text-white"
        >
          {title}
        </span>
        <div className="prose prose-sm max-w-none text-espresso/95 prose-p:my-2 prose-li:my-0 prose-ul:my-2 prose-ol:my-2">
          {body.length ? (
            <PortableText
              value={body}
              components={cellPortableComponents}
              onMissingComponent={(message, { nodeType }) => {
                if (nodeType === "mark") return;
                console.warn(message);
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

const titledBoxBlockComponent = ({ value }: { value?: TitledBoxValue }) => (
  <TitledBoxBlockView value={value} />
);

type CalloutValue = {
  tone?: "memo" | "tip" | "note" | "warn";
  title?: string;
  body?: PortableTextBlock[];
};

/** 枠上タイトル先頭のメモ風アイコン（currentColor） */
function CalloutLegendMemoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5H5Zm8 1.5L15.5 6H13a1 1 0 0 1-1-1V3.5ZM6 9h8v1.5H6V9Zm0 3h8v1.5H6V12Zm0 3h5v1.5H6V15Z"
      />
    </svg>
  );
}

const calloutBlockComponent = ({ value }: { value?: CalloutValue }) => {
  if (!value) return null;
  const tone = value.tone ?? "memo";
  const legendDefault: Record<string, string> = {
    memo: "メモ",
    tip: "ヒント",
    note: "ノート",
    warn: "注意",
  };
  /** フィールドセット風：メモ（青）／ヒント（橙）／注意（赤）／ノート（濃） */
  const palette: Record<
    string,
    { border: string; bg: string; legend: string }
  > = {
    memo: {
      border: "border-blue-800/50",
      bg: "bg-blue-50/90",
      legend: "text-blue-950",
    },
    tip: {
      border: "border-orange-600/55",
      bg: "bg-orange-50/90",
      legend: "text-orange-950",
    },
    note: {
      border: "border-stone-800",
      bg: "bg-stone-200/55",
      legend: "text-stone-900",
    },
    warn: {
      border: "border-red-700/55",
      bg: "bg-red-50/90",
      legend: "text-red-950",
    },
  };
  const c = palette[tone] ?? palette.memo;
  const legendText =
    value.title?.trim() || legendDefault[tone] || legendDefault.memo;

  return (
    <fieldset
      className={`not-prose my-8 min-w-0 border border-solid px-4 pb-5 ${c.border} ${c.bg}`}
    >
      <legend
        className={`float-none inline-flex items-center gap-1.5 px-2 font-sans text-[0.8125rem] font-semibold leading-normal tracking-normal ${c.legend} ${c.bg} ml-3`}
      >
        <CalloutLegendMemoIcon className="h-3.5 w-3.5 shrink-0 opacity-90" />
        {legendText}
      </legend>
      <div
        className="prose prose-sm mt-3 max-w-none font-sans text-espresso/95 prose-p:my-3 prose-li:my-0.5 prose-ul:my-3 prose-ol:my-3"
      >
        <PortableText
          value={(value.body ?? []) as PortableTextBlock[]}
          components={cellPortableComponents}
          onMissingComponent={(message, { nodeType }) => {
            if (nodeType === "mark") return;
            console.warn(message);
          }}
        />
      </div>
    </fieldset>
  );
};

type RecommendationCardValue = {
  title?: string;
  image?: { asset?: unknown; alt?: string } | null;
  imageUrl?: string;
  points?: string[];
  href?: string;
  ctaLabel?: string;
  disclosure?: string;
};

const recommendationCardComponent = ({ value }: { value?: RecommendationCardValue }) => {
  if (!value) return null;
  let imageSrc: string | null = null;
  if (value.image?.asset) {
    imageSrc = urlForImage(value.image as SanityImageSource)
      .width(800)
      .auto("format")
      .url() ?? null;
  } else if (value.imageUrl) {
    imageSrc = value.imageUrl;
  }
  const points = (value.points ?? []).filter((p) => p && p.trim().length > 0);
  return (
    <div className="my-10 overflow-hidden rounded-xl border border-sand/60 bg-white shadow-sm">
      {imageSrc ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={value.image?.alt || value.title || ""}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48rem, 100vw"
            unoptimized={shouldBypassImageOptimization(imageSrc)}
          />
        </div>
      ) : null}
      <div className="space-y-4 p-5 sm:p-6">
        <h3 className="font-serif-jp text-lg font-bold text-ink md:text-xl">
          {value.title}
        </h3>
        {points.length ? (
          <ul className="space-y-1.5 text-espresso/95">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-burgundy/70" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {value.href ? (
          <p className="pt-1">
            <a
              href={value.href}
              className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-blue-800"
              target="_blank"
              rel={value.disclosure ? "nofollow sponsored noopener noreferrer" : "noopener noreferrer"}
            >
              <span>{value.ctaLabel || "詳しく見る"}</span>
              <span aria-hidden>→</span>
              {value.disclosure ? (
                <span className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide">
                  {value.disclosure}
                </span>
              ) : null}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
};

type SummaryBoxValue = {
  title?: string;
  /** 未定義・`boxed`＝帯タイトル付き囲み。`checklist`＝軽量なチェックリスト */
  presentation?: "boxed" | "checklist";
  items?: { _key?: string; text?: string; checked?: boolean }[];
};

const summaryBoxComponent = ({ value }: { value?: SummaryBoxValue }) => {
  if (!value) return null;
  const items = value.items ?? [];
  if (items.length === 0) return null;
  const presentation = value.presentation ?? "boxed";

  const rows = (
    <ul className={presentation === "checklist" ? "not-prose m-0 space-y-2.5 p-0 list-none" : "space-y-2.5"}>
      {items.map((it, i) => {
        const checked = Boolean(it.checked);
        return (
          <li key={it._key ?? i} className="flex items-start gap-3">
            <span
              aria-hidden
              className={
                presentation === "checklist"
                  ? checked
                    ? "mt-[0.4em] inline-flex h-4 w-4 flex-none items-center justify-center rounded border-2 border-care bg-care text-[0.7rem] font-bold leading-none text-white shadow-sm"
                    : "mt-[0.4em] inline-flex h-4 w-4 flex-none items-center justify-center rounded border-2 border-sand bg-paper-elevate"
                  : checked
                    ? "mt-[0.35em] inline-flex h-3.5 w-3.5 flex-none items-center justify-center rounded-sm border border-stone-600 bg-stone-700 text-[0.65rem] font-bold text-white"
                    : "mt-[0.35em] inline-flex h-3.5 w-3.5 flex-none items-center justify-center rounded-sm border-2 border-stone-400 bg-white"
              }
            >
              {checked ? "✓" : ""}
            </span>
            <span
              className={
                presentation === "checklist"
                  ? checked
                    ? "text-espresso/80"
                    : "font-sans text-[0.98rem] font-medium text-ink"
                  : "text-espresso/95"
              }
            >
              {it.text}
            </span>
          </li>
        );
      })}
    </ul>
  );

  if (presentation === "checklist") {
    return (
      <section
        className="not-prose my-8 rounded-xl border border-sand/70 bg-paper-elevate/70 px-5 py-5 shadow-[0_1px_0_rgba(26,22,20,0.04)] ring-1 ring-stone-100 sm:px-6 sm:py-6"
        aria-label={value.title || "チェックリスト"}
      >
        {value.title ? (
          <h3 className="mb-4 border-b border-sand/60 pb-2 font-serif-jp text-base font-bold text-ink sm:text-[1.05rem]">
            {value.title}
          </h3>
        ) : null}
        {rows}
      </section>
    );
  }

  return (
    <section className="my-10 rounded-md border border-stone-300 bg-white px-6 py-6 sm:px-7">
      {value.title ? (
        <div className="mb-5">
          <span className="inline-block bg-stone-700 px-3 py-1.5 font-sans text-[0.78rem] font-bold tracking-wide text-white">
            {value.title}
          </span>
        </div>
      ) : null}
      {rows}
    </section>
  );
};

type QaItemValue = {
  _key?: string;
  question?: string;
  answerSummary?: string;
  answerDetail?: PortableTextBlock[];
};

type QaBlockValue = {
  items?: QaItemValue[];
  /** 旧スキーマ（items 導入前）— 公開済み本文の表示用 */
  question?: string;
  answerSummary?: string;
  answerDetail?: PortableTextBlock[];
};

function normalizeQaItems(value: QaBlockValue): QaItemValue[] {
  const fromItems =
    value.items?.filter((it) => (it.question ?? "").trim().length > 0) ?? [];
  if (fromItems.length > 0) return fromItems;
  const q = (value.question ?? "").trim();
  if (!q) return [];
  return [
    {
      question: value.question,
      answerSummary: value.answerSummary,
      answerDetail: value.answerDetail,
    },
  ];
}

const qaBlockComponent = ({ value }: { value?: QaBlockValue }) => {
  if (!value) return null;
  const pairs = normalizeQaItems(value).filter((item) => {
    const question = (item.question ?? "").trim();
    if (!question) return false;
    const summary = (item.answerSummary ?? "").trim();
    const detail = item.answerDetail ?? [];
    return summary.length > 0 || detail.length > 0;
  });
  if (pairs.length === 0) return null;

  return (
    <div
      className="not-prose my-8 flex flex-col gap-4"
      role="list"
      aria-label="質問と回答"
    >
      {pairs.map((item, index) => {
        const question = (item.question ?? "").trim();
        const summary = (item.answerSummary ?? "").trim();
        const detail = item.answerDetail ?? [];
        return (
          <article
            key={item._key ?? index}
            role="listitem"
            className="rounded-xl border border-stone-200/80 bg-paper-elevate px-4 py-4 shadow-[0_1px_0_rgba(26,22,20,0.04)] ring-1 ring-stone-100 sm:px-5 sm:py-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ember text-[0.8125rem] font-bold leading-none text-white shadow-sm"
                aria-hidden
              >
                Q
              </span>
              <p className="min-w-0 flex-1 font-sans text-base font-bold leading-snug text-ink sm:text-[1.05rem]">
                {question}
              </p>
            </div>

            <div
              className="my-4 border-t border-dashed border-sand/70"
              aria-hidden
            />

            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-care text-[0.8125rem] font-bold leading-none text-white shadow-sm"
                aria-hidden
              >
                A
              </span>
              <div className="min-w-0 flex-1 font-sans">
                {summary ? (
                  <p className="m-0 text-base font-bold leading-snug text-ink sm:text-[1.05rem]">
                    {summary}
                  </p>
                ) : null}
                {detail.length > 0 ? (
                  <div
                    className={`prose prose-sm max-w-none text-espresso/95 prose-p:my-2 prose-p:leading-relaxed prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 ${summary ? "mt-3" : ""}`}
                  >
                    <PortableText
                      value={detail}
                      components={cellPortableComponents}
                      onMissingComponent={(message, { nodeType }) => {
                        if (nodeType === "mark") return;
                        console.warn(message);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

type SpeechBalloonValue = {
  speaker?: string;
  text?: string;
  side?: "left" | "right";
  tone?: "sky" | "stone" | "sand";
  avatar?: { asset?: unknown; alt?: string } | null;
  avatarUrl?: string;
};

const speechBalloonComponent = ({
  value,
}: {
  value?: SpeechBalloonValue;
}) => {
  if (!value) return null;
  const text = (value.text ?? "").trim();
  if (!text && !value.speaker) return null;

  const tone = value.tone ?? "sky";

  /** 話し手名が一致する場合はサイト既定アイコンを優先（本文の吹き出し体裁を統一） */
  const speakerAvatarMap: Record<string, string> = {
    /** トップのプロフィール写真と同一 */
    ヤノヒデ: "/avatars/profile-avatar.png",
    yanohide: "/avatars/profile-avatar.png",
    矢野英人: "/avatars/profile-avatar.png",
    編集部: "/avatars/henshubu.svg",
  };
  const mappedBySpeaker =
    value.speaker && speakerAvatarMap[value.speaker]
      ? speakerAvatarMap[value.speaker]
      : null;

  let avatarSrc: string | null = null;
  if (mappedBySpeaker) {
    avatarSrc = mappedBySpeaker;
  } else if (value.avatar?.asset) {
    avatarSrc =
      urlForImage(value.avatar as SanityImageSource)
        .width(160)
        .auto("format")
        .url() ?? null;
  } else if (value.avatarUrl) {
    avatarSrc = value.avatarUrl;
  } else {
    avatarSrc = "/avatars/default-author.svg";
  }

  const palette: Record<
    string,
    { bg: string; ring: string }
  > = {
    sky: { bg: "bg-sky-50", ring: "ring-sky-100" },
    stone: { bg: "bg-stone-100", ring: "ring-stone-200" },
    sand: { bg: "bg-amber-50", ring: "ring-amber-100" },
  };
  const c = palette[tone] ?? palette.sky;

  const tailBase =
    "absolute bottom-6 h-3 w-3 rotate-45 transform";
  /** ティップは常に右側（アイコンは行の右端） */
  const tailSide = "right-[-6px]";

  return (
    <div className="not-prose my-8 flex w-full flex-row flex-nowrap items-start justify-end gap-px">
      <div
        className={`relative min-w-0 w-fit max-w-[80%] rounded-2xl pl-5 pr-4 py-4 leading-snug text-espresso/95 shadow-sm ring-1 ${c.bg} ${c.ring}`}
      >
        <p className="m-0 whitespace-pre-wrap text-[0.95rem]">{text}</p>
        <span aria-hidden className={`${tailBase} ${tailSide} ${c.bg}`} />
      </div>
      <div className="flex w-[72px] shrink-0 flex-col items-center [&_img]:!my-0">
        <div className="relative box-border aspect-square w-16 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-white">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={value.avatar?.alt || value.speaker || ""}
              width={128}
              height={128}
              className="block h-full w-full rounded-full object-cover object-center"
              unoptimized={shouldBypassImageOptimization(avatarSrc)}
            />
          ) : null}
        </div>
        {value.speaker ? (
          <div className="mt-1 text-[0.7rem] tracking-wide text-walnut">
            {value.speaker}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const postPortableComponents: PortableTextComponents = {
  ...portableBlocksListsMarks,
  types: {
    image: imageBlock,
    ptCodeBlock: codeBlock,
    ptDivider: dividerBlock,
    ptTable: tableBlock,
    richTableBlock: richTableBlockComponent,
    calloutBlock: calloutBlockComponent,
    qaBlock: qaBlockComponent,
    titledBoxBlock: titledBoxBlockComponent,
    recommendationCard: recommendationCardComponent,
    summaryBox: summaryBoxComponent,
    speechBalloon: speechBalloonComponent,
  },
  unknownType: ({ value }) => (
    <p className="my-4 rounded border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-sm text-ink">
      旧形式のブロック（<code className="font-mono">{(value as { _type?: string })?._type}</code>）です。表示から外しました。必要なら Studio で本文を入れ直してください。
    </p>
  ),
};

export function PostBody({ value }: { value: TypedObject | TypedObject[] | null }) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }
  return (
    <PortableText
      value={value as unknown as import("@portabletext/types").PortableTextBlock[]}
      components={postPortableComponents}
      onMissingComponent={(message, { nodeType }) => {
        if (nodeType === "mark") return;
        console.warn(message);
      }}
    />
  );
}
