import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "summaryBox",
  title: "サマリー／チェックリスト",
  type: "object",
  fields: [
    defineField({
      name: "presentation",
      title: "表示スタイル",
      type: "string",
      initialValue: "boxed",
      options: {
        list: [
          { title: "囲みサマリー（見出し帯＋枠）", value: "boxed" },
          { title: "チェックリスト（リスト中心のシンプル）", value: "checklist" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "title", title: "タイトル（任意）", type: "string" }),
    defineField({
      name: "items",
      title: "項目",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "summaryItem",
          fields: [
            defineField({
              name: "text",
              type: "string",
              title: "テキスト",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "checked",
              type: "boolean",
              title: "チェック済み",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "text", checked: "checked" },
            prepare({ title, checked }) {
              return { title: `${checked ? "✓ " : "□ "}${title || ""}` };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", items: "items", presentation: "presentation" },
    prepare({ title, items, presentation }) {
      const count = Array.isArray(items) ? items.length : 0;
      const style = presentation === "checklist" ? "チェックリスト" : "囲みサマリー";
      return {
        title: title || (presentation === "checklist" ? "チェックリスト" : "サマリー"),
        subtitle: `${style} · ${count}項目`,
      };
    },
  },
});
