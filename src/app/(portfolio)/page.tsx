import Image from "next/image";

import { PortfolioSampleList } from "@/components/PortfolioSampleList";
import { PortfolioSectionTitle } from "@/components/PortfolioSectionTitle";
import { PORTFOLIO } from "@/lib/portfolio-content";
import { TYPING_DESK_UNSPLASH } from "@/lib/typing-hero-asset";

/** 参照リポの PNG が含まれないため、同等トーンのストック写真で代替 */
const IMG_MEDICAL_REHAB = "/strengths/medical-rehab.png";
const IMG_CARE_WELFARE = "/strengths/care-welfare.png";
const IMG_FINANCE_WEB3 = "/strengths/finance-web3.png";
const IMG_HANDSHAKE = "/customer-promises/handshake.png";

const PROMISES = [
  {
    no: "1",
    title: "確かな情報提供",
    body: "エビデンスと実務経験に基づいた、信頼性の高い情報をお届けします。",
  },
  {
    no: "2",
    title: "読者目線の発信",
    body: "専門知識をわかりやすく解説し、実践的なコンテンツを制作します。",
  },
  {
    no: "3",
    title: "売上向上に伴走",
    body: "AI時代でも売上げアップにつながる施策を提案・サポートします。",
  },
] as const;

const STRENGTHS = [
  {
    heading: "医療・リハビリ分野",
    image: IMG_MEDICAL_REHAB,
    alt: "理学療法士によるリハビリテーションの様子",
    items: [
      "18年以上の理学療法士としての臨床経験",
      "入所・通所・訪問、約1,000人のリハビリ実績",
      "医学・リハビリ領域の全国レベルの学会発表",
      "オンラインでの認知行動療法の疼痛サポート",
      "専門性の高い文献・エビデンスのリサーチ",
    ],
  },
  {
    heading: "介護・福祉分野",
    image: IMG_CARE_WELFARE,
    alt: "介護・福祉施設での利用者の交流の様子",
    items: [
      "10年以上のケアマネとしての知見",
      "地域包括ケアシステムへの深い理解",
      "介護予防推進リーダーとしての活動",
      "認知症カフェでのボランティア経験",
      "福祉用具・住環境の実践的アドバイス",
    ],
  },
  {
    heading: "金融・Web3分野",
    image: IMG_FINANCE_WEB3,
    alt: "金融資料・グラフとコインのイメージ",
    items: [
      "仮想通貨・金融系オウンドメディア運営実績",
      "2級ファイナンシャル・プランニング技能士",
      "つみたてNISA５年｜ビットコイン投資４年",
      "DeFi投資（パンケーキスワップなど）",
      "NFTホルダー（CNP、LLAC、XANAなど）",
    ],
  },
] as const;

