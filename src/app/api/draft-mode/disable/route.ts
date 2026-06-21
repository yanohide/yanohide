import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { getPreviewOrigin } from "@/sanity/lib/preview";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", getPreviewOrigin()));
}
