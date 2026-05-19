import { markdownToPortableText as markdownToBlocks } from "@portabletext/markdown";

export async function mdToPortableText(markdown) {
  if (!markdown || markdown.trim() === "") {
    return [];
  }
  return markdownToBlocks(markdown);
}
