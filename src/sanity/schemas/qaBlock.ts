import { defineArrayMember, defineField, defineType } from "sanity";

/** 1セット分の回答本文（リンク・箇条書き可） */
const answerDetailBlocks = defineArrayMember({
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
});

export default defineType({
  name: "qaBlock",
  title: "質問と回答（Q&A）",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "質問と回答のセット",
      type: "array",
      description:
        "「項目を追加」でセット数を増やせます。1セット＝質問1＋回答1です。",
      of: [
        defineArrayMember({
          type: "object",
          name: "qaItem",
          title: "Q&A セット",
          fields: [
            defineField({
              name: "question",
              title: "質問",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().error("質問を入力してください"),
            }),
            defineField({
              name: "answerSummary",
              title: "回答（太字の1行・要約）",
              type: "text",
              rows: 2,
              description: "回答ブロック先頭に太字で表示される一行です。",
            }),
            defineField({
              name: "answerDetail",
              title: "回答（本文・詳細）",
              type: "array",
              description: "要約の下に続く通常の本文。",
              of: [answerDetailBlocks],
              validation: (rule) =>
                rule.custom((value, ctx) => {
                  const parent = ctx.parent as {
                    answerSummary?: string;
                  };
                  const hasSummary = !!(
                    parent?.answerSummary && parent.answerSummary.trim()
                  );
                  const hasDetail = Array.isArray(value) && value.length > 0;
                  if (!hasSummary && !hasDetail) {
                    return "要約または本文のどちらかを入力してください";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: { question: "question" },
            prepare({ question }) {
              const q = (question as string | undefined)?.trim() || "";
              return {
                title: q ? (q.length > 40 ? `${q.slice(0, 40)}…` : q) : "（無題）",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "question",
      title: "質問（旧形式・1セットのみ）",
      type: "text",
      rows: 3,
      hidden: ({ parent }) => {
        const n = (parent as { items?: unknown[] } | undefined)?.items?.length ?? 0;
        return n > 0;
      },
      description:
        "「セット」を使う新形式へ移行済みの場合は表示されません。未移行データの編集用です。",
    }),
    defineField({
      name: "answerSummary",
      title: "回答・要約（旧形式）",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => {
        const n = (parent as { items?: unknown[] } | undefined)?.items?.length ?? 0;
        return n > 0;
      },
    }),
    defineField({
      name: "answerDetail",
      title: "回答・本文（旧形式）",
      type: "array",
      hidden: ({ parent }) => {
        const n = (parent as { items?: unknown[] } | undefined)?.items?.length ?? 0;
        return n > 0;
      },
      of: [answerDetailBlocks],
    }),
  ],
  validation: (rule) =>
    rule.custom((obj) => {
      if (!obj || typeof obj !== "object") return true;
      const o = obj as {
        items?: {
          question?: string;
          answerSummary?: string;
          answerDetail?: unknown[];
        }[];
        question?: string;
        answerSummary?: string;
        answerDetail?: unknown[];
      };
      const items = o.items ?? [];
      const filledFromItems = items.filter((it) => {
        const q = it?.question?.trim();
        if (!q) return false;
        const s = it?.answerSummary?.trim();
        const d = Array.isArray(it?.answerDetail) && it.answerDetail.length > 0;
        return !!(s || d);
      });
      if (filledFromItems.length > 0) return true;

      const q = o.question?.trim();
      if (!q) {
        return "「質問と回答のセット」を1件以上追加するか、旧形式の質問を入力してください";
      }
      const s = o.answerSummary?.trim();
      const d = Array.isArray(o.answerDetail) && o.answerDetail.length > 0;
      if (!s && !d) {
        return "旧形式の場合は、要約または本文のどちらかを入力してください";
      }
      return true;
    }),
  preview: {
    select: { items: "items", question: "question" },
    prepare({ items, question }) {
      const n = Array.isArray(items) ? items.length : 0;
      const firstItem = items?.[0] as { question?: string } | undefined;
      const qFromItem = firstItem?.question?.trim() || "";
      const qLegacy = (question as string | undefined)?.trim() || "";
      const q = qFromItem || qLegacy;
      const count = n > 0 ? n : qLegacy ? 1 : 0;
      return {
        title: count > 1 ? `Q&A（${count}セット）` : "Q&A（1セット）",
        subtitle: q ? (q.length > 48 ? `${q.slice(0, 48)}…` : q) : undefined,
      };
    },
  },
});
