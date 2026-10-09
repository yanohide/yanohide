export const PORTFOLIO = {
  name: "矢野英人｜YanoHideto",
  nameEn: "Yano Hideto",
  nameReading: "やの　ひでと",
  headerBrand: "医療記事×AI漫画",
  headerTitle: "医療記事×AI漫画",
  email: "contact@sonocafe.xyz",
  footerBio:
    "【医療記事×AI漫画】で売上サポート。介護AIラボ代表・矢野英人（理学療法士・介護支援専門員）です。医療介護職18年の現場知識を活かし、複雑な医療コンテンツを「AI漫画」で一目でわかる形に。記事の執筆からAI漫画化まで一気通貫対応。エビデンスと現場のリアリティが宿ったAI漫画で、読者の行動を後押しします。ぜひ一度、記事の漫画化をお試しください。",
} as const;

export const SAMPLE_ARTICLES = [
  {
    id: "sample-1",
    label: "サンプル記事①｜KW：介護保険外サービスとは",
    site: "40歳からの介護ナビ",
    title: "介護保険外サービスとは？種類と費用相場｜事業所選びが重要！",
    href: "https://site.yanohide.com/posts/non-insurance-nursing-care-services-types-and-cost",
    excerpt:
      "介護保険の対象外として提供される介護保険外サービスの概要、具体例と費用相場、保険サービスとの組み合わせ、事業所選びのポイントを解説。",
    image:
      "https://cdn.sanity.io/images/caycunb5/production/1d562cc7c48143683e47f0f1553ce8d6c160a184-1280x720.jpg",
  },
  {
    id: "sample-2",
    label: "サンプル記事②｜KW：介護うつ",
    site: "40歳からの介護ナビ",
    title: "【セルフチェック】介護うつとは？効果的な治療法からセルフケアまで",
    href: "https://site.yanohide.com/posts/care-depression",
    excerpt:
      "介護うつのセルフチェックから専門医相談、家族への協力依頼、サービス活用まで具体的な改善方法を解説。",
    image:
      "https://cdn.sanity.io/images/caycunb5/production/cd749a8372b8903df006aa4db8204e40869d08e4-1280x720.jpg",
  },
  {
    id: "sample-3",
    label: "サンプル記事③｜KW：認知症 治療",
    site: "40歳からの介護ナビ",
    title: "認知症は治療できる？完治困難でも進行を遅らせる3つの方法と相談先",
    href: "https://site.yanohide.com/posts/dementia-treatment-method",
    excerpt:
      "認知症治療の現状と進行抑制の方法、相談先を整理し、家族が取れる行動を具体的に紹介。",
    image:
      "https://cdn.sanity.io/images/caycunb5/production/91887a2930c2e682c2f6439a3c5f54faf87162a4-1280x720.jpg",
  },
  {
    id: "sample-4",
    label: "サンプル記事④｜KW：老人ホーム 高い",
    site: "40歳からの介護ナビ",
    title: "【老後のお金】老人ホームの費用が高い！安くするための６つの対策",
    href: "https://site.yanohide.com/posts/nursinghome-expensive",
    excerpt:
      "老人ホーム費用の相場・内訳から、費用を抑える具体策と納得して選ぶポイントを解説。",
    image:
      "https://cdn.sanity.io/images/caycunb5/production/153cc8664c6b6af0ee9c8695026c158501be4e4d-1280x720.jpg",
  },
  {
    id: "sample-5",
    label: "サンプル記事⑤｜KW：高齢者 見守りサービス 比較",
    site: "40歳からの介護ナビ",
    title: "【迷ったらコレ】高齢者見守りサービス18社を比較【2026年版】",
    href: "https://site.yanohide.com/posts/elderly-care-services-comparison",
    excerpt:
      "見守りサービス18社を種類別に比較。費用・特徴・選び方のポイントを表形式で整理。",
    image:
      "https://cdn.sanity.io/images/caycunb5/production/ed01e17931371920bbabc2b6863978ec479c62d2-1280x720.jpg",
  },
] as const;

