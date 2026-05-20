import Image from "next/image";

import { PortfolioOrderFlow } from "@/components/PortfolioOrderFlow";
import { SAMPLE_ARTICLES } from "@/lib/portfolio-content";

type SampleArticle = (typeof SAMPLE_ARTICLES)[number];

function SampleArticleLink({ article }: { article: SampleArticle }) {
  return (
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
  );
}

export function PortfolioSampleList() {
  const sample5 = SAMPLE_ARTICLES.find((article) => article.id === "sample-5");
  const listedArticles = SAMPLE_ARTICLES.filter((article) => article.id !== "sample-5");

  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div className="inline-flex w-full max-w-full flex-col ml-5 md:ml-8">
        <div className="mb-10 w-full">
        <h3 className="mb-6 text-left text-base font-bold text-blue-900 md:mb-8 md:text-xl">
          <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
            執筆実績｜100本以上納品
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">
          クラウドソーシングでの案件に加え、一部上場企業が運営するオウンドメディアなど、規模や依頼形態にかかわらず、多様な経路から執筆をお任せいただいております。
        </p>
        <Image
          src="/samples/crowdsourcing-rating.png"
          alt="クラウドソーシングでの評価画面（総合評価5.0・20件）"
          width={1024}
          height={583}
          className="mx-auto mt-6 block w-5/6 max-w-2xl rounded-lg border border-slate-200 shadow-sm ring-1 ring-slate-200/80"
          unoptimized
        />
        <Image
          src="/samples/saison-kurashi-articles.png"
          alt="セゾンのくらし大研究｜矢野英人の記事一覧画面"
          width={1024}
          height={606}
          className="mx-auto mt-6 block w-5/6 max-w-2xl rounded-lg border border-slate-200 shadow-sm ring-1 ring-slate-200/80"
          unoptimized
        />
        </div>

        <div className="mb-10 mt-10 w-full md:mt-12">
        <h3 className="mb-6 text-left text-base font-bold text-blue-900 md:mb-8 md:text-xl">
          <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
            サンプル記事
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">以下、サンプル記事（①〜⑤）です。</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          ※サイト設計、キーワード選定、SEO・AIO記事構成、記事執筆、表作成、画像作成、入稿まで全工程を管理しています。
        </p>
        </div>

        <ul className="w-full divide-y divide-slate-200 border-y border-slate-200">
        {listedArticles.map((article) => (
          <li key={article.id}>
            <SampleArticleLink article={article} />
            {article.id === "sample-4" ? (
              <>
                {sample5 ? (
                  <div className="border-t border-slate-200">
                    <SampleArticleLink article={sample5} />
                  </div>
                ) : null}
                <PortfolioOrderFlow />
              </>
            ) : null}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
