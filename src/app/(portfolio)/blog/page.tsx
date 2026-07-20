import type { Metadata } from "next";
import Link from "next/link";

import { PostGrid, type PostCard } from "@/components/PostGrid";
import { PostSearch, type SearchPost } from "@/components/PostSearch";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY, SEARCH_POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "ブログ一覧",
  description: "執筆記事・サンプル一覧",
};

export default async function BlogPage() {
  const [posts, searchPosts] = await Promise.all([
    sanityFetch<PostCard[]>({
      query: POSTS_QUERY,
      revalidate: 60,
      fallback: [],
    }),
    sanityFetch<SearchPost[]>({
      query: SEARCH_POSTS_QUERY,
      revalidate: 60,
      fallback: [],
    }),
  ]);

  return (
    <div className="animate-reveal mx-auto max-w-[75rem] px-4 py-10 md:px-8">
      <header className="mb-12 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-digital/80">
          Journal
        </p>
        <h1 className="mt-3 font-serif-jp text-2xl font-bold tracking-wide text-ink md:text-3xl">
          ブログ・記事一覧
        </h1>
        <span
          aria-hidden
          className="mx-auto mt-4 block h-[3px] w-14 rounded-full bg-gradient-to-r from-gold-bright to-ember"
        />
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-espresso/85">
          公開中の記事です。カードを開くと本文をお読みいただけます。
        </p>
        <p className="mt-5">
          <Link
            href="/"
            className="back-link inline-flex font-sans text-sm font-medium"
          >
            <span className="arrow" aria-hidden>
              ←
            </span>
            <span>ポートフォリオトップへ</span>
          </Link>
        </p>
      </header>
      <PostSearch posts={searchPosts} />
      <PostGrid posts={posts} variant="editorial" />
    </div>
  );
}
