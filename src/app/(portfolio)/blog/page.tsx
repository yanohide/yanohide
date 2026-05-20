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
      <header className="mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-800/80">Journal</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">ブログ・記事一覧</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
          公開中の記事です。カードを開くと本文をお読みいただけます。
        </p>
        <p className="mt-4">
          <Link href="/" className="text-sm font-medium text-blue-800 underline-offset-4 hover:underline">
            ← ポートフォリオトップへ
          </Link>
        </p>
      </header>
      <PostSearch posts={searchPosts} />
      <PostGrid posts={posts} variant="editorial" />
    </div>
  );
}
