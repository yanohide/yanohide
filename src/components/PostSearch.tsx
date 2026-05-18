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
    <section className="mb-12 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm md:p-6">
      <label htmlFor="post-search" className="text-sm font-bold text-slate-900">
        記事検索
      </label>
      <p className="mt-1 text-sm text-slate-600">
        タイトル・本文・カテゴリー・タグからリアルタイムに検索できます。
      </p>
      <input
        id="post-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="例：介護、リハビリ、AI"
        className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
      />

      {query ? (
        <div className="mt-5" aria-live="polite">
          <p className="text-sm font-medium text-slate-700">{results.length}件見つかりました</p>
          {results.length ? (
            <ul className="mt-3 space-y-3">
              {results.map((post) => (
                <li key={post._id} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="font-bold leading-snug text-blue-900 underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                  {post.publishedAt && (
                    <time className="mt-1 block text-xs text-slate-500" dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  )}
                  {post.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-600">
              該当する記事はありません。
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
