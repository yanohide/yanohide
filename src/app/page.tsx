import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
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

export default async function HomePage() {
  const posts = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    revalidate: 60,
    fallback: [],
  });

  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center text-walnut">
        <p className="text-sm uppercase tracking-[0.24em]">No issues yet</p>
        <h1 className="mt-4 font-serif text-2xl leading-snug text-ink">
          記事がありません。<span className="text-burgundy">Sanity Studio</span> で最初の稿子を公開してください。
        </h1>
        <Link
          href="/studio"
          className="mt-8 hover-underline-grow text-lg font-semibold uppercase tracking-[0.2em] text-burgundy"
        >
          Open Studio →
        </Link>
      </main>
    );
  }

  const fv = featured.publishedAt ?? new Date().toISOString();

  return (
    <main className="animate-reveal">
      {/* Featured */}
      <article className="featured-panel animate-reveal-delay-1 hover-lift relative -mx-6 mb-20 overflow-hidden px-10 py-14 text-ivory sm:-mx-6 sm:rounded-sm">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-ivory/15 pb-6 text-[10px] font-semibold uppercase tracking-[0.42em] text-ivory/70">
            <span className="issue-badge rounded-full bg-ivory/10 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/90 backdrop-blur">
              Featured Essay
            </span>
            <span className="text-ivory/90">{formatDate(fv)}</span>
            <span className="rounded-full px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/90 ring-1 ring-ivory/25 backdrop-blur">
              VOL.{String(getVolNo(fv).vol).padStart(2, "0")} NO.{String(getVolNo(fv).no).padStart(2, "0")}
            </span>
          </div>

          <Link href={`/posts/${featured.slug?.current ?? ""}`} className="block group/link">
            <h2 className="mb-6 max-w-xl text-[clamp(1.875rem,4.5vw,2.875rem)] font-black leading-snug tracking-tight text-[#FCFCF9] lg:max-w-2xl">
              {featured.title}
            </h2>
          </Link>

          <Link
            href={`/posts/${featured.slug?.current ?? ""}`}
            className="hover-underline-grow inline-flex max-w-fit items-center text-sm font-semibold uppercase tracking-[0.28em]"
          >
            Read Article ⟶
          </Link>
        </div>
      </article>

      {/* List */}
      <section className="mx-auto mb-28 max-w-3xl animate-reveal-delay-2 pb-px">
        <div className="mb-14 flex flex-col gap-6 border-y border-double border-transparent py-2 text-center md:flex-row md:items-end md:text-left">
          <h2 className="text-xl font-semibold lowercase italic tracking-[0.12em] text-espresso [font-family:var(--font-display)]">
            recent issues &amp;&nbsp;archives.
          </h2>
          <div className="hidden max-w-xl flex-1 border-b border-sand pb-px md:block" />
          <Link
            href="/studio"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.3em] text-burgundy transition-colors hover:text-ink hover:underline underline-offset-[6px]"
          >
            New Post in Studio (+)
          </Link>
        </div>

        <ul className="flex flex-col">
          {rest.map((p, idx) => {
            const dv = p.publishedAt ?? new Date().toISOString();

            const numLabel = idx + 2;

            const label = `${String(numLabel).padStart(2, "0")}.`;

            return (
              <li key={p._id} className="group/item border-b border-sand/85">
                <Link
                  href={`/posts/${p.slug?.current ?? ""}`}
                  className="hover-bg-slide flex flex-row items-start gap-6 px-7 py-[1.625rem]"
                >
                  <span className="mt-[2px] font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gold">{label}</span>
                  <span className="flex min-w-[120px] flex-col pt-px text-[11px] font-medium uppercase tracking-[0.08em] text-walnut sm:text-xs">
                    <span>{formatDate(dv)}</span>
                    <span className="normal-case opacity-95">
                      Vol.{getVolNo(dv).vol} No.{getVolNo(dv).no}
                    </span>
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                    <span className="block text-xl font-semibold tracking-tighter text-espresso">{p.title}</span>
                    <span className="opacity-60 transition-opacity duration-220 group-hover/item:opacity-100">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-burgundy">Read Essay →</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
          {rest.length === 0 && (
            <li className="px-8 py-10 text-center font-serif leading-relaxed text-walnut">
              残りのアーカイブは準備中です。この号だけをゆっくりお楽しみください。
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
