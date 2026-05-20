import Image from "next/image";
import Link from "next/link";

import { PortfolioPricing } from "@/components/PortfolioPricing";
import { PortfolioSampleList } from "@/components/PortfolioSampleList";
import { PortfolioSectionTitle } from "@/components/PortfolioSectionTitle";
import { PORTFOLIO } from "@/lib/portfolio-content";

/** 参照リポの PNG が含まれないため、同等トーンのストック写真で代替 */
const IMG_MEDICAL_REHAB =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";
const IMG_CARE_WELFARE =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80";
const IMG_FINANCE_WEB3 =
  "https://images.unsplash.com/photo-1621761191319-6f761b3f7734?auto=format&fit=crop&w=800&q=80";
const IMG_HANDSHAKE =
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80";

export default function HomePage() {
  return (
    <div className="w-full text-slate-800">
      {/* Hero：シネマティック全画面 */}
      <section className="portfolio-hero portfolio-cinema-frame relative z-10 mx-auto flex flex-col justify-center text-white">
        <div className="portfolio-hero-content relative z-10 w-full px-4 pb-10 pt-[4.2rem] text-center md:px-8 md:pb-11 md:pt-[4.8rem]">
          <p className="portfolio-hero-lead mb-1 text-xl font-medium tracking-wide text-white/95 md:text-2xl">
            <ruby>
              {PORTFOLIO.name}
              <rt>やのひでと</rt>
            </ruby>
            ｜医療介護のAIクリエイター
          </p>
          <h1 className="portfolio-hero-name mb-2 mt-6 md:mt-8">ポートフォリオ</h1>
          <ul className="portfolio-hero-lead mx-auto mt-8 w-full max-w-4xl space-y-0.5 text-center text-sm leading-snug md:mt-10 md:text-base">
            <li>
              ・<span className="portfolio-hero-bullet-title">確かな情報提供</span>
              ：臨床経験18年とエビデンスに基づく信頼情報を提供
            </li>
            <li>
              ・<span className="portfolio-hero-bullet-title">読者目線の発信</span>
              ：職員・患者・家族が抱えるリアルな悩みを根本解決
            </li>
            <li>
              ・<span className="portfolio-hero-bullet-title">売上向上に伴走</span>
              ：AIとWebマーケをフル活用し
              <span className="font-bold text-yellow-300">貴社の売上向上</span>に貢献
            </li>
          </ul>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="profile-gradient-section pb-12 pt-12 md:pb-14 md:pt-16">
        <div className="mx-auto max-w-2xl px-4 text-center text-slate-800">
          <PortfolioSectionTitle
            script="プロフィール"
            subtitleMatchScript
            subtitle={
              <span className="portfolio-sky-underline inline-block whitespace-nowrap">
                <ruby>
                  {PORTFOLIO.name}
                  <rt>やのひでと</rt>
                </ruby>
                ｜医療介護のAIクリエイター
              </span>
            }
            className="mb-8"
          />
          <div className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full md:h-36 md:w-36">
            <Image
              src="/avatars/profile-avatar.png"
              alt="矢野英人"
              width={200}
              height={200}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <p className="mb-8 text-sm font-bold leading-relaxed text-slate-700 md:text-base">
            〜 介護分野のリハビリ歴18年の臨床経験から、
            <br />
            100記事以上納品 × オウンドメディア運用 〜
          </p>
          <div className="space-y-8 text-sm leading-relaxed text-slate-700 md:text-base">
            <div>
              <h3 className="mb-3 font-bold text-slate-900">【ライティング】</h3>
              <div className="space-y-1.5">
                <p>金融・Web3系オウンドメディア運営</p>
                <p>YMYL個人認証マーク取得</p>
                <p>100記事以上の納品実績</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-slate-900">【キャリア】</h3>
              <div className="space-y-1.5">
                <p>理学療法士として1,000人以上のリハビリ担当</p>
                <p>医学・リハビリ領域の全国レベルの学会発表</p>
                <p>入所・通所・訪問のリハビリ支援</p>
                <p>介護予算監修のセミナー経験</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-slate-900">【保有資格】</h3>
              <div className="space-y-1.5">
                <p>理学療法士・介護支援専門員・FP２級</p>
                <p>認知症サポーターキャラバンメイト</p>
                <p>福祉住環境コーディネーター２級</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="スキル" subtitle="私にできること" className="mb-12" />
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div className="w-full text-left text-base text-slate-700">
              <h3 className="mb-6 w-full text-left text-xl font-bold text-blue-900">
                <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
                  対応可能な業務
                </span>
              </h3>
              <ul className="list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700">
                <li>サイト設計</li>
                <li>キーワード選定</li>
                <li>記事構成・本文執筆</li>
                <li>ファクトチェック</li>
                <li>SEOライティング</li>
                <li>AIOライティング</li>
                <li>バイブコーディング</li>
                <li>画像選定・作成｜Canva</li>
                <li>WordPress入稿</li>
              </ul>
            </div>
            <div className="w-full text-left text-base text-slate-700">
              <h3 className="mb-6 w-full text-left text-xl font-bold text-blue-900">
                <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
                  執筆可能なジャンル
                </span>
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-base font-bold text-slate-900">医療ジャンル</p>
                  <p className="mt-1.5 text-left text-slate-700">
                    リハビリ医療、認知行動療法、ファクトチェック
                    <br />
                    医療介護の転職など
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900">介護ジャンル</p>
                  <ul className="mt-1.5 list-none space-y-1.5 text-left text-slate-700">
                    <li>介護保険関連、認知症、高齢者の疾患</li>
                    <li>福祉用具、健康増進</li>
                  </ul>
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900">金融系のジャンル</p>
                  <ul className="mt-1.5 list-none space-y-1.5 text-left text-slate-700">
                    <li>仮想通貨、DeFi、つみたてNISAなど</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section id="strengths" className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="エキスパート" subtitle="得意分野" className="mb-12" />
          <div className="mx-auto w-full space-y-14 md:space-y-16">
            <div className="flex w-full flex-col items-stretch">
              <h3 className="mb-6 w-full text-left text-xl font-bold text-blue-900">
                <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
                  医療・リハビリ分野
                </span>
              </h3>
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
                <div className="relative mx-auto aspect-[3/2] w-full max-w-[200px] shrink-0 overflow-hidden rounded-[50%] shadow-md ring-1 ring-slate-200/70 md:max-w-[220px]">
                  <Image
                    src={IMG_MEDICAL_REHAB}
                    alt="理学療法士によるリハビリテーションの様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 220px"
                  />
                </div>
                <ul className="mx-auto w-full max-w-sm shrink-0 list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700 md:mx-0">
                  <li>18年以上の理学療法士としての臨床経験</li>
                  <li>入所・通所・訪問、約1,000人のリハビリ実績</li>
                  <li>医学・リハビリ領域の全国レベルの学会発表</li>
                  <li>オンラインでの認知行動療法の疼痛サポート</li>
                  <li>専門性の高い文献・エビデンスのリサーチ</li>
                </ul>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch">
              <h3 className="mb-6 w-full text-left text-xl font-bold text-blue-900">
                <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
                  介護・福祉分野
                </span>
              </h3>
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
                <div className="relative mx-auto aspect-[3/2] w-full max-w-[200px] shrink-0 overflow-hidden rounded-[50%] shadow-md ring-1 ring-slate-200/70 md:max-w-[220px]">
                  <Image
                    src={IMG_CARE_WELFARE}
                    alt="介護・福祉施設での利用者の交流の様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 220px"
                  />
                </div>
                <ul className="mx-auto w-full max-w-sm shrink-0 list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700 md:mx-0">
                  <li>10年以上のケアマネとしての知見</li>
                  <li>地域包括ケアシステムへの深い理解</li>
                  <li>介護予防推進リーダーとしての活動</li>
                  <li>認知症カフェでのボランティア経験</li>
                  <li>福祉用具・住環境の実践的アドバイス</li>
                </ul>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch">
              <h3 className="mb-6 w-full text-left text-xl font-bold text-blue-900">
                <span className="inline-block underline decoration-sky-200/90 decoration-[0.5em] underline-offset-[0.12em]">
                  金融・Web3分野
                </span>
              </h3>
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
                <div className="relative mx-auto aspect-[3/2] w-full max-w-[200px] shrink-0 overflow-hidden rounded-[50%] shadow-md ring-1 ring-slate-200/70 md:max-w-[220px]">
                  <Image
                    src={IMG_FINANCE_WEB3}
                    alt="金融資料・グラフとコインのイメージ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 220px"
                  />
                </div>
                <ul className="mx-auto w-full max-w-sm shrink-0 list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700 md:mx-0">
                  <li>仮想通貨・金融系オウンドメディア運営実績</li>
                  <li>2級ファイナンシャル・プランニング技能士</li>
                  <li>つみたてNISA５年｜ビットコイン投資４年</li>
                  <li>DeFi投資（パンケーキスワップなど）</li>
                  <li>NFTホルダー（CNP、LLAC、XANAなど）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お客様への3つのお約束 */}
      <section id="customer-promises" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="プロミス" subtitle="お客様への3つのお約束" className="mb-12" />
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10 lg:gap-12">
            <div className="relative mx-auto aspect-[3/2] w-full max-w-[200px] shrink-0 overflow-hidden rounded-[50%] shadow-md ring-1 ring-slate-200/70 md:max-w-[220px]">
              <Image
                src={IMG_HANDSHAKE}
                alt="ビジネスシーンで握手を交わす様子"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 200px, 220px"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-6 text-left text-base text-slate-700">
              <div>
                <h3 className="text-base font-bold text-blue-900 md:text-lg">❶確かな情報提供</h3>
                <p className="mt-1.5 leading-relaxed">
                  エビデンスと実務経験に基づいた、信頼性の高い情報をお届けします。
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-900 md:text-lg">❷読者目線の発信</h3>
                <p className="mt-1.5 leading-relaxed">
                  専門知識をわかりやすく解説し、実践的なコンテンツを制作します。
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-900 md:text-lg">❸売上向上に伴走</h3>
                <p className="mt-1.5 leading-relaxed">
                  売上げアップにつながるAIO施策・記事執筆を提案サポートします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Samples */}
      <section id="samples" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <PortfolioSectionTitle script="ワークス" subtitle="執筆実績・サンプル記事" className="mb-12" />
          <PortfolioSampleList />
          <p className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-block rounded-md bg-blue-900 px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-blue-800"
            >
              ブログ記事一覧を見る
            </Link>
          </p>
        </div>
      </section>

      <PortfolioPricing />

      {/* Contact */}
      <section id="contact" className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <PortfolioSectionTitle script="コンタクト" subtitle="お問い合わせ" className="mb-8" />
          <p className="text-sm leading-relaxed text-slate-600 md:text-base">
            ご依頼・取材・共同制作のご相談は、各種スカウト媒体またはメールにて受け付けております。
            <br />
            お気軽にご連絡ください。12時間以内の返信を心がけています。
          </p>
          <p className="mt-8">
            <a
              href="mailto:contact@sonocafe.xyz"
              className="inline-block rounded-full bg-blue-800 px-10 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-700"
            >
              お問い合わせはこちら
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