export const ORDER_FLOW_STEPS = [
  {
    number: 1,
    heading: "お問い合わせ",
    ctaLabel: "お問い合わせフォームへ",
    ctaHref: "/contact",
  },
  {
    number: 2,
    heading: "お見積り・内容確認",
    detail: "各種メール・チャットツールにて対応いたします。",
  },
  {
    number: 3,
    heading: "初回提出",
    note: "※文字数や作業工程により前後します。",
  },
  {
    number: 4,
    heading: "修正対応・納品",
  },
] as const;

export const PROFILE_MANGA_PAGES = [
  {
    src: "/profile-manga/02-hard-to-read.jpg",
    alt: "読む前から難しそうに見えてしまい、内容が正しくても読まれなければ届かない。理解する前に離れてしまうかもしれないので、伝え方そのものを変えようとする場面",
  },
  {
    src: "/profile-manga/01-ai-manga-writer.jpg",
    alt: "副業に挑戦し、医療介護ライターを始めた。確かな根拠を置き、専門用語は読者の言葉へ置き換える。納品した記事は100本以上。文章だけでは十分だろうかと考える場面",
  },
  {
    src: "/profile-manga/03-origin-rehab.jpg",
    alt: "原点は医療・介護の現場。理学療法士として18年以上、入所・通所・訪問で担当してきた利用者は1000人以上。現場で得た知識や経験をもっと外へ届けたい",
  },
  {
    src: "/profile-manga/04-skills.jpg",
    alt: "現場にいるからリアリティのある漫画をイメージできる。介護はケアマネ視点、お金の問題はFP2級、SEO・AIOからサイト制作・入稿まで対応し、必要な工程をひとつの目的へつなげる",
  },
  {
    src: "/profile-manga/05-try-ai-manga.jpg",
    alt: "記事をAI漫画にしてみよう。伝えたい要点が一目で見えるよう、現場の動きを指示に落とし、SEOライティングの知識で具体的に指示する。現役の医療職＆薬機法ライターだからこそ制作できるAI漫画",
  },
  {
    src: "/profile-manga/06-process.jpg",
    alt: "最初に情報の根拠と表現を確認し、次に読者が迷わない流れを組み立て、原稿の流れと現場の実感を場面へ置き換える。漫画・記事・画像・Webまで一気通貫で作成する",
  },
  {
    src: "/profile-manga/07-writer-eye.jpg",
    alt: "医療職とライターの目があるから漫画にリアリティが宿る。まず興味を持てる入口を作り、読みやすくしても現場の正確さは譲らない。理解しやすい導線が次の行動を後押しする。最後に3つのお約束をお伝えします",
  },
  {
    src: "/profile-manga/08-quality.jpg",
    alt: "記事も漫画もコツコツ続けることで質が向上する。上場企業が運営するメディアへの納品も経験し、依頼の規模や経路を問わず丁寧に向き合う。一件ずつ積み重ねた経験が次の提案を支えている",
  },
  {
    src: "/profile-manga/09-promises.jpg",
    alt: "医療職とライターの目があるから漫画にリアリティが宿る。まず興味を持てる入口を作り、読みやすくしても現場の正確さは譲らない。理解しやすい導線が次の行動を後押しする。最後に3つのお約束をお伝えします",
  },
  {
    src: "/profile-manga/10-cta.jpg",
    alt: "1つ目は確かな情報を届けること、2つ目は読者目線で考えること、3つ目は売上アップに併走すること。ぜひ一度、記事の漫画化をお試し下さい",
  },
] as const;

export const WORKFLOW_STEPS = [
  { step: "STEP 1", title: "お問い合わせ", detail: "フォーム・メール・チャットでご連絡ください。" },
  {
    step: "STEP 2",
    title: "お見積り・内容確認",
    detail: "各種メール・チャットツールにて対応いたします。",
  },
  {
    step: "STEP 3",
    title: "初回提出",
    detail: "文字数・工程により前後します）",
  },
  { step: "STEP 4", title: "修正対応・納品", detail: "フィードバックを反映し、最終納品いたします。" },
] as const;
