import { createClient, type QueryParams } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityConfigured = typeof projectId === "string" && projectId.trim().length > 0;

function getServerClient() {
  return createClient({
    projectId: projectId!.trim(),
    dataset: dataset?.trim()?.length ? dataset : "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  fallback,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  fallback: T;
}): Promise<T> {
  if (!sanityConfigured) {
    return fallback;
  }

  return getServerClient().fetch<T>(query, params, {
    next: { revalidate },
  });
}
