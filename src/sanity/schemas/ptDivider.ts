import { defineField, defineType } from "sanity";

export default defineType({
  name: "ptDivider",
  title: "区切り線",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "表示用ラベル（任意）",
      type: "string",
      description:
        "空欄で可です。入れた場合、区切り線付近のスクリーンリーダー用に使えます。",
    }),
  ],
  preview: {
    select: { label: "label" },
    prepare({ label }) {
      return { title: "区切り線", subtitle: label || "装飾" };
    },
  },
});
