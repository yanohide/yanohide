import Link from "next/link";

import { PortfolioSectionTitle } from "@/components/PortfolioSectionTitle";
import { WORKFLOW_STEPS } from "@/lib/portfolio-content";

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-blue-800 md:h-16 md:w-16"
      aria-hidden
    >
      {children}
    </div>
  );
}

export function PortfolioPricing() {
  return (
    <section id="pricing" className="portfolio-pricing-section py-16">
      <div className="mx-auto max-w-2xl px-4">
        <PortfolioSectionTitle script="プライシング" subtitle="料金と流れについて" className="mb-12" />

        <div className="space-y-8">
          <div className="flex gap-4 md:gap-6">
            <IconCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 20h16M6 16l6-10 6 10M12 6V4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconCircle>
            <div className="min-w-0 text-left text-sm text-slate-700 md:text-base">
              <h3 className="font-bold text-blue-900">記事執筆（SEOライティング）</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>構成あり：3.5円〜 / 文字</li>
                <li>構成なし：3.0円〜 / 文字</li>
              </ul>
              <p className="mt-2 text-xs text-slate-500 md:text-sm">
                ※テストライティングはご相談ください。文字数・ジャンルにより変動します。
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6">
            <IconCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16l5 5" strokeLinecap="round" />
              </svg>
            </IconCircle>
            <div className="min-w-0 text-left text-sm text-slate-700 md:text-base">
              <h3 className="font-bold text-blue-900">監修・リライト・WordPress入稿</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>WordPress入稿：1記事 3,000円〜</li>
                <li>監修・リライト：内容によりお見積り</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6">
            <IconCircle>
              <span className="text-lg font-bold">他</span>
            </IconCircle>
            <div className="min-w-0 text-left text-sm text-slate-700 md:text-base">
              <h3 className="font-bold text-blue-900">受付状況・稼働目安</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>平日 3時間 / 土日 6時間（目安）</li>
                <li>ご連絡には12時間以内を目安に返信</li>
                <li>5,000文字：構成済み 4本/月、構成＋本文 2本/月（目安）</li>
              </ul>
              <p className="mt-3 font-medium text-slate-800">利用可能ツール</p>
              <p className="mt-1 text-sm">
                Gmail / Chatwork / Zoom / Googleドキュメント / Word / Excel / WordPress / Canva Pro ほか
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-8 text-center text-lg font-bold text-blue-900">発注までの流れ</h3>
          <ol className="grid gap-6 sm:grid-cols-2">
            {WORKFLOW_STEPS.map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-sky-100 bg-white/90 p-5 shadow-sm"
              >
                <p className="text-xs font-bold tracking-wider text-sky-600">{item.step}</p>
                <h4 className="mt-1 text-base font-bold text-blue-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 text-center">
          <Link
            href="#contact"
            className="inline-block rounded-full bg-blue-800 px-10 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-700"
          >
            お問い合わせはこちら
          </Link>
        </p>
      </div>
    </section>
  );
}
