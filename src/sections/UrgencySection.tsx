import { CountdownTimer } from "@/components/CountdownTimer";
import { CtaButton } from "@/components/CtaButton";
import { copy } from "@/lib/content";

export function UrgencySection() {
  return (
    <section className="bg-gradient-to-br from-ink-soft via-ink to-ink-deep text-white text-center pt-8 pb-12 sm:pt-10 sm:pb-16 px-4 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-cta/10 blur-[80px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <CountdownTimer label={copy.urgencyBlock.timerLabel} />

        <h2 className="text-2xl sm:text-4xl md:text-[44px] font-extrabold mb-10 sm:mb-12 mt-9 sm:mt-10 leading-tight tracking-tight text-balance px-2">
          {copy.urgencyBlock.titleBefore}{" "}
          <span className="text-cta">{copy.urgencyBlock.titleHighlight}</span>{" "}
          {copy.urgencyBlock.titleAfter}
        </h2>

        <CtaButton
          href="#oferta"
          className="text-lg sm:text-[26px] sm:px-16 sm:py-6 shadow-[0_12px_35px_rgba(37,211,102,0.45)] border-white/10"
        >
          {copy.urgencyBlock.cta}
        </CtaButton>
      </div>
    </section>
  );
}
