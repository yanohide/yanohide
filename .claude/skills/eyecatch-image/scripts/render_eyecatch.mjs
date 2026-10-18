// グラレコ風アイキャッチ（1600×900）を PNG に書き出す
//
// Usage:
//   NODE_PATH=<依存を入れたフォルダ>/node_modules node render_eyecatch.mjs <eyecatch.json>
//   → eyecatch.json と同じフォルダに eyecatch.png を書き出す
//
// 依存（リポジトリの package.json には入れない。作業用フォルダに入れる）:
//   npm i playwright-core@1.55.0
// Chromium は環境の /opt/pw-browsers/chromium を使う（CHROMIUM_PATH で上書き可）
//
// eyecatch.json の項目（同じフォルダからの相対パス）:
//   title       … 大きく載せる書名（『』なし）。titleLines で改行位置を指定してもよい
//   author      … 著者名（訳者は入れない）
//   catch       … 1行のキャッチコピー（30字以内）
//   background  … 背景のグラレコ風 SVG（1600×900）。作品ごとに描く
//   cover       … 表紙画像（cover.jpg など）。なければ手描き風の仮の本を描く
//   palette     … { paper, ink, accent, accent2, marker }
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(join(process.env.NODE_PATH || process.cwd(), "_"));
const { chromium } = require("playwright-core");
const exe = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const fontDir = resolve(dirname(fileURLToPath(import.meta.url)), "../assets/fonts");

const configPath = resolve(process.argv[2]);
const dir = dirname(configPath);
const c = JSON.parse(readFileSync(configPath, "utf8"));
const p = { paper: "#f6efe0", ink: "#3b2f2a", accent: "#c8553d", accent2: "#3f7d58", marker: "#f5d76e", ...c.palette };

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
const dataUrl = (file) => {
  const ext = extname(file).slice(1).toLowerCase();
  const mime = ext === "svg" ? "image/svg+xml" : ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
};

const bgPath = c.background && resolve(dir, c.background);
const background = bgPath && existsSync(bgPath) ? readFileSync(bgPath, "utf8") : "";
const coverPath = c.cover && resolve(dir, c.cover);
const hasCover = coverPath && existsSync(coverPath);

// 書名の長さで文字の大きさを決める（1行あたりの最長の字数で割る）
const lines = c.titleLines?.length ? c.titleLines : [c.title];
const longest = Math.max(...lines.map((l) => [...l].length));
// パネルの内側の幅（740px）に1行が収まる大きさにする
const titleSize = Math.min(lines.length > 1 ? 104 : 124, Math.floor(730 / Math.max(longest, 1)));

const coverHtml = hasCover
  ? `<img class="cover-img" src="${dataUrl(coverPath)}" alt="">`
  : `<div class="cover-mock"><span>${esc(c.title)}</span><small>${esc(c.author)}</small></div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Yusei Magic";src:url("${pathToFileURL(join(fontDir, "YuseiMagic-Regular.ttf")).href}")}
@font-face{font-family:"Yomogi";src:url("${pathToFileURL(join(fontDir, "Yomogi-Regular.ttf")).href}")}
html,body{margin:0;width:1600px;height:900px;overflow:hidden}
.canvas{position:relative;width:1600px;height:900px;background:${p.paper};font-family:"Yomogi",sans-serif;color:${p.ink}}
.paper{position:absolute;inset:0;opacity:.35;mix-blend-mode:multiply}
.bg{position:absolute;inset:0;filter:url(#wobble)}
.bg svg{width:1600px;height:900px;display:block}
.cover{position:absolute;left:110px;top:120px;width:430px;height:640px;transform:rotate(-4deg);
  box-shadow:10px 14px 0 rgba(59,47,42,.25);border:6px solid ${p.ink};border-radius:6px;background:#fff;overflow:hidden}
.cover-img{width:100%;height:100%;object-fit:cover;display:block}
.cover-mock{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:28px;
  background:linear-gradient(${p.accent} 0 58%, ${p.accent2} 58% 100%);color:#fff;font-family:"Yusei Magic";text-align:center}
.cover-mock span{font-size:58px;line-height:1.25;padding:0 30px}
.cover-mock small{font-size:30px}
.tape{position:absolute;width:150px;height:44px;background:rgba(245,215,110,.75);border:2px dashed rgba(59,47,42,.35)}
.t1{left:90px;top:96px;transform:rotate(-28deg)}.t2{left:440px;top:118px;transform:rotate(22deg)}
.panel{position:absolute;left:610px;top:205px;width:840px;padding:46px 50px 40px;background:rgba(255,252,243,.88);
  border:5px solid ${p.ink};border-radius:28px 34px 26px 38px/34px 26px 38px 28px;box-shadow:12px 12px 0 rgba(59,47,42,.18)}
.label{display:inline-block;font-size:30px;padding:6px 22px;border:3px solid ${p.ink};border-radius:999px;background:#fff;transform:rotate(-2deg)}
.title{margin:22px 0 10px;font-family:"Yusei Magic";font-size:${titleSize}px;line-height:1.18;letter-spacing:.02em}
.title span{background:linear-gradient(transparent 62%, ${p.marker} 62% 92%, transparent 92%);padding:0 .08em}
.author{font-size:40px;margin:6px 0 26px}
.catch{position:relative;font-size:36px;line-height:1.45;padding:18px 26px;background:#fff;border:4px solid ${p.ink};border-radius:22px}
.catch:before{content:"";position:absolute;left:60px;top:-26px;border:13px solid transparent;border-bottom-color:${p.ink}}
.brand{position:absolute;right:56px;bottom:40px;font-family:"Yusei Magic";font-size:34px;color:${p.ink};
  background:#fff;border:4px solid ${p.ink};border-radius:14px;padding:6px 22px;transform:rotate(2deg)}
</style></head><body><div class="canvas">
<svg width="0" height="0" style="position:absolute"><filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="6"/></filter></svg>
<svg class="paper" width="1600" height="900"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .3  0 0 0 .55 0"/></filter><rect width="1600" height="900" filter="url(#grain)"/></svg>
<div class="bg">${background}</div>
<div class="cover">${coverHtml}</div><div class="tape t1"></div><div class="tape t2"></div>
<div class="panel">
  <div class="label">${esc(c.label || "書評・要約")}</div>
  <div class="title">${lines.map((l) => `<span>${esc(l)}</span>`).join("<br>")}</div>
  <div class="author">${esc(c.author)}</div>
  ${c.catch ? `<div class="catch">${esc(c.catch)}</div>` : ""}
</div>
<div class="brand">${esc(c.brand || "つみたて読書")}</div>
</div></body></html>`;

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const out = join(dir, c.output || "eyecatch.png");
await page.screenshot({ path: out });
await browser.close();
console.log("wrote", out, hasCover ? "(表紙画像あり)" : "(表紙画像なし：仮の本を描画)");
