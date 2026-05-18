import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { urlForImage } from "@/sanity/lib/imageUrl";

const DEFAULT_EYECATCH = "/eyecatch/cover-01.svg";

export type PostCard = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  excerpt?: string | null;
  eyecatch: string | null;
  heroImage?: {
    asset?: { _ref?: string };
    alt?: string;
  } | null;
  categories?: { _id: string; title: string; slug?: { current?: string } }[] | null;
  tags?: { _id: string; title: string; slug?: { current?: string } }[] | null;
};

function cardImage(post: PostCard): { src: string; alt: string } {
  if (post.heroImage?.asset?._ref) {
    return {
      src: urlForImage(post.heroImage as SanityImageSource).width(900).height(506).auto("format").url(),
      alt: post.heroImage.alt?.trim() || "",
    };
  }
  const src = post.eyecatch && post.eyecatch.length > 0 ? post.eyecatch : DEFAULT_EYECATCH;
  return { src, alt: "" };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Variant = "editorial" | "portfolio";

export function PostGrid({
  posts,
  variant = "editorial",
}: {
  posts: PostCard[];
  variant?: Variant;
}) {
  if (posts.length === 0) {
    return (
      <div
        className="rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-12 text-center text-slate-600"
        role="status"
      >
        <p className="font-bold text-slate-800">まだ記事がありません</p>
        <p className="mt-2 text-sm">
          Sanity Studio（<code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-xs">/studio</code>
          ）で公開してください。
        </p>
      </div>
    );
  }

  if (variant === "portfolio") {
    return (
      <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const href = `/posts/${post.slug.current}`;
          const { src, alt } = cardImage(post);
          const svgOrRemote = src.endsWith(".svg") || src.startsWith("http");
          return (
            <li key={post._id}>
              <Link
                href={href}
                className="group block h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    unoptimized={svgOrRemote && !src.includes("cdn.sanity.io")}
                  />
                </div>
                <div className="p-4">
                  {post.publishedAt && (
                    <time className="text-xs text-slate-500" dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  )}
                  <h3 className="mt-1 font-bold leading-snug text-slate-900 group-hover:text-blue-800">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-7 p-0 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
      {posts.map((post, index) => {
        const href = `/posts/${post.slug.current}`;
        const { src, alt } = cardImage(post);
        const svgOrRemote = src.endsWith(".svg") || src.startsWith("http");
        const delay = Math.min(0.06 + index * 0.05, 0.45);
        return (
          <li
            key={post._id}
            style={{ animationDelay: `${delay}s` }}
            className="animate-reveal [animation-fill-mode:both]"
          >
            <Link href={href} className="post-card group block h-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-care">
              <div className="post-card__media">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center transition duration-[600ms] ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  unoptimized={svgOrRemote && !src.includes("cdn.sanity.io")}
                />
              </div>
              <div className="relative z-[1] flex flex-col gap-2 px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
                {post.categories?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {post.categories.slice(0, 2).map((category) => (
                      <span
                        key={category._id}
                        className="rounded-full bg-care/10 px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-care"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                ) : null}
                {post.publishedAt ? (
                  <time
                    className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-digital/85"
                    dateTime={post.publishedAt}
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                ) : (
                  <span className="font-mono text-[0.65rem] text-walnut">日付未設定</span>
                )}
                <h2 className="font-serif-jp text-[1.05rem] font-bold leading-snug tracking-wide text-ink transition duration-300 group-hover:text-burgundy-deep md:text-lg">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="line-clamp-2 text-sm leading-relaxed text-espresso/80">{post.excerpt}</p>
                )}
                <span className="mt-1 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-care">
                  <span className="h-px w-6 bg-gradient-to-r from-care/60 to-transparent" aria-hidden />
                  Read
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
