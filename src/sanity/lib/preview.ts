/** Sanity Presentation / Draft Mode 用のフロントエンド origin */
export function getPreviewOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function getStudioUrl(): string {
  return `${getPreviewOrigin()}/studio`;
}

export function getSanityReadToken(): string | undefined {
  return (
    process.env.SANITY_API_READ_TOKEN?.trim() ||
    process.env.SANITY_API_TOKEN?.trim() ||
    undefined
  );
}
