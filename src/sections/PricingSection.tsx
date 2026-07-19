import Image from "next/image";
import { PlanCheckoutButton } from "@/components/PlanCheckoutButton";
import { copy } from "@/lib/content";
import { PLANS } from "@/lib/hoopay";
import { SITE } from "@/lib/site";

export function PricingSection() {
  return (
    <section id="oferta" className="bg-gradient-to-br from-ink-soft via-ink to-ink-deep py-12 sm:py-16 px-4 relative overflow-hidden scroll-mt-16">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cta/10 blur-[80px] sm:blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-center mb-10 sm:mb-14 text-balance leading-snug">
          {copy.pricing.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-stretch max-w-lg md:max-w-4xl mx-auto px-1 sm:px-0">
          {/* Basic */}
          <div className="bg-white border border-zinc-200 p-5 sm:p-10 rounded-[2.5rem] md:rounded-r-none md:border-r-0 relative flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-body/60 mb-4 sm:mb-5 text-center leading-snug tracking-widest uppercase">
                {copy.pricing.basic.name}
              </h3>
              <div className="w-full mb-5 sm:mb-6 flex items-center justify-center pointer-events-none px-1">
                <Image
                  src="/images/mockup/produto-principal.webp"
                  alt="Mockup do Plano Básico — +300 Mapas Mentais Visuais"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  sizes="(max-width: 640px) 58vw, 14rem"
                  className="w-[min(100%,14rem)] sm:max-w-[15rem] h-auto object-contain drop-shadow-[0_8px_20px_rgba(13,27,61,0.10)]"
                />
              </div>
              <ul className="space-y-4 mb-8 text-sm font-semibold text-body">
                {copy.pricing.basic.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 leading-tight border-b border-zinc-100 pb-3">
                    <span className="text-cta-darker text-lg shrink-0" aria-hidden="true">
                      ✅
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 relative z-20">
              <div className="mb-6 text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-ink mt-1">
                  {copy.pricing.basic.priceLabel} R$ {SITE.prices.basic}
                </span>
              </div>
              <PlanCheckoutButton
                href={SITE.checkout.basic}
                plan="basico"
                planName={copy.pricing.basic.name}
                value={PLANS.basico.amount}
                className="w-full text-base sm:text-xl shadow-[0_8px_20px_rgba(37,211,102,0.3)]"
              >
                {copy.pricing.basic.cta}
              </PlanCheckoutButton>
              <div className="mt-6 flex flex-col items-center justify-center gap-2.5">
                <p className="text-red-600 text-base sm:text-lg font-black text-balance text-center">
                  {copy.pricing.basic.nudge}
                </p>
                <span className="text-3xl animate-bounce shrink-0" aria-hidden="true">
                  ⬇️
                </span>
              </div>
            </div>
          </div>

          {/* Complete */}
          <div className="bg-white border-[3px] border-cta p-6 sm:p-10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(13,27,61,0.20)] md:scale-[1.04] relative z-10 flex flex-col justify-between group">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cta text-ink px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest whitespace-nowrap shadow-[0_8px_22px_rgba(37,211,102,0.5)] flex items-center gap-1.5 border-2 border-cta-dark z-20">
              <span aria-hidden="true">⭐</span> {copy.pricing.complete.badge}
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl md:text-[32px] font-black text-ink mt-6 sm:mt-8 mb-5 text-center leading-snug tracking-wider uppercase">
                {copy.pricing.complete.name}
              </h3>

              <div className="w-full flex items-center justify-center mb-6 sm:mb-7 mt-2 pointer-events-none px-0 sm:px-1">
                <Image
                  src="/images/mockup/hero-bundle.webp"
                  alt="Mockup do Plano Completo — biblioteca +300 mapas mentais e 4 bônus"
                  width={1024}
                  height={731}
                  loading="lazy"
                  sizes="(max-width: 640px) 94vw, 24rem"
                  className="w-full max-w-[min(100%,22rem)] sm:max-w-sm h-auto object-contain drop-shadow-[0_15px_30px_rgba(13,27,61,0.14)] group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="flex justify-center mb-7 w-full relative z-10 px-2">
                <div className="bg-cta/10 border border-cta/25 text-ink rounded-2xl py-3 px-6 text-xs sm:text-sm font-black shadow-sm text-center leading-snug whitespace-pre-line">
                  {copy.pricing.complete.social}
                </div>
              </div>

              <ul className="space-y-3 mb-6 text-[13px] sm:text-[15px] font-semibold text-ink">
                {copy.pricing.complete.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 leading-tight border-b border-zinc-100 pb-2">
                    <span className="text-cta-darker shrink-0" aria-hidden="true">
                      ✅
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="border border-cta/25 rounded-2xl p-5 mb-6 bg-cta/5 shadow-inner">
                <h4 className="text-ink font-black text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                  <span aria-hidden="true">🎁</span> {copy.pricing.complete.bonusesTitle}
                </h4>
                <ul className="space-y-2.5 text-[13px] sm:text-sm font-bold text-body">
                  {copy.pricing.complete.bonuses.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="shrink-0" aria-hidden="true">
                        🎁
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 relative z-20">
              <div className="mb-5 text-center flex flex-col items-center">
                <span className="block text-body/50 line-through text-xs sm:text-sm">
                  {copy.pricing.complete.from} R$ {SITE.prices.completeOriginal}
                </span>
                <span className="block text-xl sm:text-2xl font-bold text-ink leading-tight">
                  {copy.pricing.complete.only}
                </span>
                <span className="block text-4xl sm:text-5xl font-black text-cta-darker leading-none mt-1">
                  R$ {SITE.prices.complete}
                </span>
                <span className="inline-block mt-3 bg-secondary text-ink text-xs sm:text-sm font-black px-4 py-1.5 rounded-full border border-cta/25">
                  ✅ {copy.pricing.complete.save} R$ {SITE.prices.savings}
                </span>
              </div>
              <PlanCheckoutButton
                href={SITE.checkout.complete}
                plan="completo"
                planName={copy.pricing.complete.name}
                value={PLANS.completo.amount}
                className="w-full text-base sm:text-xl"
              >
                {copy.pricing.complete.cta}
              </PlanCheckoutButton>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 sm:mt-14">
          <div className="bg-white/95 border-[3px] border-cta rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-[0_15px_40px_rgba(13,27,61,0.20)]">
            <Image
              src="/images/ui/garantia-7d.webp"
              alt="Selo de garantia de 7 dias"
              width={128}
              height={128}
              loading="lazy"
              className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_8px_16px_rgba(13,27,61,0.25)]"
            />
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-1.5">{copy.pricing.guarantee.title}</h3>
              <p className="text-body text-sm sm:text-base leading-relaxed">{copy.pricing.guarantee.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
