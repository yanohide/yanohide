import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "カテゴリー",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "カテゴリー名",
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
      name: "description",
      title: "説明",
      type: "text",
      rows: 2,
    }),
  ],
});
