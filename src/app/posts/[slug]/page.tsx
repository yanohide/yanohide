import type { TypedObject } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/PostBody";
import { TableOfContents, extractToc } from "@/components/TableOfContents";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/imageUrl";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";

const DEFAULT_EYECATCH = "/eyecatch/cover-01.svg";

const SITE_URL =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "http://localhost:3000";

type Post = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  excerpt?: string | null;
  body: TypedObject[] | null;
  eyecatch: string | null;
  heroImage?: {
    asset?: { _ref?: string };
    alt?: string;
  } | null;
  categories?: { _id: string; title: string; slug?: { current?: string } }[] | null;
  tags?: { _id: string; title: string; slug?: { current?: string } }[] | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    image?: { asset?: { _ref?: string }; alt?: string } | null;
    noIndex?: boolean | null;
  } | null;
};

function isRefAsset(img: { asset?: { _ref?: string } } | null | undefined): boolean {
  return Boolean(img?.asset?._ref);
}

async function getPost(slug: string) {
  return sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
    revalidate: 60,
    fallback: null,
  });
}

function absoluteUrl(path: string) {
  return new URL(path.startsWith("/") ? path : `/${path}`, `${SITE_URL}/`).toString();
}

function imageUrl(source: SanityImageSource, width: number, height?: number) {
  const builder = urlForImage(source).width(width).auto("format");
  return (height ? builder.height(height) : builder).url();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: `記事が見つかりません`,
    };
  }

  const title = post.seo?.title?.trim() || post.title;
  const description =
    post.seo?.description?.trim() ||
    post.excerpt?.trim() ||
    "医療・介護・ライティング関連の記事です。";

  let ogImage: string = absoluteUrl(DEFAULT_EYECATCH);
  try {
    if (post.seo?.image && isRefAsset(post.seo.image)) {
      ogImage = imageUrl(post.seo.image as SanityImageSource, 1200, 630);
    } else if (post.heroImage && isRefAsset(post.heroImage)) {
      ogImage = imageUrl(post.heroImage as SanityImageSource, 1200, 630);
    }
  } catch {
    ogImage = absoluteUrl(DEFAULT_EYECATCH);
  }

  const url = absoluteUrl(`/posts/${post.slug.current}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url,
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string | null }>>({
    query: POST_SLUGS_QUERY,
    revalidate: 60,
    fallback: [],
  });
  return slugs
    .filter((row): row is { slug: string } => typeof row.slug === "string" && row.slug.length > 0)
    .map((row) => ({ slug: row.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  function getVolNo(dateString: string) {
    const d = new Date(dateString);
    return { vol: d.getFullYear() - 2025, no: d.getMonth() + 1 };
  }

  const volNo =
    post.publishedAt && !Number.isNaN(new Date(post.publishedAt).getTime())
      ? getVolNo(post.publishedAt)
      : null;

  let heroSrc: string;
  let heroAlt: string;
  try {
    if (post.heroImage && isRefAsset(post.heroImage)) {
      heroSrc = imageUrl(post.heroImage as SanityImageSource, 1600, 900);
      heroAlt = post.heroImage.alt?.trim() || "";
    } else if (post.eyecatch && post.eyecatch.length > 0) {
      heroSrc = post.eyecatch;
      heroAlt = "";
    } else {
      heroSrc = DEFAULT_EYECATCH;
      heroAlt = "";
    }
  } catch {
    heroSrc =
      post.eyecatch && post.eyecatch.length > 0 ? post.eyecatch : DEFAULT_EYECATCH;
    heroAlt = "";
  }

  const structuredImage = heroSrc.startsWith("http") ? heroSrc : absoluteUrl(heroSrc);

  return (
    <article id="top" className="article-canvas animate-reveal font-sans">
      <div className="mb-10 md:mb-12">
        <Link href="/blog" className="back-link font-sans">
          <span className="arrow" aria-hidden>
            ←
          </span>
          <span>記事一覧へ戻る</span>
        </Link>
      </div>

      <header className="article-hero relative mb-6 md:mb-8">
        <h1 className="font-serif-jp text-[clamp(1.45rem,3.2vw,2.1rem)] font-bold leading-[1.35] tracking-[0.02em] text-ink">
          {post.title}
        </h1>
      </header>

      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-sand/50 pb-3 font-sans">
        {post.publishedAt ? (
          <time
            className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-digital/90"
            dateTime={post.publishedAt}
          >
            {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
        {post.categories?.map((category) => (
          <span
            key={category._id}
            className="rounded-full bg-care/10 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-care"
          >
            {category.title}
          </span>
        ))}
        {volNo ? (
          <span className="issue-badge rounded-none border-0 bg-transparent p-0 font-mono normal-case tracking-[0.18em] text-walnut/90">
            vol.{volNo.vol} · no.{volNo.no}
          </span>
        ) : null}
      </div>

      <div className="article-media-frame relative -mx-0 mb-12 overflow-hidden sm:mb-16">
        <div className="relative aspect-[2/1] max-h-[24rem] min-h-[12rem] w-full sm:aspect-[21/9]">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1024px) 48rem, 100vw"
            unoptimized={
              heroSrc.endsWith(".svg") ||
              (heroSrc.startsWith("http") && !heroSrc.includes("cdn.sanity.io"))
            }
          />
        </div>
      </div>

      {(() => {
        const body = Array.isArray(post.body) ? post.body : [];
        const { items, firstHeadingIndex } = extractToc(body);
        const lead = firstHeadingIndex > 0 ? body.slice(0, firstHeadingIndex) : body;
        const main = firstHeadingIndex > 0 ? body.slice(firstHeadingIndex) : [];
        return (
          <div
            className="prose prose-base prose-stone mx-auto max-w-none prose-p:text-ink/95"
            style={{ letterSpacing: "0.04em" }}
          >
            <PostBody value={lead} />
            {items.length > 0 ? <TableOfContents items={items} /> : null}
            {main.length > 0 ? <PostBody value={main} /> : null}
          </div>
        );
      })()}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.seo?.description || post.excerpt || undefined,
            datePublished: post.publishedAt || undefined,
            dateModified: post._updatedAt || post.publishedAt || undefined,
            image: structuredImage,
            url: absoluteUrl(`/posts/${post.slug.current}`),
            author: {
              "@type": "Person",
              name: "矢野英人",
            },
            publisher: {
              "@type": "Organization",
              name: "矢野英人 | 医療介護のAIクリエイター",
            },
            keywords: post.tags?.map((tag) => tag.title).join(", ") || undefined,
          }),
        }}
      />

      <div className="end-mark mt-20 flex flex-col items-center gap-3">
        <span className="h-px w-20 bg-gradient-to-r from-transparent via-sand to-transparent" />
        <span className="font-mono text-lg text-digital/40" aria-hidden>
          {"//"}
        </span>
        <span className="h-px w-20 bg-gradient-to-l from-transparent via-sand to-transparent" />
      </div>

      <footer className="mt-16 border-t border-sand/45 pt-10 font-sans">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/blog" className="back-link">
            <span className="arrow" aria-hidden>
              ←
            </span>
            記事一覧へ戻る
          </Link>
          <a
            href="#top"
            className="text-center font-mono text-xs tracking-[0.14em] text-walnut transition-colors duration-300 hover:text-digital"
          >
            ページ先頭へ ↑
          </a>
        </div>
      </footer>
    </article>
  );
}
