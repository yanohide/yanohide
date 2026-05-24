# 40歳からの介護ナビ → ポートフォリオサイト用 Markdown

**正本（Obsidian）:** `obsidian_main/介護ナビの記事/` に5記事を保存済み。

Sanity アップロード例:

```bash
cd /Users/sono/code/website/20260518_my_portfolio
npm run upload:sanity-publish -- "/Users/sono/Library/Mobile Documents/iCloud~md~obsidian/Documents/obsidian_main/介護ナビの記事/01-non-insurance-nursing-care-services.md"
```

## ファイル一覧（予定）

| # | ファイル名 | slug |
|---|-----------|------|
| ① | `01-non-insurance-nursing-care-services.md` | `non-insurance-nursing-care-services-types-and-cost` | ✅ |
| ② | `02-care-depression.md` | `care-depression` | ✅ |
| ③ | `03-dementia-treatment-method.md` | `dementia-treatment-method` | ✅ |
| ④ | `04-nursinghome-expensive.md` | `nursinghome-expensive` | ✅ |
| ⑤ | `05-elderly-care-services-comparison.md` | `elderly-care-services-comparison` | ✅ |

## Front matter（必須）

```yaml
---
title: "記事タイトル（サイト名は付けなくてOK）"
slug: kebab-case-slug
publishedAt: "2025-12-12"
excerpt: "一覧・OGP用の1〜2文"
heroImage: https://sonocafe.xyz/wp-content/uploads/2025/12/2.jpg
heroImageAlt: "アイキャッチの説明"
---
```

## 本文で削除する行

- `広告`
- カテゴリリンク行（例: `[介護の悩み](https://sonocafe.xyz/category/...)`）
- `目次`（サイト側が自動生成するため）
- WordPress サイドバー残骸

## 吹き出し（ヤノヒデ）の書き方

```markdown
:::speech
speaker: ヤノヒデ
side: right
tone: sky

仕事と介護の両立に悩むあなたに、きっと役立つヒントが見つかるでしょう。
:::
```

## アップロード（Step ②）

```bash
cd /Users/sono/code/website/20260518_my_portfolio
npm run upload:sanity-publish -- articles/kaimonavi-samples/01-non-insurance-nursing-care-services.md
```
