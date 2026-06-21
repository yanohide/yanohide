import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { NextResponse } from "next/server";

import { client, sanityConfigured } from "@/sanity/lib/client";
import { getSanityReadToken } from "@/sanity/lib/preview";

export const runtime = "edge";

const draftModeHandlers = sanityConfigured
  ? defineEnableDraftMode({
      client: client.withConfig({
        token: getSanityReadToken(),
      }),
    })
  : null;

export async function GET(request: Request) {
  if (!draftModeHandlers) {
    return NextResponse.json(
      {
        message:
          "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID (and related vars) in the build environment.",
      },
      { status: 503 },
    );
  }

  return draftModeHandlers.GET(request);
}
