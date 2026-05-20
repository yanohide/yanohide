import type { ReactNode } from "react";

export function PortfolioSectionTitle({
  script,
  subtitle,
  subtitleMatchScript = false,
  className = "",
}: {
  script: string;
  subtitle: ReactNode;
  /** サブタイトルを「プロフィール」見出しと同じ文字サイズにする */
  subtitleMatchScript?: boolean;
  className?: string;
}) {
  const chars = Array.from(script);
  const first = chars[0] ?? "";
  const rest = chars.slice(1).join("");
  const scriptTitleSize = subtitleMatchScript ? "text-xl md:text-2xl" : "text-3xl md:text-4xl";

  return (
    <header className={`text-center ${className}`}>
      <p
        className={`portfolio-script-title flex items-start justify-center gap-0 leading-none ${scriptTitleSize}`}
      >
        <span className="text-blue-700">{first}</span>
        {rest ? <span className="text-slate-900">{rest}</span> : null}
      </p>
      <h2
        className={
          subtitleMatchScript
            ? `portfolio-script-title mt-10 leading-snug font-bold text-blue-900 md:mt-12 ${scriptTitleSize}`
            : "mt-8 text-lg font-bold text-blue-900 md:mt-10 md:text-xl"
        }
      >
        {subtitle}
      </h2>
    </header>
  );
}