export default function HomePage() {
  return (
    <div className="w-full text-slate-800">
      {/* Hero：シネマティック全画面 */}
      <section className="portfolio-hero relative z-10 w-full text-white">
        <div className="portfolio-hero-bg-shell pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="relative h-full w-full">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={TYPING_DESK_UNSPLASH}
                alt=""
                fill
                className="portfolio-hero-bg-image object-cover object-center"
                sizes="100vw"
                priority
                unoptimized
              />
            </div>
            <div className="portfolio-hero-ai-grid absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-aurora" aria-hidden />
            <div className="portfolio-hero-ai-mesh absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-ai-glow absolute inset-0 z-[1]" aria-hidden />
            <div className="portfolio-hero-bg-overlay-top absolute inset-0 z-[2]" aria-hidden />
            <div className="portfolio-hero-bg-overlay-bottom absolute inset-0 z-[2]" aria-hidden />
            <div className="portfolio-hero-grain absolute inset-0 z-[2]" aria-hidden />
          </div>
        </div>
        <div className="portfolio-hero-badge-block absolute left-2 top-[3.25rem] z-20 md:left-4 md:top-14">
          <Image
            src="/badges/ymaa-certification.png"
            alt="薬機法医療法 広告遵守 個人認証 YMAA"
            width={1024}
            height={924}
            className="portfolio-hero-ymaa-badge mx-auto h-auto w-[3.75rem] md:w-[4.5rem]"
            priority
            unoptimized
          />
          <div className="portfolio-hero-credentials">
            <ul className="portfolio-hero-credentials-list">
              <li>理学療法士</li>
              <li>介護支援専門員</li>
              <li>FP技能士２級</li>
            </ul>
          </div>
        </div>
        <div className="portfolio-hero-content relative z-10 w-full px-4 pb-4 pt-14 text-center md:px-8 md:pb-5 md:pt-16">
          <div className="portfolio-hero-main">
            <p className="portfolio-hero-headline mb-1 tracking-wide">
              <span className="portfolio-hero-headline__stack">
                <span className="portfolio-hero-headline__shadow" aria-hidden="true">
                  {PORTFOLIO.tagline}
                </span>
                <span className="portfolio-hero-headline__flow">{PORTFOLIO.tagline}</span>
              </span>
            </p>
            <h1 className="portfolio-hero-name mb-1 mt-4 text-xl font-bold tracking-wide md:mt-5 md:text-2xl">
              ポートフォリオサイト
            </h1>
            <ul className="portfolio-hero-lead mx-auto mt-5 w-full max-w-5xl space-y-1 text-center text-sm leading-snug md:mt-6 md:text-base">
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
                貴社の売上向上に貢献
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* キャッチコピー帯：横スクロール */}
      <section className="portfolio-section portfolio-section--stats py-12 md:py-14">
        <div className="portfolio-section-inner mx-auto max-w-none px-0">
          <div className="portfolio-marquee portfolio-marquee--text" data-reveal style={{ "--rv-delay": "120ms" } as React.CSSProperties}>
            <div className="portfolio-marquee__track py-1">
              {[0, 1].map((loop) => (
                <span
                  key={loop}
                  className="portfolio-marquee-text"
                  aria-hidden={loop === 1}
                >
                  {PORTFOLIO.marqueeMessage}
                  <span className="portfolio-marquee-text__sep" aria-hidden="true">
                    {"　　"}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="portfolio-section portfolio-section--profile pb-8 pt-8 md:pb-10 md:pt-12">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4 text-center text-slate-800">
          <PortfolioSectionTitle
            script="プロフィール"
            subtitleMatchScript
            subtitle={
              <span className="portfolio-sky-underline inline-block whitespace-nowrap">
                {PORTFOLIO.tagline}
              </span>
            }
            className="mb-5"
          />
          <div className="portfolio-profile-avatar mx-auto mb-3 h-32 w-32 overflow-hidden md:mb-4 md:h-36 md:w-36">
            <Image
              src="/avatars/profile-avatar.png"
              alt="矢野英人"
              width={200}
              height={200}
              className="h-full w-full object-cover object-center"
              unoptimized
            />
          </div>
          <p className="portfolio-script-title mb-5 text-center text-sm font-bold leading-snug text-blue-900 md:text-base">
            <span className="portfolio-sky-underline inline-block whitespace-nowrap">
              管理人：
              <ruby>
                {PORTFOLIO.name}
                <rt>{PORTFOLIO.nameReading}</rt>
              </ruby>
            </span>
          </p>
          <p className="mb-8 text-sm font-bold leading-relaxed text-slate-700 md:mb-10 md:text-base">
            〜 介護分野のリハビリ歴18年の臨床経験から、
            <br />
            100記事以上納品 × オウンドメディア運用 〜
          </p>
          <div className="portfolio-content-body grid gap-4 text-sm md:gap-5 md:text-base">
            <div
              className="portfolio-glass-card portfolio-gradient-ring portfolio-spotlight px-5 py-5 text-left md:px-7 md:py-6"
              data-spotlight
              data-reveal
            >
              <div className="portfolio-card-body">
                <h3 className="mb-3 font-bold text-slate-900">
                  <span className="portfolio-subsection-heading">【ライティング】</span>
                </h3>
                <div className="space-y-1.5">
                  <p>医療介護系メディアの記事納品・ファクトチェック</p>
                  <p>一部上場企業運営のメディアに記事納品</p>
                  <p>金融・Web3系オウンドメディア運営</p>
                  <p>YMYL個人認証マーク取得</p>
                  <p>100記事以上の納品実績</p>
                </div>
              </div>
            </div>
            <div
              className="portfolio-glass-card portfolio-gradient-ring portfolio-spotlight px-5 py-5 text-left md:px-7 md:py-6"
              data-spotlight
              data-reveal
              style={{ "--rv-delay": "90ms" } as React.CSSProperties}
            >
              <div className="portfolio-card-body">
                <h3 className="mb-3 font-bold text-slate-900">
                  <span className="portfolio-subsection-heading">【キャリア】</span>
                </h3>
                <div className="space-y-1.5">
                  <p>
                    <span className="portfolio-sky-underline inline-block">Webライターから医療介護系のAIクリエイターに転身</span>
                  </p>
                  <p>理学療法士として1,000人以上のリハビリ担当</p>
                  <p>理学療法・介護業界の全国レベルの学会発表</p>
                  <p>入所・通所・訪問のリハビリ支援</p>
                  <p>介護予防事業のセミナー経験</p>
                </div>
              </div>
            </div>
            <div
              className="portfolio-glass-card portfolio-gradient-ring portfolio-spotlight px-5 py-5 text-left md:px-7 md:py-6"
              data-spotlight
              data-reveal
              style={{ "--rv-delay": "180ms" } as React.CSSProperties}
            >
              <div className="portfolio-card-body">
                <h3 className="mb-3 font-bold text-slate-900">
                  <span className="portfolio-subsection-heading">【保有資格】</span>
                </h3>
                <div className="space-y-1.5">
                  <p>理学療法士・介護支援専門員・FP２級</p>
                  <p>認知症サポーターキャラバンメイト</p>
                  <p>福祉住環境コーディネーター２級</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="portfolio-section portfolio-section--services py-16">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="私にできること" subtitleMatchScript className="mb-12" />
          <div
            className="portfolio-glass-card portfolio-gradient-ring portfolio-spotlight mx-auto px-6 py-8 md:px-10 md:py-10"
            data-spotlight
            data-reveal
          >
            <div className="portfolio-card-body grid grid-cols-2 gap-6 md:gap-12">
              <div className="min-w-0 text-left text-sm text-slate-700 md:text-base">
                <h3 className="mb-4 text-left text-base font-bold md:mb-6 md:text-xl">
                  <span className="portfolio-subsection-heading">
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
              <div className="min-w-0 text-left text-sm text-slate-700 md:text-base">
                <h3 className="mb-4 text-left text-base font-bold md:mb-6 md:text-xl">
                  <span className="portfolio-subsection-heading">
                    執筆可能なジャンル
                  </span>
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-bold text-slate-900 md:text-base">医療ジャンル</p>
                    <p className="mt-1.5 text-left text-slate-700">
                      リハビリ医療、認知行動療法、ファクトチェック
                      <br />
                      医療介護の転職など
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 md:text-base">介護ジャンル</p>
                    <ul className="mt-1.5 list-none space-y-1.5 text-left text-slate-700">
                      <li>介護保険関連、認知症、高齢者の疾患</li>
                      <li>福祉用具、健康増進</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 md:text-base">金融系のジャンル</p>
                    <ul className="mt-1.5 list-none space-y-1.5 text-left text-slate-700">
                      <li>仮想通貨、DeFi、つみたてNISAなど</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section id="strengths" className="portfolio-section portfolio-section--strengths py-16">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="得意分野" subtitleMatchScript className="mb-12" />
          <div className="flex w-full flex-col space-y-6 md:space-y-8">
            {STRENGTHS.map((strength, index) => (
              <div
                key={strength.heading}
                className="portfolio-glass-card portfolio-gradient-ring portfolio-spotlight px-5 py-6 md:px-8 md:py-7"
                data-spotlight
              >
                <div className="portfolio-card-body">
                  <h3 className="mb-5 text-left text-base font-bold md:mb-6 md:text-xl">
                    <span className="portfolio-subsection-heading">{strength.heading}</span>
                  </h3>
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8 md:gap-10">
                    <div className="portfolio-feature-image relative h-[152px] w-[268px] shrink-0 md:h-[168px] md:w-[292px]">
                      <Image
                        src={strength.image}
                        alt={strength.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 268px, 292px"
                        unoptimized
                      />
                    </div>
                    <ul
                      className="min-w-0 flex-1 list-outside list-disc space-y-1.5 pl-5 text-left text-sm text-slate-700 md:text-base"
                      data-reveal
                      style={{ "--rv-delay": `${index * 90}ms` } as React.CSSProperties}
                    >
                      {strength.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お客様への3つのお約束 */}
      <section id="customer-promises" className="portfolio-section portfolio-section--promises py-16">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="お客様への3つのお約束" subtitleMatchScript className="mb-12" />
          <div className="portfolio-feature-image relative mx-auto mb-8 h-[152px] w-[268px] md:h-[168px] md:w-[292px]">
            <Image
              src={IMG_HANDSHAKE}
              alt="ビジネスシーンで握手を交わす様子"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 268px, 292px"
              unoptimized
            />
          </div>
          <div className="grid gap-4 md:gap-5">
            {PROMISES.map((promise, index) => (
              <div
                key={promise.no}
                className="portfolio-glass-card portfolio-gradient-ring portfolio-spotlight flex items-start gap-4 px-5 py-5 md:px-7 md:py-6"
                data-spotlight
                data-reveal
                style={{ "--rv-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="portfolio-promise-badge portfolio-card-body" aria-hidden>
                  {promise.no}
                </span>
                <div className="portfolio-card-body min-w-0 flex-1 text-left">
                  <p className="text-sm font-bold text-slate-900 md:text-base">
                    <span className="portfolio-subsection-heading">{promise.title}</span>
                  </p>
                  <p className="mt-1.5 text-sm text-slate-700 md:text-base">{promise.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samples */}
      <section id="samples" className="portfolio-section portfolio-section--samples pt-16 pb-6 md:pb-8">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="執筆実績・サンプル記事" subtitleMatchScript className="mb-12" />
          <PortfolioSampleList />
        </div>
      </section>
    </div>
  );
}
