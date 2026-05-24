import { defineQuery } from "next-sanity";

/** Studio 追加前のデータ互換：`status` 未設定は公開として扱う */
const published = `(!defined(status) || status == "published")`;

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && ${published}] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    eyecatch,
    heroImage { asset, alt },
    "categories": categories[]->{ _id, title, slug },
    "tags": tags[]->{ _id, title, slug }
  }`
);

export const SEARCH_POSTS_QUERY = defineQuery(
  `*[_type == "post" && ${published}] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "searchText": pt::text(body),
    "categories": categories[]->{ _id, title, slug },
    "tags": tags[]->{ _id, title, slug }
  }`
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug && ${published}][0]{
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    status,
    excerpt,
    eyecatch,
    heroImage { asset, alt },
    body,
    "categories": categories[]->{ _id, title, slug },
    "tags": tags[]->{ _id, title, slug },
    seo {
      title,
      description,
      noIndex,
      image { asset, alt }
    }
  }`
);

export const POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && ${published} && defined(slug.current)] {
    "slug": slug.current
  }`
);

/** Draft Mode プレビュー用：`status` に関係なく slug で取得 */
export const POST_PREVIEW_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    status,
    excerpt,
    eyecatch,
    heroImage { asset, alt },
    body,
    "categories": categories[]->{ _id, title, slug },
    "tags": tags[]->{ _id, title, slug },
    seo {
      title,
      description,
      noIndex,
      image { asset, alt }
    }
  }`
);
