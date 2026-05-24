"use client";

import { useEffect, useState } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const [mounted, setMounted] = useState(false);
  const isPresentationTool = useIsPresentationTool();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPresentationTool) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[9999] rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-slate-800"
    >
      プレビューを終了
    </a>
  );
}
