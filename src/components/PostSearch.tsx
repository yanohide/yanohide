"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  excerpt?: string | null;
  searchText?: string | null;
  categories?: { _id: string; title: string }[] | null;
  tags?: { _id: string; title: string }[] | null;
};

function normalize(value: string) {
  return value.toLocaleLowerCase("ja-JP").trim();
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostSearch({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return posts.filter((post) => {
      const haystack = normalize(
        [
          post.title,
          post.excerpt,
          post.searchText,
          ...(post.categories ?? []).map((category) => category.title),
          ...(post.tags ?? []).map((tag) => tag.title),
        ]
          .filter(Boolean)
          .join(" "),
      );
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, posts]);

  return (
    <section className="mx-auto mb-14 max-w-2xl rounded-2xl border border-sand/70 bg-paper-elevate/90 p-5 shadow-[0_14px_34px_-26px_rgba(26,22,20,0.45)] md:p-6">
      <div className="flex items-baseline gap-3">
        <label htmlFor="post-search" className="font-serif-jp text-sm font-bold tracking-wide text-ink">
          記事検索
        </label>
        <p className="text-xs leading-relaxed text-walnut">
          タイトル・本文・カテゴリー・タグから検索
        </p>
      </div>
      <div className="relative mt-4">
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-walnut/70"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          id="post-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例：介護、リハビリ、AI"
          className="w-full rounded-xl border border-sand bg-white py-3 pl-11 pr-4 text-base text-ink outline-none transition focus:border-care focus:ring-4 focus:ring-care/15"
        />
      </div>

      {query ? (
        <div className="mt-5" aria-live="polite">
          <p className="text-sm font-medium text-espresso">{results.length}件見つかりました</p>
          {results.length ? (
            <ul className="mt-3 space-y-3">
              {results.map((post) => (
                <li key={post._id} className="rounded-xl border border-sand/50 bg-ivory/60 p-4">
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="font-serif-jp font-bold leading-snug text-ink underline-offset-4 transition-colors hover:text-burgundy hover:underline"
                  >
                    {post.title}
                  </Link>
                  {post.publishedAt && (
                    <time className="mt-1 block font-mono text-xs text-digital/80" dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  )}
                  {post.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-espresso/85">{post.excerpt}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-xl bg-ivory/70 px-4 py-5 text-center text-sm text-espresso/80">
              該当する記事はありません。
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
