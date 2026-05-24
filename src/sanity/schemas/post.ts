import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "記事",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "公開状態",
      type: "string",
      description: "公開サイトには「公開」の記事だけを表示します。",
      initialValue: "draft",
      options: {
        list: [
          { title: "下書き", value: "draft" },
          { title: "公開", value: "published" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "アイキャッチ画像",
      type: "image",
      description: "記事・一覧カードのメイン画像。未設定のときは下の「図形アイキャッチ」または既定画像を使います。",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "代替テキスト",
          description: "アクセシビリティ用。画像を設定したときは必須です。",
          validation: (rule) =>
            rule.custom((alt, ctx) => {
              const parent = ctx.parent as { asset?: { _ref?: string } } | undefined;
              if (!parent?.asset?._ref) return true;
              const t = String(alt ?? "").trim();
              if (!t) return "画像を設定したときは代替テキストが必須です";
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "公開日時",
      type: "datetime",
      hidden: ({ parent }) => parent?.status === "draft",
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const parent = ctx.parent as { status?: string } | undefined;
          if (parent?.status === "published" && !value) {
            return "公開記事には公開日時が必要です";
          }
          return true;
        }),
    }),
    defineField({
      name: "categories",
      title: "カテゴリー",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "tags",
      title: "タグ",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "excerpt",
      title: "抜粋",
      type: "text",
      rows: 3,
      description: "記事一覧・検索結果・メタディスクリプションの補助文として使います。",
    }),
    defineField({
      name: "eyecatch",
      title: "図形アイキャッチ（画像がない場合）",
      type: "string",
      description: "アイキャッチ画像がないときの装飾用SVG。画像を設定している場合は無視されます。",
      options: {
        list: [
          { title: "水と灯り（青緑）", value: "/eyecatch/cover-01.svg" },
          { title: "夜明けの廊下（紺）", value: "/eyecatch/cover-02.svg" },
          { title: "観測窓（橙）", value: "/eyecatch/cover-03.svg" },
          { title: "メモの層（灰緑）", value: "/eyecatch/cover-04.svg" },
          { title: "エッジの帯（群青）", value: "/eyecatch/cover-05.svg" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      description:
        "＋から追加。表は「表」グループのどちらか（リッチ＝セル内も装飾可／簡易＝テキストのみ）を選んでください。",
      options: {
        insertMenu: {
          filter: "auto",
          showIcons: true,
          views: [{ name: "list" }, { name: "grid" }],
          groups: [
            {
              name: "tables",
              title: "表",
              of: ["ptTable"],
            },
            { name: "text", title: "テキスト", of: ["block"] },
            { name: "media", title: "画像", of: ["image"] },
            {
              name: "utility",
              title: "コード・区切り線",
              of: ["ptCodeBlock", "ptDivider"],
            },
            {
              name: "blocks",
              title: "カード・コールアウトなど",
              of: [
                "calloutBlock",
                "qaBlock",
                "titledBoxBlock",
                "recommendationCard",
                "summaryBox",
                "speechBalloon",
              ],
            },
          ],
        },
      },
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "本文", value: "normal" },
            { title: "見出し1", value: "h1" },
            { title: "見出し2", value: "h2" },
            { title: "見出し3", value: "h3" },
            { title: "見出し4", value: "h4" },
            { title: "引用", value: "blockquote" },
          ],
          lists: [
            { title: "箇条書き", value: "bullet" },
            { title: "番号付き", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "太字", value: "strong" },
              { title: "斜体", value: "em" },
              { title: "コード", value: "code" },
              { title: "取り消し線", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "リンク",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  }),
                ],
              },
              {
                name: "affiliateLink",
                type: "object",
                title: "アフィリエイトリンク",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required().uri({
                        scheme: ["http", "https"],
                      }),
                  }),
                  defineField({
                    name: "disclosure",
                    title: "開示ラベル",
                    type: "string",
                    description: "リンク横に表示（例: PR・広告）",
                    initialValue: "PR",
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "代替テキスト" }),
            defineField({ name: "caption", type: "string", title: "キャプション" }),
          ],
        }),
        defineArrayMember({ type: "ptCodeBlock" }),
        defineArrayMember({ type: "ptDivider" }),
        defineArrayMember({
          type: "ptTable",
          title: "表（テキストのみ・簡易）",
        }),
        defineArrayMember({ type: "calloutBlock" }),
        defineArrayMember({ type: "qaBlock", title: "質問と回答（Q&A）" }),
        defineArrayMember({ type: "titledBoxBlock", title: "タイトル付き囲み枠" }),
        defineArrayMember({ type: "recommendationCard" }),
        defineArrayMember({ type: "summaryBox" }),
        defineArrayMember({ type: "speechBalloon" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO / OGP",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "SEOタイトル",
          type: "string",
          description: "検索結果では先頭〜60文字程度が表示されやすいです。長すぎると省略されます。",
          validation: (rule) =>
            rule
              .max(120)
              .warning("120文字を超えています。検索表示では短く見えることがあります。"),
        }),
        defineField({
          name: "description",
          title: "メタディスクリプション",
          type: "text",
          rows: 3,
          description: "推奨は約160文字以内です（長くても公開は可能。警告のみ出ます）。",
          validation: (rule) =>
            rule
              .max(320)
              .warning("320文字を超えています。検索スニペットでは途切れやすいです。"),
        }),
        defineField({
          name: "image",
          title: "OGP画像",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "代替テキスト",
              description: "OGP画像を設定したときは必須です。",
              validation: (rule) =>
                rule.custom((alt, ctx) => {
                  const parent = ctx.parent as { asset?: { _ref?: string } } | undefined;
                  if (!parent?.asset?._ref) return true;
                  const t = String(alt ?? "").trim();
                  if (!t) return "OGP画像があるときは代替テキストを入力してください";
                  return true;
                }),
            }),
          ],
        }),
        defineField({
          name: "noIndex",
          title: "検索エンジンに登録しない",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
});
