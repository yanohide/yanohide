// 図解の SVG を、ブログ用の PNG（2倍解像度）に変換する
//
// Usage:
//   NODE_PATH=<依存を入れたフォルダ>/node_modules node render_diagrams.mjs <svg> [<svg> ...]
//   → 同じ場所に同名の .png を書き出す
//
// 依存（リポジトリの package.json には入れない。作業用フォルダに入れる）:
//   npm i playwright-core@1.55.0 @fontsource/noto-sans-jp@5.2.5
// Chromium は環境の /opt/pw-browsers/chromium を使う（CHROMIUM_PATH で上書き可）
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(join(process.env.NODE_PATH || process.cwd(), "_"));
const { chromium } = require("playwright-core");
const fontCss = pathToFileURL(require.resolve("@fontsource/noto-sans-jp/index.css")).href;
const fontCssBold = pathToFileURL(require.resolve("@fontsource/noto-sans-jp/700.css")).href;
const exe = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ deviceScaleFactor: 2 });
for (const svgPath of process.argv.slice(2)) {
  const svg = readFileSync(svgPath, "utf8");
  const w = Number((svg.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/) || [])[1] || 800);
  const h = Number((svg.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/) || [])[2] || 450);
  await page.setViewportSize({ width: Math.ceil(w), height: Math.ceil(h) });
  await page.setContent(
    `<html><head><link rel="stylesheet" href="${fontCss}"><link rel="stylesheet" href="${fontCssBold}">
     <style>html,body{margin:0;background:#fff} svg{display:block;width:${w}px;height:${h}px;font-family:"Noto Sans JP",sans-serif}</style>
     </head><body>${svg}</body></html>`,
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.ready);
  const out = svgPath.replace(/\.svg$/, ".png");
  await page.locator("svg").screenshot({ path: out });
  console.log("wrote", out);
}
await browser.close();
