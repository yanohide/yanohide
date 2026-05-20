import { PortfolioSectionTitle } from "@/components/PortfolioSectionTitle";
import { ORDER_FLOW_STEPS } from "@/lib/portfolio-content";

function OrderFlowStepLabel({ number, heading }: { number: number; heading: string }) {
  return (
    <div className="text-center">
      <p className="portfolio-order-step-label-step" aria-label="STEP">
        <span>S</span>
        <span>T</span>
        <span>E</span>
        <span>P</span>
      </p>
      <p className="portfolio-order-step-label-number">{number}</p>
      <p className="portfolio-order-step-label-heading">{heading}</p>
    </div>
  );
}

export function PortfolioOrderFlow() {
  return (
    <div id="contact" className="portfolio-ai-panel mt-12 px-4 pt-10 pb-4 md:mt-16 md:px-6 md:pt-12 md:pb-6">
      <PortfolioSectionTitle script="ご依頼から発注までの流れ" />
      <ol className="mx-auto mt-6 max-w-md">
        {ORDER_FLOW_STEPS.map((item, index) => (
          <li key={item.number}>
            <div className="py-3 text-center md:py-4">
              <OrderFlowStepLabel number={item.number} heading={item.heading} />
              {"ctaLabel" in item && item.ctaLabel ? (
                <a href={item.ctaHref} className="portfolio-order-flow-cta mx-auto mt-4 text-sm font-bold text-white">
                  <span className="relative z-[1]">{item.ctaLabel}</span>
                </a>
              ) : (
                <>
                  {"detail" in item && item.detail ? (
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-700">{item.detail}</p>
                  ) : null}
                  {"note" in item && item.note ? (
                    <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                  ) : null}
                </>
              )}
            </div>
            {index < ORDER_FLOW_STEPS.length - 1 ? (
              <div className="portfolio-order-flow-connector" aria-hidden>
                <span className="portfolio-order-flow-connector-line" />
                <span className="portfolio-order-flow-connector-arrow">▼</span>
                <span className="portfolio-order-flow-connector-line" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
