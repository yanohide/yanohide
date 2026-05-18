import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "titledBoxBlock",
  title: "タイトル付き囲み枠",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "枠のタイトル",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "本文（段落・リスト）",
      type: "array",
      description:
        "任意です。空のままでも公開できます（サイトではタイトル帯のみ表示されます）。",
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
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "タイトル付き囲み枠",
        subtitle: "Titled box",
      };
    },
  },
});
