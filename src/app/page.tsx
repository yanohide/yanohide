import Image from "next/image";
import Link from "next/link";

import { PostGrid, type PostCard } from "@/components/PostGrid";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

/** 参照リポの PNG が含まれないため、同等トーンのストック写真で代替 */
const IMG_MEDICAL_REHAB =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";
const IMG_CARE_WELFARE =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80";
const IMG_FINANCE_WEB3 =
  "https://images.unsplash.com/photo-1621761191319-6f761b3f7734?auto=format&fit=crop&w=800&q=80";
const IMG_HANDSHAKE =
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80";

export default async function HomePage() {
  const allPosts = await sanityFetch<PostCard[]>({
    query: POSTS_QUERY,
    revalidate: 60,
    fallback: [],
  });
  const samplePosts = allPosts.slice(0, 6);

  return (
    <div className="w-full text-slate-800">
      {/* Hero：背景は SiteChrome 側の一枚レイヤー（ヘッダー境目で写真が切れない） */}
      <section className="relative z-10 py-10 text-center text-white md:py-14">
        <div className="relative mx-auto max-w-2xl px-4 py-4 text-center md:px-6 md:py-5">
          <h1 className="mb-3 flex flex-wrap items-end justify-center gap-0 text-2xl font-bold leading-tight text-white md:text-4xl">
            <span className="inline-flex flex-col items-center">
              <span className="mb-0.5 text-[0.65rem] font-normal leading-none tracking-[0.2em] text-white/90 md:mb-1 md:text-xs">
                やの　ひでと
              </span>
              <span className="box-decoration-clone rounded-sm bg-white/20 px-2 py-1.5 md:px-2.5 md:py-2">
                矢野英人
              </span>
            </span>
            <span className="box-decoration-clone rounded-sm bg-white/20 px-2 py-1.5 md:px-2.5 md:py-2">
              医療介護のAIクリエイター
            </span>
          </h1>
          <div className="mb-4 inline-block border-b border-t border-white/35 px-4 py-2 md:px-5">
            <p className="text-xl font-bold tracking-[0.2em] md:text-2xl md:tracking-widest">ポートフォリオサイト</p>
          </div>
          <ul className="space-y-2 text-left text-base leading-relaxed md:text-lg">
            <li>・確かな情報提供：エビデンスと経験に基づく信頼情報を提供します</li>
            <li>・読者目線の発信：専門分野の難しい内容も分かりやすく解説します</li>
            <li>
              ・売上向上に伴走：AI×マーケティングで
              <span className="ml-0.5 font-bold text-yellow-300">売上アップに貢献</span>します
            </li>
          </ul>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="profile-gradient-section py-16">
        <div className="mx-auto max-w-2xl px-4 text-center text-slate-800">
          <h2 className="mb-8">
            <span className="box-decoration-clone rounded-sm bg-sky-200/90 px-1.5 py-0.5 text-xl font-bold leading-snug text-blue-900 md:px-2 md:py-1 md:text-2xl">
              矢野英人｜医療介護のAIクリエイター
            </span>
          </h2>
          <div className="mx-auto mb-8 h-36 w-36 overflow-hidden rounded-full md:h-40 md:w-40">
            <Image
              src="/avatars/yanohide.svg"
              alt="矢野英人"
              width={200}
              height={200}
              className="h-full w-full object-cover object-top"
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
          <h2 className="mb-12 text-center text-xl font-bold leading-snug text-blue-900 md:text-2xl">
            私にできること
          </h2>
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-12 text-center text-xl font-bold leading-snug text-blue-900 md:text-2xl">
            得意分野
          </h2>
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
          <h2 className="mb-12 text-center text-xl font-bold leading-snug text-blue-900 md:text-2xl">
            お客様への3つのお約束
          </h2>
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
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-xl font-bold leading-snug text-blue-900 md:text-2xl">
            <span className="block space-y-2">
              <span className="block">サンプル記事</span>
              <span className="block">執筆実績</span>
            </span>
          </h2>
          <PostGrid posts={samplePosts} variant="portfolio" />
          <p className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-block rounded-md bg-blue-900 px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-blue-800"
            >
              すべての記事を見る
            </Link>
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-6 text-2xl font-bold text-blue-900">
            <span className="inline-block border-b-2 border-blue-800 pb-2">お問い合わせ</span>
          </h2>
          <p className="text-slate-600">
            ご依頼・取材・共同制作のご相談は、各種スカウト媒体またはメールにて受け付けております。
            <br />
            （このサイトのメールアドレスはお手数ですが LinkedIn 等のプロフィールからご確認ください。）
          </p>
        </div>
      </section>
    </div>
  );
}
