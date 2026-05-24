import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const presentationResolve: PresentationPluginOptions["resolve"] = {
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => {
        const slug = doc?.slug;
        if (!slug) return { locations: [] };
        return {
          locations: [
            {
              title: doc?.title || "記事プレビュー",
              href: `/posts/${slug}`,
            },
            {
              title: "ブログ一覧",
              href: "/blog",
            },
          ],
        };
      },
    }),
  },
};
