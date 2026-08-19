import Image from "next/image";

import { PortfolioSampleList } from "@/components/PortfolioSampleList";
import { PortfolioSectionTitle } from "@/components/PortfolioSectionTitle";
import { PORTFOLIO } from "@/lib/portfolio-content";
import { PORTFOLIO_HERO_IMAGES } from "@/lib/typing-hero-asset";

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
      {/* Hero：TEOTORIATTE風（左コピー × 右写真 × 青レール） */}
      <section className="portfolio-hero portfolio-hero--teo relative z-10 w-full">
        <div className="portfolio-hero-teo-grid">
          <div className="portfolio-hero-teo-copy">
            <div className="portfolio-hero-teo-copy-inner">
              <h1 className="portfolio-hero-teo-headline portfolio-hero-teo-headline--copy">
                <span>介護現場で</span>
                <span>AI使いこなして</span>
                <span>業務をラクにする人。</span>
              </h1>
              <div
                className="portfolio-hero-teo-badge portfolio-glass-card portfolio-gradient-ring px-5 py-4 md:px-6 md:py-5"
              >
                <div className="portfolio-card-body flex items-center gap-3 md:gap-4">
                  <Image
                    src="/badges/ymaa-certification.png"
                    alt="薬機法医療法 広告遵守 個人認証 YMAA"
                    width={1024}
                    height={924}
                    className="portfolio-hero-teo-badge-image shrink-0"
                    priority
                    unoptimized
                  />
                  <div className="portfolio-hero-teo-badge-copy">
                    <p className="portfolio-hero-teo-badge-name">{PORTFOLIO.nameEn}</p>
                    <ul className="portfolio-hero-teo-credentials">
                      <li>理学療法士</li>
                      <li>介護支援専門員</li>
                      <li>FP技能士２級</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="portfolio-hero-teo-visual" aria-hidden>
            <Image
              src={PORTFOLIO_HERO_IMAGES[0].src}
              alt=""
              fill
              className="portfolio-hero-teo-bg-photo"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="portfolio-section portfolio-section--profile pb-8 pt-8 md:pb-10 md:pt-12">
        <div className="portfolio-section-inner text-center text-slate-800">
          <PortfolioSectionTitle script="プロフィール" className="mb-5" />
          <div
            className="portfolio-profile-avatar mx-auto mb-2 h-32 w-32 overflow-hidden md:mb-3 md:h-36 md:w-36"
            data-reveal="zoom"
          >
            <Image
              src="/avatars/profile-avatar.png"
              alt="矢野英人"
              width={200}
              height={200}
              className="h-full w-full object-cover object-center"
              unoptimized
            />
          </div>
          <p className="portfolio-script-title mb-2 text-center text-sm font-bold leading-snug text-blue-900 md:mb-3 md:text-base">
            代表者
          </p>
          <p className="portfolio-script-title mb-5 text-center text-lg font-bold leading-snug text-blue-900 md:text-xl">
            ヤノヒデ｜{PORTFOLIO.name}
          </p>
          <p className="mb-8 text-base font-bold leading-relaxed text-slate-700 md:mb-10">
            介護リハビリ18年 × AIクライアントワーク × 100以上の案件対応
          </p>
          <div className="portfolio-content-body grid gap-4 md:gap-5">
            <div
            className="portfolio-glass-card portfolio-gradient-ring px-5 py-5 text-left md:px-7 md:py-6"
            data-reveal
            >
              <div className="portfolio-card-body">
                <h3 className="mb-3 font-bold text-slate-900">
                  <span className="portfolio-subsection-heading">【ライティング】</span>
                </h3>
                <ul className="list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700">
                  <li>医療介護系メディアの記事納品・ファクトチェック</li>
                  <li>一部上場企業運営のメディアに記事納品</li>
                  <li>金融・Web3系オウンドメディア運営</li>
                  <li>YMYL個人認証マーク取得</li>
                  <li>100記事以上の納品実績</li>
                </ul>
              </div>
            </div>
            <div
            className="portfolio-glass-card portfolio-gradient-ring px-5 py-5 text-left md:px-7 md:py-6"
            data-reveal
              style={{ "--rv-delay": "90ms" } as React.CSSProperties}
            >
              <div className="portfolio-card-body">
                <h3 className="mb-3 font-bold text-slate-900">
                  <span className="portfolio-subsection-heading">【キャリア】</span>
                </h3>
                <ul className="list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700">
                  <li>
                    <span className="portfolio-sky-underline inline-block">
                      Webライターから医療介護系のAIクリエイターに転身
                    </span>
                  </li>
                  <li>理学療法士として1,000人以上のリハビリ担当</li>
                  <li>理学療法・介護業界の全国レベルの学会発表</li>
                  <li>入所・通所・訪問のリハビリ支援</li>
                  <li>介護予防事業のセミナー経験</li>
                </ul>
              </div>
            </div>
            <div
            className="portfolio-glass-card portfolio-gradient-ring px-5 py-5 text-left md:px-7 md:py-6"
            data-reveal
              style={{ "--rv-delay": "180ms" } as React.CSSProperties}
            >
              <div className="portfolio-card-body">
                <h3 className="mb-3 font-bold text-slate-900">
                  <span className="portfolio-subsection-heading">【保有資格】</span>
                </h3>
                <ul className="list-outside list-disc space-y-1.5 pl-5 text-left text-slate-700">
                  <li>理学療法士・介護支援専門員・FP２級</li>
                  <li>認知症サポーターキャラバンメイト</li>
                  <li>福祉住環境コーディネーター２級</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="portfolio-section portfolio-section--services py-16">
        <div className="portfolio-section-inner">
          <PortfolioSectionTitle script="私にできること" subtitleMatchScript className="mb-12" />
          <div
            className="portfolio-glass-card portfolio-gradient-ring mx-auto px-6 py-8 md:px-10 md:py-10"
            data-reveal
          >
            <div className="portfolio-card-body grid grid-cols-2 gap-6 md:gap-12">
              <div className="min-w-0 text-left text-base text-slate-700">
                <h3 className="mb-4 text-left text-lg font-bold md:mb-6 md:text-xl">
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
              <div className="min-w-0 text-left text-base text-slate-700">
                <h3 className="mb-4 text-left text-lg font-bold md:mb-6 md:text-xl">
                  <span className="portfolio-subsection-heading">
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
        </div>
      </section>

      {/* Strengths */}
      <section id="strengths" className="portfolio-section portfolio-section--strengths py-16">
        <div className="portfolio-section-inner">
          <PortfolioSectionTitle script="得意分野" subtitleMatchScript className="mb-12" />
          <div className="flex w-full flex-col space-y-6 md:space-y-8">
            {STRENGTHS.map((strength, index) => (
              <div
                key={strength.heading}
                className="portfolio-glass-card portfolio-gradient-ring px-5 py-6 md:px-8 md:py-7"
                data-reveal
                style={{ "--rv-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <div className="portfolio-card-body">
                  <h3 className="mb-5 text-left text-lg font-bold md:mb-6 md:text-xl">
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
                    <ul className="min-w-0 flex-1 list-outside list-disc space-y-1.5 pl-5 text-left text-base text-slate-700">
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
        <div className="portfolio-section-inner">
          <PortfolioSectionTitle script="お客様への3つのお約束" subtitleMatchScript className="mb-12" />
          <div
            className="portfolio-feature-image relative mx-auto mb-8 h-[152px] w-[268px] md:h-[168px] md:w-[292px]"
            data-reveal="zoom"
          >
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
                className="portfolio-glass-card portfolio-gradient-ring flex items-start gap-4 px-5 py-5 md:px-7 md:py-6"
                data-reveal
                style={{ "--rv-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="portfolio-promise-badge portfolio-card-body" aria-hidden>
                  {promise.no}
                </span>
                <div className="portfolio-card-body min-w-0 flex-1 text-left">
                  <p className="text-base font-bold text-slate-900">
                    <span className="portfolio-subsection-heading">{promise.title}</span>
                  </p>
                  <p className="mt-1.5 text-base text-slate-700">{promise.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samples */}
      <section id="samples" className="portfolio-section portfolio-section--samples pt-16 pb-6 md:pb-8">
        <div className="portfolio-section-inner">
          <PortfolioSectionTitle script="執筆実績・サンプル記事" subtitleMatchScript className="mb-12" />
          <PortfolioSampleList />
        </div>
      </section>
    </div>
  );
}
