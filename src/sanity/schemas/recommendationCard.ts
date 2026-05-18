import { defineField, defineType } from "sanity";

export default defineType({
  name: "recommendationCard",
  title: "おすすめ・推奨カード",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "画像（アセット）",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "代替テキスト", type: "string" }),
      ],
    }),
    defineField({
      name: "imageUrl",
      title: "画像URL（外部・アセット未設定時のみ使用）",
      type: "url",
      validation: (rule) =>
        rule.custom((value) => {
          if (value == null || String(value).trim() === "") return true;
          try {
            const u = new URL(String(value));
            return u.protocol === "http:" || u.protocol === "https:"
              ? true
              : "http または https のURLにしてください";
          } catch {
            return "有効なURLを入力してください";
          }
        }),
    }),
    defineField({
      name: "points",
      title: "ポイント",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "href",
      title: "CTA リンク",
      type: "url",
      description: "未使用のときは空欄のままで構いません。",
      validation: (rule) =>
        rule.custom((value) => {
          if (value == null || String(value).trim() === "") return true;
          try {
            const u = new URL(String(value));
            return u.protocol === "http:" || u.protocol === "https:"
              ? true
              : "http または https のURLにしてください";
          } catch {
            return "有効なURLを入力してください";
          }
        }),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA ラベル",
      type: "string",
      initialValue: "詳しく見る",
    }),
    defineField({
      name: "disclosure",
      title: "開示ラベル（任意）",
      type: "string",
      description: "例: PR・広告（アフィリエイトの場合）",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "ctaLabel" },
    prepare({ title, subtitle }) {
      return { title: title || "おすすめカード", subtitle };
    },
  },
});
