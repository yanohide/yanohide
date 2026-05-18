import { defineField, defineType } from "sanity";

export default defineType({
  name: "ptCodeBlock",
  title: "コードブロック",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "言語",
      type: "string",
      options: {
        list: [
          { title: "（なし）", value: "" },
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "JSON", value: "json" },
          { title: "Bash", value: "bash" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "Markdown", value: "markdown" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "code",
      title: "コード",
      type: "text",
      rows: 12,
    }),
  ],
  preview: {
    select: { code: "code", language: "language" },
    prepare({ code, language }) {
      const first = (code as string | undefined)?.split("\n")[0] ?? "";
      return {
        title: "コード",
        subtitle: [language || "plain", first.slice(0, 60)].filter(Boolean).join(" · "),
      };
    },
  },
});
