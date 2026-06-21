"use client";

import { jaJPLocale } from "@sanity/locale-ja-jp";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import schemas from "./src/sanity/schemas";
import { presentationResolve } from "./src/sanity/presentation/resolve";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()?.length ?
    process.env.NEXT_PUBLIC_SANITY_DATASET.trim()
  : "production";

const previewOrigin =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
  process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "http://localhost:3000";

if (!projectId) {
  throw new Error(
    'Sanity の projectId がありません。`website/20260518_my_portfolio`（next.config と同じフォルダ）に `.env.local` を置き、`NEXT_PUBLIC_SANITY_PROJECT_ID=...` を設定してください。開発サーバーを一度止めて `npm run dev` で再起動してください。',
  );
}

export default defineConfig({
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    presentationTool({
      resolve: presentationResolve,
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    jaJPLocale(),
  ],
  schema: { types: schemas },
});
