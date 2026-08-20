import type { Metadata } from "next";
import Link from "next/link";

import { PortfolioContactForm } from "@/components/PortfolioContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "ご質問やご依頼など、お気軽にお問い合わせください。",
};

export default function ContactPage() {
  return (
    <div className="portfolio-contact-page mx-auto w-full max-w-3xl px-4 py-8 sm:px-5 md:px-6 md:py-12">
      <p className="mb-6 text-center">
        <Link href="/#contact" className="portfolio-contact-page__back text-sm text-sky-700 hover:text-blue-800">
          ← トップのご依頼フローへ戻る
        </Link>
      </p>
      <div className="portfolio-ai-panel px-4 py-8 md:px-8 md:py-10">
        <PortfolioContactForm layout="page" />
      </div>
    </div>
  );
}
