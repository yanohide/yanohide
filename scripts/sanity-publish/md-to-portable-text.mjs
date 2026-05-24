/**
 * Markdown → Sanity Portable Text（my-portfolio / post.body スキーマ向け）
 *
 * - GFM 表 → ptTable（セルはプレーンテキスト）
 * - GFM アラート（> [!NOTE] 等）→ calloutBlock
 * - コードフェンス → ptCodeBlock、HR → ptDivider
 * - :::speech / :::titled-box フェンス → speechBalloon / titledBoxBlock
 * - 画像（![]()）→ 既定は {src} 付き image（upload-article 側で asset に解決）
 *
 * @portabletext/markdown が子ブロックまで再帰的にトラバースしないため、
 * アラート内の画像などは convert 後に walk で asset 化する。
 */

import { randomUUID } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { markdownToPortableText } from "@portabletext/markdown";
import { toPlainText } from "@portabletext/toolkit";

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

const markdownOptions = {
  types: {
    table: mapTableToPtTable,
    callout: mapCalloutToCalloutBlock,
    code: mapCodeToPtCodeBlock,
    horizontalRule: mapHrToPtDivider,
  },
};

function mapHrToPtDivider({ context }) {
  return {
    _type: "ptDivider",
    _key: context.keyGenerator(),
    label: "",
  };
}

function mapCodeToPtCodeBlock({ context, value }) {
  return {
    _type: "ptCodeBlock",
    _key: context.keyGenerator(),
    language: value.language || "",
    code: value.code || "",
  };
}

function mapTableToPtTable({ context, value }) {
  const rows = (value.rows || []).map((row) => ({
    _type: "tableRow",
    _key: row._key || context.keyGenerator(),
    cells: (row.cells || []).map((cell) => {
      const blocks = cell.value || [];
      return toPlainText(blocks).replace(/\s+/g, " ").trim();
    }),
  }));
  return {
    _type: "ptTable",
    _key: context.keyGenerator(),
    caption: "",
    hasHeaderRow: (value.headerRows ?? 0) > 0,
    rows,
  };
}

/** GFM alert の種類 → calloutBlock.tone */
function mapCalloutToCalloutBlock({ context, value }) {
  const raw = String(value.tone || "note").toLowerCase();
  const toneMap = {
    note: "memo",
    tip: "tip",
    important: "note",
    warning: "warn",
    caution: "warn",
  };
  const tone = toneMap[raw] || "memo";
  const body = normalizeCalloutBody(value.content || []);
  return {
    _type: "calloutBlock",
    _key: context.keyGenerator(),
    tone,
    title: "",
    body,
  };
}

/** GFM アラートは blockquote 相当になるが、calloutBlock.body は normal のみ許可 */
function normalizeCalloutBody(blocks) {
  return blocks.map((b) => {
    if (b?._type === "block" && b.style === "blockquote") {
      return { ...b, style: "normal" };
    }
    return b;
  });
}

function convertMdSegment(text) {
  const t = preprocessAvatarSpeech(text || "").trim();
  if (!t) return [];

  const segments = splitFences(t);
  const blocks = [];
  for (const seg of segments) {
    if (seg.type === "md") {
      const chunk = seg.content.trim();
      if (chunk) blocks.push(...markdownToPortableText(chunk, markdownOptions));
    } else {
      blocks.push(...fenceToBlock(seg.kind, seg.inner));
    }
  }
  return blocks;
}

/**
 * 介護ナビ型: `![](avatar) 話し手` + 次段落 → :::speech フェンス
 */
