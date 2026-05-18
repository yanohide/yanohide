import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export function urlForImage(source: SanityImageSource) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()?.length
    ? process.env.NEXT_PUBLIC_SANITY_DATASET
    : "production";

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required for Sanity images");
  }

  return createImageUrlBuilder({ projectId, dataset: dataset ?? "production" }).image(source);
}
