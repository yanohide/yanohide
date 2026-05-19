"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "@/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()?.length ?
    process.env.NEXT_PUBLIC_SANITY_DATASET.trim()
  : "production";

if (!projectId) {
  throw new Error(
    'Sanity の projectId がありません。`website/20260518_my_portfolio`（next.config と同じフォルダ）に `.env.local` を置き、`NEXT_PUBLIC_SANITY_PROJECT_ID=...` を設定してください。開発サーバーを一度止めて `npm run dev` で再起動してください。',
  );
}

export default defineConfig({
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemas },
});