function preprocessAvatarSpeech(md) {
  if (!md) return md;
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  const avatarSpeechRe = /^!\[[^\]]*\]\(([^)]+)\)\s+(.+)$/;
  let i = 0;

  while (i < lines.length) {
    const m = avatarSpeechRe.exec(lines[i]);
    if (m) {
      const url = m[1];
      const speaker = m[2].trim();
      i++;
      while (i < lines.length && !lines[i].trim()) i++;

      const speechLines = [];
      while (i < lines.length) {
        const line = lines[i];
        if (avatarSpeechRe.test(line)) break;
        if (/^#{1,6}\s/.test(line)) break;
        if (line.trim() === "目次") break;
        if (line.trim() === "" && i + 1 < lines.length) {
          const next = lines[i + 1];
          if (
            avatarSpeechRe.test(next) ||
            /^#{1,6}\s/.test(next) ||
            next.trim() === "目次"
          ) {
            break;
          }
        }
        speechLines.push(line);
        i++;
      }

      const text = speechLines.join("\n").trim();
      if (text) {
        out.push(
          ":::speech",
          `speaker: ${speaker}`,
          "side: right",
          "tone: sky",
          `avatarUrl: ${url}`,
          "",
          text,
          ":::",
          "",
        );
        continue;
      }
    }
    out.push(lines[i]);
    i++;
  }
  return out.join("\n");
}

/**
 * @portabletext/markdown が段落内インライン画像を作ると Sanity が解釈できない。
 * 吹き出し行・単独画像に正規化する。
 */
function normalizeInvalidPortableText(blocks) {
  const out = [];

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b?._type !== "block" || !Array.isArray(b.children)) {
      out.push(b);
      continue;
    }

    const imageChild = b.children.find((c) => c._type === "image");
    if (!imageChild) {
      out.push(b);
      continue;
    }

    const spanText = b.children
      .filter((c) => c._type === "span")
      .map((c) => c.text || "")
      .join("")
      .trim();

    const looksLikeSpeakerOnly =
      spanText.length > 0 && spanText.length <= 40 && !spanText.includes("\n");

    if (looksLikeSpeakerOnly || (!spanText && imageChild)) {
      let speechText = "";
      if (i + 1 < blocks.length && blocks[i + 1]._type === "block") {
        const next = blocks[i + 1];
        const nextHasInlineImage = (next.children || []).some((c) => c._type === "image");
        if (!nextHasInlineImage) {
          speechText = (next.children || [])
            .filter((c) => c._type === "span")
            .map((c) => c.text || "")
            .join("");
          i++;
        }
      }

      const balloon = {
        _type: "speechBalloon",
        _key: key(),
        speaker: spanText || "ヤノヒデ",
        text: speechText.trim() || spanText,
        side: "right",
        tone: "sky",
      };
      if (imageChild.asset?._ref) {
        balloon.avatar = {
          _type: "image",
          asset: imageChild.asset,
          alt: imageChild.alt || spanText || "話し手",
        };
      } else if (imageChild.src) {
        balloon.avatarUrl = String(imageChild.src);
      }
      out.push(balloon);
      continue;
    }

    out.push({
      _type: "image",
      _key: key(),
      asset: imageChild.asset,
      alt: imageChild.alt || "",
      ...(imageChild.caption ? { caption: imageChild.caption } : {}),
    });
    const textChildren = b.children.filter((c) => c._type === "span");
    if (textChildren.length) {
      out.push({ ...b, _key: b._key || key(), children: textChildren });
    }
  }

  return out;
}

/**
 * :::kind ... \n::: で囲まれたブロックをセグメント化（先頭一致も扱う）
 */
function splitFences(md) {
  const segments = [];
  const re = /:::([\w-]+)\s*\n([\s\S]*?)\r?\n:::/g;
  let last = 0;
  let m;
  while ((m = re.exec(md)) !== null) {
    if (m.index > last) {
      segments.push({ type: "md", content: md.slice(last, m.index) });
    }
    segments.push({ type: "fence", kind: m[1], inner: m[2] });
    last = m.index + m[0].length;
  }
  if (last < md.length) {
    segments.push({ type: "md", content: md.slice(last) });
  }
  return segments;
}

/**
 * 先頭の key: value 行を meta とし、空行で区切ってから本文。
 * メタ行が無い場合は全文を body。
 */
function parseMetaBody(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const meta = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      break;
    }
    const kv = /^([a-zA-Z0-9_]+)\s*:\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim();
    else {
      break;
    }
  }
  const body = lines.slice(i).join("\n").replace(/^\n+/, "").trimEnd();
  return { meta, body: body.trim() };
}

