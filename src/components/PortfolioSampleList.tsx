import Image from "next/image";

import { SAMPLE_ARTICLES } from "@/lib/portfolio-content";

export function PortfolioSampleList() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-bold tracking-wide text-blue-900">執筆実績｜100記事以上納品</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-amber-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-2xl">
              ★
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          クラウドソーシング・直接取引を含め、医療・介護・金融分野で継続的にご依頼をいただいています。
        </p>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-slate-600">
        以下、オウンドメディアで公開したサンプル記事です（キーワード選定・構成・執筆・画像・WordPress入稿まで担当）。
      </p>

      <ul className="divide-y divide-slate-200 border-y border-slate-200">
        {SAMPLE_ARTICLES.map((article) => (
          <li key={article.id}>
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 py-6 transition hover:bg-slate-50/80 md:gap-6"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-slate-100 shadow-sm ring-1 ring-slate-200/80 md:h-24 md:w-36">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="144px"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-medium text-sky-700">{article.label}</p>
                <p className="mt-0.5 text-[0.7rem] text-slate-500">{article.site}</p>
                <h3 className="mt-1.5 text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-800 md:text-base">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                  {article.excerpt}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
