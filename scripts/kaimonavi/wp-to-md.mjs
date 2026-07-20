/**
 * WordPress REST API → Sanity 用 Markdown
 * Usage: node scripts/kaimonavi/wp-to-md.mjs <slug> <output.md> '<json meta>'
 * WP 取得先は環境変数 WP_BASE（例: https://snooks.xsrv.jp）。未設定時は snooks。
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
const wpBase = (process.env.WP_BASE || "https://snooks.xsrv.jp").replace(
  /\/$/,
  "",
);

const res = await fetch(
  `${wpBase}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=content`,
);
const posts = await res.json();
if (!posts?.[0]?.content?.rendered) {
  console.error("Post not found:", slug);
  process.exit(1);
}

let html = posts[0].content.rendered;

/** 開始タグ位置から、入れ子を考慮して対応する閉じタグ終端を返す */
function findBalancedEnd(html, openStart, openTagRe, closeTag) {
  const openRe = new RegExp(openTagRe, "gi");
  const closeRe = new RegExp(closeTag, "gi");
  openRe.lastIndex = openStart;
  const first = openRe.exec(html);
  if (!first || first.index !== openStart) return -1;

  let depth = 1;
  let pos = openRe.lastIndex;
  while (depth > 0 && pos < html.length) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;
    const nextOpen = openRe.exec(html);
    const nextClose = closeRe.exec(html);
    if (!nextClose) return -1;
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1;
      pos = nextOpen.index + nextOpen[0].length;
    } else {
      depth -= 1;
      pos = nextClose.index + nextClose[0].length;
    }
  }
  return depth === 0 ? pos : -1;
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** swell 吹き出し → :::speech（入れ子対応。過大マッチで本文欠落しない） */
function convertBalloons(src) {
  const openRe = /<div class="swell-block-balloon">/gi;
  let out = "";
  let last = 0;
  let m;
  while ((m = openRe.exec(src))) {
    const start = m.index;
    const end = findBalancedEnd(src, start, "<div\\b", "</div>");
    if (end < 0) break;
    out += src.slice(last, start);
    const block = src.slice(start, end);
    const speakerMatch = block.match(
      /<span class="c-balloon__iconName">([^<]*)<\/span>/i,
    );
    const speaker = speakerMatch?.[1]?.trim() || "案内";
    const side = /-bln-right/.test(block) ? "right" : "left";
    const textMatch = block.match(
      /<div class="c-balloon__text">([\s\S]*?)<span class="c-balloon__shapes">/i,
    );
    const bodyHtml = textMatch?.[1] ?? "";
    const body = stripTags(bodyHtml);
    if (body) {
      out += `\n\n:::speech\nspeaker: ${speaker}\nside: ${side}\ntone: sky\n\n${body}\n:::\n\n`;
    }
    last = end;
    openRe.lastIndex = end;
  }
  out += src.slice(last);
  return out;
}

/** swell capbox → 太字タイトル + 中身 HTML（入れ子対応） */
function convertCapboxes(src) {
  const openRe = /<div class="swell-block-capbox[^"]*">/gi;
  let out = "";
  let last = 0;
  let m;
  while ((m = openRe.exec(src))) {
    const start = m.index;
    const end = findBalancedEnd(src, start, "<div\\b", "</div>");
    if (end < 0) break;
    out += src.slice(last, start);
    const block = src.slice(start, end);
    const titleMatch = block.match(
      /<div class="cap_box_ttl[^"]*">([\s\S]*?)<\/div>/i,
    );
    const title = stripTags(titleMatch?.[1] ?? "");
    let inner = "";
    const contentOpen = block.search(/<div class="cap_box_content">/i);
    if (contentOpen >= 0) {
      const contentEnd = findBalancedEnd(
        block,
        contentOpen,
        "<div\\b",
        "</div>",
      );
      if (contentEnd > 0) {
        const openTagEnd = block.indexOf(">", contentOpen) + 1;
        inner = block.slice(openTagEnd, contentEnd - "</div>".length);
      }
    }
    if (title) out += `\n\n**${title}**\n\n`;
    out += inner;
    last = end;
    openRe.lastIndex = end;
  }
  out += src.slice(last);
  return out;
}

html = convertBalloons(html);
html = convertCapboxes(html);

// 広告・目次ブロック等を除去（最初の閉じ div まで＝浅いブロック想定）
html = html.replace(/<div[^>]*class="[^"]*p-ad[^"]*"[\s\S]*?<\/div>/gi, "");
html = html.replace(/<div[^>]*id="toc[^"]*"[\s\S]*?<\/div>/gi, "");

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
});
turndown.use(gfm);

turndown.addRule("removeEmpty", {
  filter: (node) => node.nodeName === "P" && !node.textContent.trim(),
  replacement: () => "",
});

// :::speech フェンスを turndown が壊さないようプレースホルダ化
// （アンダースコアは turndown がエスケープするため使わない）
const speechHolders = [];
html = html.replace(
  /\n*:::speech\n([\s\S]*?)\n:::\n*/g,
  (_, body) => {
    const i = speechHolders.length;
    speechHolders.push(`:::speech\n${body.trim()}\n:::`);
    return `\n<p>SPEECHPHXX${i}XX</p>\n`;
  },
);

let md = turndown.turndown(html);

md = md.replace(/SPEECHPHXX(\d+)XX/g, (_, i) => {
  return `\n\n${speechHolders[Number(i)]}\n\n`;
});

md = md.replace(/\\\*\\\*/g, "**");

// UI 残骸のみ除去（本文・吹き出しは消さない）
const cleanup = [
  /^広告\s*$/gm,
  /^目次\s*$/gm,
  /^スクロールできます\s*$/gm,
  /^MENU\s*$/gm,
  /^閉じる\s*$/gm,
  /^URLをコピーしました！\s*$/gm,
  /^よかったらシェアしてね！\s*$/gm,
  /^## 関連記事[\s\S]*$/m,
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
