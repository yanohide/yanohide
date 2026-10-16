import { defineArrayMember, defineField, defineType } from "sanity";

/** 記事中の「この記事を書いた人」囲み枠（左：紹介文、右：大きめのアイコン） */
export default defineType({
  name: "authorBox",
  title: "この記事を書いた人（囲み枠）",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "名前",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "肩書き", type: "string" }),
    defineField({ name: "catchCopy", title: "キャッチコピー", type: "string" }),
    defineField({
      name: "body",
      title: "紹介文",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "本文", value: "normal" }],
          lists: [],
          marks: {
            decorators: [{ title: "太字", value: "strong" }],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: "avatar",
      title: "アイコン画像（アセット）",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "avatarUrl",
      title: "アイコンURL（アセット未設定時のみ使用）",
      type: "string",
      description: "未指定ならプロフィール写真（/avatars/profile-avatar.png）が使われます。",
    }),
  ],
  preview: {
    select: { name: "name", tagline: "tagline" },
    prepare({ name, tagline }: { name?: string; tagline?: string }) {
      return { title: `この記事を書いた人：${name || ""}`, subtitle: tagline || "" };
    },
  },
});
