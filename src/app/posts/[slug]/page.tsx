import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";

type PostDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  body?: PortableTextBlock[];
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getVolNo(dateString: string) {
  const d = new Date(dateString);
  return { vol: d.getFullYear() - 2025, no: d.getMonth() + 1 };
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    link({ children, value }) {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = !href.startsWith("/");
      return (
        <a
          href={href}
          className="font-semibold text-burgundy underline underline-offset-[5px] transition-colors hover:text-espresso"
          rel={external ? "noopener noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2({ children }) {
      return (
        <h2 className="mb-8 mt-10 font-serif text-4xl leading-tight tracking-tighter text-espresso first:mt-12 [font-family:var(--font-serif-jp)]">
          {children}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3 className="mb-6 mt-8 font-serif text-3xl tracking-tighter text-espresso [font-family:var(--font-serif-jp)]">
          {children}
        </h3>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="my-14 border-y border-double border-sand px-14 py-[1rem] italic leading-relaxed text-walnut [font-family:var(--font-serif-jp)]">
          {children}
        </blockquote>
      );
    },
    normal({ children }) {
      return <p className="mb-[1rem]">{children}</p>;
    },
  },
};

export async function generateStaticParams() {
  const rows = await sanityFetch<Array<{ slug: string | null }>>({
    query: POST_SLUGS_QUERY,
    revalidate: 60,
    fallback: [],
  });

  return rows
    .filter((row): row is { slug: string } => typeof row.slug === "string" && row.slug.length > 0)
    .map((row) => ({ slug: row.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await sanityFetch<Pick<PostDetail, "title" | "publishedAt"> | null>({
    query: `*[_type == "post" && slug.current == $slug][0]{title, publishedAt}`,
    params: { slug },
    revalidate: 60,
    fallback: null,
  });

  if (!post?.title) {
    return { title: "Not found" };
  }

  const description = `${post.title} — The Literary Review`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      locale: "ja_JP",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await sanityFetch<PostDetail | null>({
    query: POST_QUERY,
    params: { slug },
    revalidate: 60,
    fallback: null,
  });

  if (!post) {
    notFound();
  }

  const dateRef = post.publishedAt ?? new Date().toISOString();
  const volNo = getVolNo(dateRef);

  return (
    <article className="mx-auto max-w-[49rem] px-2 pb-[4.6875rem] md:max-w-none md:px-3">
      <Link href="/" className="back-link mb-14 text-[10px] font-semibold uppercase tracking-[0.28em] text-burgundy">
        <span aria-hidden className="-mt-px text-base font-light">
          ←
        </span>
        <span>ALL ARTICLES</span>
      </Link>

      <div className="mb-[1rem] mt-[-0.0625rem] flex flex-row flex-wrap items-center gap-[0.9375rem] text-[13px] text-walnut">
        <time dateTime={new Date(dateRef).toISOString()} className="font-medium lowercase">
          {formatDate(dateRef)}
        </time>
        <span className="issue-badge whitespace-nowrap rounded-none bg-transparent py-px text-[13px] font-semibold lowercase tracking-normal text-gold uppercase">
          Vol.{volNo.vol} No.{volNo.no}
        </span>
      </div>

      <header className="mb-12 md:mb-16">
        <h1 className="mt-[-0.5rem] mb-8 max-w-4xl text-[clamp(1.975rem,4.93vw,3rem)] leading-[1.12] tracking-tighter text-balance font-black md:text-[2.975rem] [font-family:var(--font-serif-jp)]">
          {post.title}
        </h1>

        <div className="mb-14 flex items-center justify-center gap-6 px-6 text-xl text-sand md:gap-10">
          <span className="h-px flex-1 max-w-[8rem] bg-sand" aria-hidden />
          <span aria-hidden>◆</span>
          <span className="h-px flex-1 max-w-[8rem] bg-sand" aria-hidden />
        </div>
      </header>

      <div className="article-prose prose-lg prose-stone mx-auto mb-24 max-w-2xl">
        {post.body?.length ? (
          <PortableText components={portableTextComponents} value={post.body} />
        ) : (
          <p className="rounded-sm border border-sand px-11 py-[2.9375rem] text-center italic text-walnut">本文がありません。</p>
        )}
      </div>

      <footer className="mx-auto mb-28 max-w-xl text-center [&>svg]:opacity-92">
        <div className="mb-[-0.5rem] pb-px text-[2rem] [font-family:var(--font-display)] md:text-[2.25rem]" aria-hidden>
          ■
        </div>
        <hr className="divider-double mx-auto mb-12 mt-[-0.9375rem] max-w-xl" />

        <div className="mb-[-0.5rem] mt-[-0.5rem] flex flex-wrap items-center justify-center gap-10 md:gap-14">
          <Link href="/" className="back-link text-[10px] font-semibold uppercase tracking-[0.28em] text-burgundy">
            <span aria-hidden className="text-base leading-none">
              ←
            </span>
            <span>ALL ARTICLES</span>
          </Link>
          <a href="#top" className="back-link whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.28em] text-burgundy">
            <span>BACK TO TOP</span>
            <span aria-hidden className="-mt-[1px] text-base align-middle">
              ↑
            </span>
          </a>
        </div>
      </footer>
    </article>
  );
}
