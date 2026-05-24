import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "タグ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タグ名",
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
  ],
});
