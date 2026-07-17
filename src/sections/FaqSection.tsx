import { CtaButton } from "@/components/CtaButton";
import { FaqAccordion } from "@/components/FaqAccordion";
import { copy } from "@/lib/content";

export function FaqSection() {
  return (
    <section className="bg-primary py-10 sm:py-14 px-4" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="text-[22px] sm:text-3xl md:text-4xl font-extrabold text-center text-ink mb-10 sm:mb-12 text-balance leading-snug"
        >
          {copy.faq.title}
        </h2>

        <FaqAccordion />

        <div className="mt-12 text-center w-full relative z-20">
          <CtaButton href="#oferta" className="sm:py-6">
            {copy.faq.cta}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
