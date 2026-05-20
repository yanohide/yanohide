export const PORTFOLIO = {
  name: "矢野英人",
  nameEn: "Yano Hideto",
  nameReading: "やの　ひでと",
  tagline: "医療介護のAIクリエイター",
  headerBrand: "矢野英人｜医療介護のAIクリエイター",
  email: "contact@sonocafe.xyz",
  footerBio:
    "プロフィールをご覧いただき、誠にありがとうございます。医療介護のAIクリエイター、矢野英人と申します。主にSEO・AIOを意識した記事構成・本文執筆や、介護・医療・金融系のコンテンツ制作を中心に承っております。丁寧な下調べを基本とし、円滑なコミュニケーションを心がけております。みなさまからのお問い合わせを、心よりお待ちしております。",
} as const;

export const SAMPLE_ARTICLES = [
  {
    id: "sample-1",
    label: "サンプル記事①｜KW：介護保険外サービスとは",
    site: "40歳からの介護ナビ",
    title: "介護保険外サービスとは？種類と費用相場｜事業所選びが重要！",
    href: "https://sonocafe.xyz/non-insurance-nursing-care-services-types-and-cost/",
    excerpt:
      "介護保険外サービスの種類・料金相場・事業所の選び方を、利用シーン別にわかりやすく解説した記事です。",
    image: "https://sonocafe.xyz/wp-content/uploads/2025/12/2.jpg",
  },
  {
    id: "sample-2",
    label: "サンプル記事②｜KW：介護うつ",
    site: "40歳からの介護ナビ",
    title: "【セルフチェック】介護うつとは？効果的な治療法からセルフケアまで",
    href: "https://sonocafe.xyz/care-depression/",
    excerpt:
      "介護うつのセルフチェックから専門医相談、家族への協力依頼、サービス活用まで具体的な改善方法を解説。",
    image: "https://sonocafe.xyz/wp-content/uploads/2025/12/5.jpg",
  },
  {
    id: "sample-3",
    label: "サンプル記事③｜KW：認知症 治療",
    site: "40歳からの介護ナビ",
    title: "認知症は治療できる？完治困難でも進行を遅らせる3つの方法と相談先",
    href: "https://sonocafe.xyz/dementia-treatment-method/",
    excerpt:
      "認知症治療の現状と進行抑制の方法、相談先を整理し、家族が取れる行動を具体的に紹介。",
    image: "https://sonocafe.xyz/wp-content/uploads/2025/12/3.jpg",
  },
  {
    id: "sample-4",
    label: "サンプル記事④｜KW：老人ホーム 高い",
    site: "40歳からの介護ナビ",
    title: "【老後のお金】老人ホームの費用が高い！安くするための６つの対策",
    href: "https://sonocafe.xyz/nursinghome-expensive/",
    excerpt:
      "老人ホーム費用の相場・内訳から、費用を抑える具体策と納得して選ぶポイントを解説。",
    image: "https://sonocafe.xyz/wp-content/uploads/2025/12/6.jpg",
  },
  {
    id: "sample-5",
    label: "サンプル記事⑤｜KW：高齢者 見守りサービス 比較",
    site: "40歳からの介護ナビ",
    title: "【迷ったらコレ】高齢者見守りサービス18社を比較【2025年版】",
    href: "https://sonocafe.xyz/elderly-care-services-comparison/",
    excerpt:
      "見守りサービス18社を種類別に比較。費用・特徴・選び方のポイントを表形式で整理。",
    image: "https://sonocafe.xyz/wp-content/uploads/2025/12/7.jpg",
  },
] as const;

export const ORDER_FLOW_STEPS = [
  {
    number: 1,
    heading: "お問い合わせ",
    ctaLabel: "お問合せフォームへ",
    ctaHref: "mailto:contact@sonocafe.xyz",
  },
  {
    number: 2,
    heading: "お見積り・内容確認",
    detail: "各種メール・チャットツールにて対応いたします。",
  },
  {
    number: 3,
    heading: "初稿提出",
    detail: "5,000文字：1週間以内",
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
    title: "初稿提出",
    detail: "5,000文字：1週間以内（文字数・工程により前後します）",
  },
  { step: "STEP 4", title: "修正対応・納品", detail: "フィードバックを反映し、最終納品いたします。" },
] as const;
