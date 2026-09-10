"use client";

export function ProfileMangaEmbed() {
  return (
    <div className="portfolio-profile-manga mx-auto mb-8 w-full max-w-[480px] md:mb-10">
      <p className="portfolio-profile-manga-title">
        <span className="portfolio-profile-manga-title__main">自己紹介マンガ</span>
        <span className="portfolio-profile-manga-title__note">枠内を縦にスクロールできます</span>
      </p>
      <iframe
        src="/profile-manga"
        title="自己紹介マンガ"
        className="portfolio-profile-manga-embed"
        onLoad={(event) => {
          event.currentTarget.contentWindow?.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
