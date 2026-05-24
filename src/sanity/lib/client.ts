import { createClient, type ClientPerspective, type QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { getSanityReadToken, getStudioUrl } from "@/sanity/lib/preview";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityConfigured = typeof projectId === "string" && projectId.trim().length > 0;

function createSanityClient() {
  return createClient({
    projectId: projectId!.trim(),
    dataset: dataset?.trim()?.length ? dataset : "production",
    apiVersion: "2024-01-01",
    useCdn: true,
    stega: {
      studioUrl: getStudioUrl(),
    },
  });
}

export const client = sanityConfigured ? createSanityClient() : null!;

function getServerClient() {
  return client;
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  fallback,
  stega,
  perspective,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  fallback: T;
  stega?: boolean;
  perspective?: ClientPerspective;
}): Promise<T> {
  if (!sanityConfigured) {
    return fallback;
  }

  // generateStaticParams など HTTP コンテキスト外では draftMode() を呼べない
  let isDraftMode = false;
  if (perspective === undefined) {
    try {
      isDraftMode = (await draftMode()).isEnabled;
    } catch {
      isDraftMode = false;
    }
  }

  const token = getSanityReadToken();
  const perspectiveToUse: ClientPerspective =
    perspective ?? (isDraftMode ? "previewDrafts" : "published");
  const stegaEnabled = stega ?? isDraftMode;
  const useCdn = perspectiveToUse === "published" && !isDraftMode;

  return getServerClient()
    .withConfig({
      useCdn,
      stega: stegaEnabled ? { studioUrl: getStudioUrl() } : false,
    })
    .fetch<T>(query, params, {
      token: isDraftMode ? token : undefined,
      perspective: perspectiveToUse,
      next: {
        revalidate: isDraftMode ? 0 : revalidate,
      },
    });
}
