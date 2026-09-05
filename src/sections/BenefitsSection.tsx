import { CtaButton } from "@/components/CtaButton";
import { copy } from "@/lib/content";

export function BenefitsSection() {
  return (
    <section className="below-fold bg-secondary text-ink py-12 sm:py-16 px-4 overflow-x-clip relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-center mb-10 sm:mb-14 text-balance leading-snug max-w-4xl mx-auto">
          {copy.benefits.titleBefore}{" "}
          <span className="mark">{copy.benefits.titleHighlight}</span> {copy.benefits.titleAfter}
        </h2>

        <div className="max-w-3xl mx-auto">
          {copy.benefits.items.map((item, i) => (
            <article
              key={item.num}
              className={`mb-5 sm:mb-6 bg-white border border-cta/20 p-6 sm:p-8 rounded-[2rem] flex items-center gap-5 sm:gap-6 shadow-[0_15px_40px_rgba(13,27,61,0.10)] relative overflow-hidden ${
                i === copy.benefits.items.length - 1 ? "mb-2" : ""
              }`}
            >
              <div className="bg-cta/12 p-3 rounded-2xl shrink-0 relative z-10">
                <span className="text-5xl sm:text-6xl leading-none" aria-hidden="true">
                  {item.emoji}
                </span>
              </div>
              <div className="relative z-10">
                <span className="text-cta-darker font-black text-xs tracking-widest">{item.num}</span>
                <h3 className="text-lg sm:text-xl font-extrabold text-ink leading-snug mt-0.5">{item.title}</h3>
                <p className="text-body text-sm sm:text-base mt-1.5 leading-relaxed">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-14 sm:mt-16 w-full px-2 relative z-20">
          <CtaButton href="#oferta">{copy.benefits.cta}</CtaButton>
        </div>
      </div>
    </section>
  );
}