function fenceToBlock(kind, inner) {
  const k = kind.toLowerCase();

  if (k === "speech" || k === "speech-balloon") {
    const { meta, body } = parseMetaBody(inner);
    const block = {
      _type: "speechBalloon",
      _key: key(),
      speaker: meta.speaker || "話し手",
      text: body || inner.trim(),
      side: meta.side === "left" ? "left" : "right",
      tone: ["stone", "sand", "sky"].includes(meta.tone) ? meta.tone : "sky",
    };
    if (meta.avatarUrl) block.avatarUrl = meta.avatarUrl;
    return [block];
  }

  if (k === "titled-box" || k === "titledbox") {
    const { meta, body } = parseMetaBody(inner);
    const title = meta.title?.trim() || "枠タイトル";
    const bodyPt = convertMdSegment(body);
    return [
      {
        _type: "titledBoxBlock",
        _key: key(),
        title,
        body: bodyPt,
      },
    ];
  }

  return convertMdSegment(inner);
}

export async function mdToPortableText(markdown, options = {}) {
  const { client, baseDir = process.cwd() } = options;
  if (!markdown || !markdown.trim()) {
    return [];
  }

  const prepared = preprocessMarkdownBlockquotes(markdown);
  const segments = splitFences(prepared);
  let blocks = [];
  for (const seg of segments) {
    if (seg.type === "md") {
      blocks.push(...convertMdSegment(seg.content));
    } else {
      blocks.push(...fenceToBlock(seg.kind, seg.inner));
    }
  }

  if (client) {
    blocks = await resolvePortableImages(blocks, client, baseDir);
  }

  blocks = normalizeInvalidPortableText(blocks);
  blocks = flattenBlockquoteStyles(blocks);

  return blocks;
}

/** `> 引用` は Studio 編集画面で hydration エラーになるため通常段落にする */
function preprocessMarkdownBlockquotes(md) {
  return md.replace(/^>\s?(.*)$/gm, "$1");
}

function flattenBlockquoteStyles(node) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    return node.map((item) => flattenBlockquoteStyles(item));
  }
  if (typeof node !== "object") return node;

  if (node._type === "block" && node.style === "blockquote") {
    return { ...node, style: "normal" };
  }

  const out = {};
  for (const [k, v] of Object.entries(node)) {
    out[k] = flattenBlockquoteStyles(v);
  }
  return out;
}

/** オブジェクト木のどこにでも現れうる { _type, src } 画像を Sanity asset に差し替え */
async function resolvePortableImages(node, client, baseDir) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    const out = [];
    for (const item of node) {
      out.push(await resolvePortableImages(item, client, baseDir));
    }
    return out;
  }
  if (typeof node !== "object") return node;

  if (node._type === "image" && node.src && !node.asset?._ref) {
    try {
      const asset = await uploadImageAsset(client, String(node.src), baseDir);
      const next = {
        _type: "image",
        _key: node._key || key(),
        asset: { _type: "reference", _ref: asset._id },
        alt: String(node.alt || "").trim(),
      };
      if (node.title) next.caption = String(node.title);
      return next;
    } catch (e) {
      console.warn(`[sanity-publish] 画像アップロード失敗 (${node.src}): ${e.message}`);
      return imageFallbackBlock(node);
    }
  }

  const out = {};
  for (const [k, v] of Object.entries(node)) {
    out[k] = await resolvePortableImages(v, client, baseDir);
  }
  return out;
}

function imageFallbackBlock(node) {
  const text = `[画像: ${node.alt || "alt なし"}] ${node.src || ""}`;
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

export async function uploadImageAsset(client, src, baseDir) {
  let buffer;
  let filename = "image";
  if (/^https?:\/\//i.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    buffer = Buffer.from(await res.arrayBuffer());
    try {
      const u = new URL(src);
      filename = u.pathname.split("/").pop() || "image";
      filename = decodeURIComponent(filename).replace(/[^a-zA-Z0-9._-]/g, "_") || "image";
    } catch {
      /* ignore */
    }
  } else {
    const path = resolve(baseDir, src);
    if (!existsSync(path)) throw new Error(`ファイルなし: ${path}`);
    buffer = readFileSync(path);
    filename = src.split(/[/\\]/).pop() || "image";
  }
  return client.assets.upload("image", buffer, { filename });
}
