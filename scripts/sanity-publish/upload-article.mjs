// Markdown を Sanity にドラフトとして作成（sanity-publish スキル用）
//
// Usage: node scripts/sanity-publish/upload-article.mjs path/to/article.md
//
// .env.local または .env に以下のいずれか:
//   NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_STUDIO_PROJECT_ID
//   NEXT_PUBLIC_SANITY_DATASET / SANITY_STUDIO_DATASET（省略時 production）
//   SANITY_API_TOKEN / SANITY_AUTH_TOKEN（Editor 以上）
//
// Front matter 任意フィールド:
//   heroImage または image … アイキャッチURLまたは .md からの相対パス（heroImage に変換して送信）
//   heroImageAlt / imageAlt … heroImage の alt（推奨）
//   eyecatch … 図形アイキャッチ（/eyecatch/cover-01.svg などスキーマの値）

import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import matter from "gray-matter";
import { mdToPortableText, uploadImageAsset } from "./md-to-portable-text.mjs";

loadDotenv(".env.local");
loadDotenv(".env");

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID?.trim() || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset =
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  "production";
const token = process.env.SANITY_AUTH_TOKEN?.trim() || process.env.SANITY_API_TOKEN?.trim();

if (!projectId || !token) {
  console.error(
    "Error: projectId / token が不足です。.env.local に NEXT_PUBLIC_SANITY_PROJECT_ID と SANITY_API_TOKEN を設定してください。",
  );
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/sanity-publish/upload-article.mjs <path/to/article.md>");
  process.exit(1);
}

const absPath = resolve(filePath);
if (!existsSync(absPath)) {
  console.error(`Error: ファイルが見つかりません: ${filePath}`);
  process.exit(1);
}

const baseDir = dirname(absPath);

console.log(`Reading: ${filePath}`);
const raw = readFileSync(absPath, "utf8");
const { data, content } = matter(raw);

if (!data.title || !data.slug) {
  console.error("Error: Front Matter に title と slug が必要です。");
  process.exit(1);
}

console.log(`Title:   ${data.title}`);
console.log(`Slug:    ${data.slug}`);

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const prepared = preprocessMarkdown(content);
const body = await mdToPortableText(prepared, { client, baseDir });
console.log(`Body:    ${body.length} blocks`);

const draftId = `drafts.${randomUUID()}`;

const doc = {
  _id: draftId,
  _type: "post",
  title: data.title,
  slug: { _type: "slug", current: String(data.slug).trim() },
  status: "draft",
  excerpt: data.excerpt ? String(data.excerpt) : "",
  body,
};

if (data.publishedAt) {
  doc.publishedAt = new Date(data.publishedAt).toISOString();
}

if (data.eyecatch) {
  doc.eyecatch = String(data.eyecatch).trim();
}

const heroSrc = data.heroImage || data.image;
if (heroSrc) {
  try {
    const asset = await uploadImageAsset(client, String(heroSrc).trim(), baseDir);
    const altRaw =
      data.heroImageAlt ?? data.imageAlt ?? data.title ?? "";
    const alt = String(altRaw).trim() || "アイキャッチ";
    doc.heroImage = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt,
    };
    console.log(`Hero:    アイキャッチ画像をアップロード済み (${asset._id})`);
  } catch (e) {
    console.warn(`Hero:    アイキャッチのアップロードをスキップ: ${e.message}`);
  }
}

try {
  const result = await client.create(doc);
  console.log(`OK:      draft ${result._id}`);
  console.log(`Studio:  http://localhost:3000/studio/desk/post;${result._id}`);
  console.log(`Cloud:   https://${projectId}.sanity.studio/desk/post;${result._id}`);
  console.log("");
  console.log("※ Studio で内容を確認し、問題なければ「公開」を押してください。");
} catch (err) {
  console.error("Upload failed:", err.message);
  if (err.statusCode === 401) {
    console.error("  -> トークンが無効です。SANITY_API_TOKEN を確認してください。");
  } else if (err.statusCode === 403) {
    console.error("  -> 権限不足です。Editor 以上のトークンを使ってください。");
  }
  process.exit(1);
}

function preprocessMarkdown(md) {
  return md.replace(/^広告\s*$/gm, "").trimStart();
}

function loadDotenv(relPath) {
  const path = resolve(process.cwd(), relPath);
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const envKey = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[envKey]) process.env[envKey] = value;
  }
}
