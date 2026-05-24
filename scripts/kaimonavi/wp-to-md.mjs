/**
 * sonocafe.xyz WordPress REST API → Sanity 用 Markdown
 * Usage: node scripts/kaimonavi/wp-to-md.mjs <slug> <output.md> '<json meta>'
 */
import fs from "node:fs";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const [slug, dest, metaJson] = process.argv.slice(2);
if (!slug || !dest || !metaJson) {
  console.error("Usage: node wp-to-md.mjs <wp-slug> <output.md> '{...meta...}'");
  process.exit(1);
}

const meta = JSON.parse(metaJson);

const res = await fetch(
  `https://sonocafe.xyz/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=content`,
);
const posts = await res.json();
if (!posts?.[0]?.content?.rendered) {
  console.error("Post not found:", slug);
  process.exit(1);
}

let html = posts[0].content.rendered;

// swell 吹き出し → :::speech
html = html.replace(
  /<div class="swell-block-balloon">[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<span class="c-balloon__iconName">([^<]*)<\/span>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/div><\/div><\/div><\/div>/gi,
  (_, avatar, speaker, text) => {
    const body = text.replace(/<[^>]+>/g, "").trim();
    return `\n\n:::speech\nspeaker: ${speaker.trim() || "ヤノヒデ"}\nside: right\ntone: sky\n\n${body}\n:::\n\n`;
  },
);

// capbox → 箇条書きブロック（タイトル + リスト）
html = html.replace(
  /<div class="swell-block-capbox[^"]*">[\s\S]*?<span><strong>([\s\S]*?)<\/strong><\/span>[\s\S]*?<div class="cap_box_content">([\s\S]*?)<\/div><\/div>/gi,
  (_, title, inner) => {
    const t = title.replace(/<[^>]+>/g, "").trim();
    return `\n\n**${t}**\n\n${inner}\n\n`;
  },
);

// 広告・目次ブロック等を除去
html = html.replace(/<div[^>]*class="[^"]*p-ad[^"]*"[\s\S]*?<\/div>/gi, "");
html = html.replace(/<div[^>]*id="toc[^"]*"[\s\S]*?<\/div>/gi, "");

const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" });
turndown.use(gfm);

turndown.addRule("removeEmpty", {
  filter: (node) => node.nodeName === "P" && !node.textContent.trim(),
  replacement: () => "",
});

let md = turndown.turndown(html);

// 1行に潰れた :::speech を正しい fence 形式へ
md = md.replace(
  /:::speech speaker:\s*([^\n]+?)\s+side:\s*(\w+)\s+tone:\s*(\w+)\s+([\s\S]*?)\s+:::/g,
  (_, speaker, side, tone, text) =>
    `\n\n:::speech\nspeaker: ${speaker.trim()}\nside: ${side}\ntone: ${tone}\n\n${text.trim()}\n:::\n\n`,
);

md = md.replace(/\\\*\\\*/g, "**");

const cleanup = [
  /^広告\s*$/gm,
  /^目次\s*$/gm,
  /^スクロールできます\s*$/gm,
  /^MENU\s*$/gm,
  /^閉じる\s*$/gm,
  /^URLをコピーしました！\s*$/gm,
  /^よかったらシェアしてね！\s*$/gm,
  /^## 関連記事[\s\S]*$/m,
  /^悩む人\s*$/gm,
  /^悩むj人\s*$/gm,
  /^＼[^\\]+／\s*$/gm,
  /^※気になるところをタップ[\s\S]*?$/gm,
  /^本記事の内容\s*$/gm,
  /^この記事で解決できるお悩み\s*$/gm,
  /^この記事を書いた人\s*$/gm,
  /^高齢者見守りサービス比較一覧\s*$/gm,
  /^＼ まずは内容をチェック／\s*$/gm,
  /^\[高齢者見守りサービス18社を比較\]\(#comparison\)\s*$/gm,
  /^という方は、\*\*\[コチラ\]\(#comparison\)\*\*をご覧ください。\s*$/gm,
  /^:::speech speaker: 悩む人[\s\S]*?:::\s*$/gm,
];

for (const re of cleanup) {
  md = md.replace(re, "");
}

md = md.replace(/\n{3,}/g, "\n\n").trimStart();

const fm = [
  "---",
  `title: "${meta.title.replace(/"/g, '\\"')}"`,
  `slug: ${meta.slug}`,
  `publishedAt: "${meta.publishedAt}"`,
  `excerpt: "${meta.excerpt.replace(/"/g, '\\"')}"`,
  `heroImage: ${meta.heroImage}`,
  `heroImageAlt: "${meta.heroImageAlt.replace(/"/g, '\\"')}"`,
  "---",
  "",
].join("\n");

fs.writeFileSync(dest, `${fm}${md}\n`, "utf8");
console.log(`OK: ${dest} (${md.split("\n").length} body lines)`);
