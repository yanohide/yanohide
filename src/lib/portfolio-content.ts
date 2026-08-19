export const PORTFOLIO = {
  name: "矢野英人",
  nameEn: "Yano Hideto",
  nameReading: "やの　ひでと",
  headerBrand: "介護AIラボ",
  headerTitle: "介護AIラボ",
  email: "contact@sonocafe.xyz",
  footerBio:
    "プロフィールをご覧いただき、ありがとうございます。介護AIラボ代表の矢野英人（理学療法士・介護支援専門員）です。介護リハビリ18年の現場経験と、100件超のAIクライアントワーク実績を活かし、SEO・AIOを意識した記事構成・執筆、医療・介護・金融系コンテンツ制作を承っております。エビデンスと現場の視点を大切に、読者に届く記事づくりを心がけています。お気軽にお問い合わせください。",
} as const;

export const SAMPLE_ARTICLES = [
  {
    id: "sample-1",
    label: "サンプル記事①｜KW：介護保険外サービスとは",
    site: "40歳からの介護ナビ",
    title: "介護保険外サービスとは？種類と費用相場｜事業所選びが重要！",
    href: "https://sonocafe.xyz/posts/non-insurance-nursing-care-services-types-and-cost",
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
    href: "https://sonocafe.xyz/posts/care-depression",
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
    href: "https://sonocafe.xyz/posts/dementia-treatment-method",
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
    href: "https://sonocafe.xyz/posts/nursinghome-expensive",
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
    href: "https://sonocafe.xyz/posts/elderly-care-services-comparison",
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
