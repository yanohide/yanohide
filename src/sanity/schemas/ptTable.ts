import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "ptTable",
  title: "表",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "表タイトル（任意）",
      type: "string",
    }),
    defineField({
      name: "hasHeaderRow",
      title: "1行目をヘッダー行にする",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rows",
      title: "行",
      type: "array",
      validation: (rule) => rule.min(1).error("1行以上追加してください"),
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "cells",
              title: "セル（左から順）",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }: { cells?: string[] }) {
              return {
                title: (cells ?? []).join(" ｜ ") || "（空行）",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { caption: "caption", rows: "rows" },
    prepare({
      caption,
      rows,
    }: {
      caption?: string;
      rows?: { cells?: string[] }[];
    }) {
      const n = rows?.length ?? 0;
      return {
        title: caption || "表",
        subtitle: `${n}行`,
      };
    },
  },
});
