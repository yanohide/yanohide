import { defineField, defineType } from "sanity";

export default defineType({
  name: "speechBalloon",
  title: "セリフ・吹き出し",
  type: "object",
  fields: [
    defineField({
      name: "speaker",
      title: "話し手",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "セリフ本文",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "side",
      title: "アイコンの位置",
      type: "string",
      options: {
        list: [
          { title: "右側（吹き出しは左）", value: "right" },
          { title: "左側（吹き出しは右）", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({
      name: "tone",
      title: "吹き出しの色味",
      type: "string",
      options: {
        list: [
          { title: "ライトブルー（標準）", value: "sky" },
          { title: "ニュートラルグレー", value: "stone" },
          { title: "ウォームベージュ", value: "sand" },
        ],
        layout: "radio",
      },
      initialValue: "sky",
    }),
    defineField({
      name: "avatar",
      title: "アイコン画像（アセット）",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "avatarUrl",
      title: "アイコンURL（外部・アセット未設定時のみ使用）",
      type: "string",
      description: "未指定なら既定の人物アイコンが使われます。",
    }),
  ],
  preview: {
    select: { speaker: "speaker", text: "text" },
    prepare({ speaker, text }: { speaker?: string; text?: string }) {
      return {
        title: `${speaker || "話し手"}: ${(text || "").slice(0, 28)}${
          (text || "").length > 28 ? "…" : ""
        }`,
      };
    },
  },
});
