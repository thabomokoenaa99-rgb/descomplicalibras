import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { copy } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="bg-white text-ink pt-6 pb-10 sm:pt-8 sm:pb-14 px-4 overflow-hidden relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cta/10 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-cta text-ink px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-sm font-extrabold whitespace-nowrap tracking-wide sm:tracking-wider border border-cta-dark/25 shadow-sm">
            <span aria-hidden="true">🔒</span> {copy.badges.secure}
          </div>
          <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-cta text-ink px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-sm font-extrabold whitespace-nowrap tracking-wide sm:tracking-wider border border-cta-dark/25 shadow-sm">
            <span className="flex text-yellow-400 text-[11px] sm:text-base leading-none" aria-label="Avaliação 4,9 de 5">
              ⭐⭐⭐⭐⭐
            </span>
            {copy.badges.rating}
          </div>
        </div>

        <h1 className="text-[27px] sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12] mb-3 sm:mb-4 text-balance text-ink px-1">
          <span className="mark">{copy.hero.highlight}</span>{" "}
          {copy.hero.rest} <span className="text-cta-darker">{copy.hero.accent}</span> {copy.hero.suffix}
        </h1>

        <div className="relative w-full max-w-[22rem] sm:max-w-4xl mx-auto mt-2 sm:mt-4">
          <div className="relative max-w-[22rem] sm:max-w-3xl mx-auto">
            <div
              className="absolute inset-x-6 top-4 h-1/2 bg-gradient-to-tr from-cta/25 to-cta/10 blur-[70px] sm:blur-[110px] rounded-full -z-10 pointer-events-none"
              aria-hidden="true"
            />
            <Image
              src="/images/mockup/hero-bundle.webp"
              alt="Descomplica Libras — pacote completo com +300 mapas mentais visuais e bônus"
              width={1024}
              height={731}
              priority
              sizes="(max-width: 640px) 92vw, 42rem"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col items-center text-center px-3 mt-4 sm:mt-6">
            <p className="text-base sm:text-xl text-body mb-5 sm:mb-7 max-w-[24rem] sm:max-w-4xl font-medium text-pretty leading-relaxed">
              {copy.hero.subtitle}
            </p>
            <div className="flex flex-col items-center gap-3 w-full">
              <CtaButton href="#oferta" ariaLabel="Ir para planos e garantir acesso">
                {copy.hero.cta}
              </CtaButton>
              <p className="text-ink text-xs sm:text-sm flex items-center gap-1.5 font-extrabold whitespace-nowrap mt-1">
                <span className="text-lg" aria-hidden="true">
                  🛡️
                </span>{" "}
                {copy.hero.guarantee}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 w-full">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-ink/45">
            {copy.hero.contextsLabel}
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-9 text-ink font-bold text-sm sm:text-base list-none p-0 m-0">
            {copy.hero.contexts.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <span aria-hidden="true">{c.emoji}</span> {c.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
