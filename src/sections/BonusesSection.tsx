import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { copy } from "@/lib/content";

export function BonusesSection() {
  return (
    <section className="bg-secondary py-12 sm:py-16 px-4 overflow-hidden relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 bg-cta text-ink px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-sm sm:text-lg font-black tracking-widest uppercase border-2 border-cta-dark/40 shadow-[0_10px_28px_rgba(37,211,102,0.40)]">
            <span aria-hidden="true">✨</span> {copy.bonuses.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ink mt-6 tracking-tight text-balance leading-snug">
            {copy.bonuses.titleBefore}{" "}
            <span className="mark">{copy.bonuses.titleHighlight}</span>
            {copy.bonuses.titleAfter}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {copy.bonuses.items.map((bonus) => (
            <article
              key={bonus.id}
              className="bg-gradient-to-br from-ink to-ink-deep rounded-[2rem] overflow-hidden border border-white/5 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(13,27,61,0.35)] hover:border-cta/40 transition-all duration-500 group"
            >
              <div className="w-full aspect-[4/3] bg-white flex items-center justify-center p-3 sm:p-4 overflow-hidden relative">
                <Image
                  src={bonus.image}
                  alt={`Bônus ${bonus.id}: ${bonus.title}`}
                  width={480}
                  height={360}
                  loading="lazy"
                  sizes="(max-width: 768px) 90vw, 28rem"
                  className="w-full h-full object-contain drop-shadow-[0_10px_22px_rgba(13,27,61,0.20)] group-hover:scale-[1.03] transition-all duration-500"
                />
              </div>
              <div className="pt-6 pb-8 px-6 sm:px-10 flex-1 flex flex-col">
                <div className="text-white font-black text-xs tracking-wider uppercase mb-2 flex items-center gap-2">
                  <span className="bg-white/15 px-2.5 py-1 rounded-md">BÔNUS {bonus.id}</span>
                  <span className="bg-cta text-ink px-2.5 py-1 rounded-md font-black tracking-widest shadow-sm">
                    {copy.bonuses.free}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug text-balance">
                  {bonus.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed text-balance">{bonus.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center w-full relative z-20">
          <CtaButton href="#oferta">{copy.bonuses.cta}</CtaButton>
        </div>
      </div>
    </section>
  );
}
