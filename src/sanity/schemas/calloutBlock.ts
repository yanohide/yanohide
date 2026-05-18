import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "calloutBlock",
  title: "コールアウト（メモ／補足）",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "色味",
      type: "string",
      options: {
        list: [
          { title: "メモ（青）", value: "memo" },
          { title: "ヒント（オレンジ）", value: "tip" },
          { title: "ノート（濃い）", value: "note" },
          { title: "注意（赤）", value: "warn" },
        ],
        layout: "radio",
      },
      initialValue: "memo",
    }),
    defineField({
      name: "title",
      title: "タイトル（任意）",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "本文", value: "normal" }],
          lists: [
            { title: "箇条書き", value: "bullet" },
            { title: "番号付き", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "太字", value: "strong" },
              { title: "斜体", value: "em" },
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
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", tone: "tone" },
    prepare({ title, tone }) {
      const toneLabel: Record<string, string> = {
        memo: "メモ",
        tip: "ヒント",
        note: "ノート",
        warn: "注意",
      };
      return {
        title: title || toneLabel[tone as string] || "コールアウト",
        subtitle: `Callout (${tone || "memo"})`,
      };
    },
  },
});
