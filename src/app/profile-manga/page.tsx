import Image from "next/image";
import type { Metadata } from "next";

import { PROFILE_MANGA_PAGES } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "自己紹介マンガ",
  robots: { index: false, follow: false },
};

export default function ProfileMangaPage() {
  return (
    <main className="min-h-full bg-slate-100">
      <ol className="mx-auto flex max-w-[480px] flex-col">
        {PROFILE_MANGA_PAGES.map((page, index) => (
          <li key={page.src} className="m-0 p-0">
            <Image
              src={page.src}
              alt={page.alt}
              width={720}
              height={1080}
              className="h-auto w-full"
              priority={index === 0}
              unoptimized
            />
          </li>
        ))}
      </ol>
    </main>
  );
}
