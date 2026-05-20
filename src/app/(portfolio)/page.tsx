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
              />
            </div>
            <div className="portfolio-hero-ai-grid absolute inset-0 z-[1]" aria-hidden />
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
          />
          <div className="portfolio-hero-credentials">
            <ul className="grid w-full grid-cols-1 space-y-0 text-[0.5rem] leading-snug text-white/92 md:text-[0.5625rem]">
              <li className="whitespace-nowrap">理学療法士</li>
              <li className="whitespace-nowrap">介護支援専門員</li>
              <li className="-mt-0.5 whitespace-nowrap text-[0.5625rem] md:-mt-1 md:text-[0.625rem]">FP技能士２級</li>
            </ul>
          </div>
        </div>
        <div className="portfolio-hero-content relative z-10 w-full px-4 pb-4 pt-14 text-center md:px-8 md:pb-5 md:pt-16">
          <div className="portfolio-hero-main">
            <p className="portfolio-hero-lead portfolio-hero-headline mb-1 font-medium tracking-wide text-white">
              医療介護のAIクリエイター
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

      {/* Profile */}
      <section id="profile" className="portfolio-section portfolio-section--profile pb-8 pt-8 md:pb-10 md:pt-12">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4 text-center text-slate-800">
          <PortfolioSectionTitle
            script="プロフィール"
            subtitleMatchScript
            subtitle={
              <span className="portfolio-sky-underline inline-block whitespace-nowrap">
                医療介護のAIクリエイター
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
            />
          </div>
          <p className="portfolio-script-title mb-5 text-center text-sm font-bold leading-snug text-blue-900 md:text-base">
            <span className="portfolio-sky-underline inline-block whitespace-nowrap">
              HIDE｜
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
          <div className="portfolio-content-body space-y-8 text-sm md:space-y-10 md:text-base">
            <div>
              <h3 className="mb-2 font-bold text-slate-900">【ライティング】</h3>
              <div className="space-y-1.5">
                <p>医療介護系メディアの記事納品・ファクトチェック</p>
                <p>一部上場企業運営のメディアに記事納品</p>
                <p>金融・Web3系オウンドメディア運営</p>
                <p>YMYL個人認証マーク取得</p>
                <p>100記事以上の納品実績</p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-slate-900">【キャリア】</h3>
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
            <div>
              <h3 className="mb-2 font-bold text-slate-900">【保有資格】</h3>
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
      <section id="services" className="portfolio-section portfolio-section--services py-16">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="私にできること" subtitleMatchScript className="mb-12" />
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="w-fit max-w-full">
              <div className="grid grid-cols-2 gap-6 md:gap-12">
                <div className="ml-8 min-w-0 w-fit text-left text-sm text-slate-700 md:ml-11 md:text-base">
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
                <div className="min-w-0 w-fit text-left text-sm text-slate-700 md:text-base">
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
        </div>
      </section>

      {/* Strengths */}
      <section id="strengths" className="portfolio-section portfolio-section--strengths py-16">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="得意分野" subtitleMatchScript className="mb-12" />
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="inline-flex w-max max-w-full flex-col space-y-14 ml-5 md:ml-8 md:space-y-16">
            <div className="w-full">
              <h3 className="mb-6 text-left text-base font-bold md:mb-8 md:text-xl">
                <span className="portfolio-subsection-heading">
                  医療・リハビリ分野
                </span>
              </h3>
              <div className="flex flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                <div className="portfolio-feature-image relative h-[152px] w-[268px] shrink-0 md:h-[168px] md:w-[292px]">
                  <Image
                    src={IMG_MEDICAL_REHAB}
                    alt="理学療法士によるリハビリテーションの様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 268px, 292px"
                  />
                </div>
                <ul className="min-w-0 max-w-sm shrink-0 list-outside list-disc space-y-1.5 pl-5 text-left text-sm text-slate-700 md:text-base">
                  <li>18年以上の理学療法士としての臨床経験</li>
                  <li>入所・通所・訪問、約1,000人のリハビリ実績</li>
                  <li>医学・リハビリ領域の全国レベルの学会発表</li>
                  <li>オンラインでの認知行動療法の疼痛サポート</li>
                  <li>専門性の高い文献・エビデンスのリサーチ</li>
                </ul>
              </div>
            </div>
            <div className="w-full">
              <h3 className="mb-6 text-left text-base font-bold md:mb-8 md:text-xl">
                <span className="portfolio-subsection-heading">
                  介護・福祉分野
                </span>
              </h3>
              <div className="flex flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                <div className="portfolio-feature-image relative h-[152px] w-[268px] shrink-0 md:h-[168px] md:w-[292px]">
                  <Image
                    src={IMG_CARE_WELFARE}
                    alt="介護・福祉施設での利用者の交流の様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 268px, 292px"
                  />
                </div>
                <ul className="min-w-0 max-w-sm shrink-0 list-outside list-disc space-y-1.5 pl-5 text-left text-sm text-slate-700 md:text-base">
                  <li>10年以上のケアマネとしての知見</li>
                  <li>地域包括ケアシステムへの深い理解</li>
                  <li>介護予防推進リーダーとしての活動</li>
                  <li>認知症カフェでのボランティア経験</li>
                  <li>福祉用具・住環境の実践的アドバイス</li>
                </ul>
              </div>
            </div>
            <div className="w-full">
              <h3 className="mb-6 text-left text-base font-bold md:mb-8 md:text-xl">
                <span className="portfolio-subsection-heading">
                  金融・Web3分野
                </span>
              </h3>
              <div className="flex flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                <div className="portfolio-feature-image relative h-[152px] w-[268px] shrink-0 md:h-[168px] md:w-[292px]">
                  <Image
                    src={IMG_FINANCE_WEB3}
                    alt="金融資料・グラフとコインのイメージ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 268px, 292px"
                  />
                </div>
                <ul className="min-w-0 max-w-sm shrink-0 list-outside list-disc space-y-1.5 pl-5 text-left text-sm text-slate-700 md:text-base">
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
        </div>
      </section>

      {/* お客様への3つのお約束 */}
      <section id="customer-promises" className="portfolio-section portfolio-section--promises py-16">
        <div className="portfolio-section-inner mx-auto max-w-2xl px-4">
          <PortfolioSectionTitle script="お客様への3つのお約束" subtitleMatchScript className="mb-12" />
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="inline-flex w-max max-w-full flex-col ml-5 md:ml-8">
              <div className="flex flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                <div className="portfolio-feature-image relative h-[152px] w-[268px] shrink-0 md:h-[168px] md:w-[292px]">
                  <Image
                    src={IMG_HANDSHAKE}
                    alt="ビジネスシーンで握手を交わす様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 268px, 292px"
                  />
                </div>
                <div className="min-w-0 w-fit text-left text-sm text-slate-700 md:text-base">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900 md:text-base">
                        <span className="portfolio-subsection-heading">
                          ❶確かな情報提供
                        </span>
                      </p>
                      <p className="mt-1.5 text-left text-slate-700">
                        エビデンスと実務経験に基づいた、信頼性の高い情報をお届けします。
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 md:text-base">
                        <span className="portfolio-subsection-heading">
                          ❷読者目線の発信
                        </span>
                      </p>
                      <p className="mt-1.5 text-left text-slate-700">
                        専門知識をわかりやすく解説し、実践的なコンテンツを制作します。
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 md:text-base">
                        <span className="portfolio-subsection-heading">
                          ❸売上向上に伴走
                        </span>
                      </p>
                      <p className="mt-1.5 text-left text-slate-700">
                        AI時代でも売上げアップにつながる施策を提案・サポートします。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
