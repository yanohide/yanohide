/**
 * Obsidian Web Clipper → Sanity 用 Markdown
 * Usage: node scripts/kaimonavi/clipping-to-md.mjs <clipping.md> <output.md> '<json meta>'
 */
import fs from "node:fs";

const [src, dest, metaJson] = process.argv.slice(2);
if (!src || !dest || !metaJson) {
  console.error(
    "Usage: node clipping-to-md.mjs <clipping.md> <output.md> '{\"title\":\"...\",\"slug\":\"...\",...}'",
  );
  process.exit(1);
}

const meta = JSON.parse(metaJson);
let body = fs.readFileSync(src, "utf8").replace(/^---[\s\S]*?---\n/, "");
const lines = body.split("\n");
const out = [];
let skipFooter = false;

for (const line of lines) {
  const t = line.trim();
  if (t === "広告") continue;
  if (t === "目次") continue;
  if (/^\[介護の悩み\]\(https:\/\/sonocafe\.xyz\/category\//.test(t)) continue;
  if (/^-\s+\[/.test(t) && t.includes("sonocafe.xyz")) {
    skipFooter = true;
    continue;
  }
  if (skipFooter) continue;
  if (/^介護うつ\\_/.test(t)) continue;
  if (/^認知症/.test(t) && t.includes("\\_")) continue;
  out.push(line);
}

while (out.length && out[out.length - 1].trim() === "") out.pop();

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

fs.writeFileSync(dest, `${fm}${out.join("\n")}\n`, "utf8");
console.log(`OK: ${dest} (${out.length} body lines)`);
