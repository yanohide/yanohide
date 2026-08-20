import type { ReactNode } from "react";

export function PortfolioSectionTitle({
  script,
  subtitle,
  subtitleMatchScript = false,
  scriptSizeClass,
  className = "",
}: {
  script?: string;
  subtitle?: ReactNode;
  /** サブタイトルを「プロフィール」見出しと同じ文字サイズにする */
  subtitleMatchScript?: boolean;
  /** スクリプト見出し（プ ロフィール等）の文字サイズを上書き */
  scriptSizeClass?: string;
  className?: string;
}) {
  const chars = script ? Array.from(script) : [];
  const first = chars[0] ?? "";
  const rest = chars.slice(1).join("");
  const scriptSize = scriptSizeClass ?? "text-xl sm:text-2xl md:text-3xl";
  const subtitleSize = "text-lg md:text-xl";

  return (
    <header className={`portfolio-section-title text-center ${className}`}>
      <div className="portfolio-section-title-rule" aria-hidden />
      {script ? (
        <p
          className={`portfolio-script-title flex items-start justify-center gap-0 leading-none ${scriptSize}`}
        >
          <span className="text-blue-700">{first}</span>
          {rest ? <span className="text-slate-900">{rest}</span> : null}
        </p>
      ) : null}
      {subtitle ? (
        <h2
          className={
            subtitleMatchScript
              ? `portfolio-script-title mt-10 leading-snug font-bold text-blue-900 md:mt-12 ${subtitleSize}`
              : script
                ? "mt-8 text-lg font-bold text-blue-900 md:mt-10 md:text-xl"
                : "text-lg font-bold text-blue-900 md:text-xl"
          }
        >
          {subtitle}
        </h2>
      ) : null}
    </header>
  );
}
