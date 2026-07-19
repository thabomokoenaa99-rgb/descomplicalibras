import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { copy } from "@/lib/content";

export function ProductSection() {
  return (
    <section className="relative bg-gradient-to-br from-ink-soft via-ink to-ink-deep text-white py-12 sm:py-16 px-4 overflow-hidden">
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-cta/10 blur-[120px] rounded-full pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-20 w-[460px] h-[460px] bg-cta/10 blur-[130px] rounded-full pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-center mb-10 sm:mb-14 text-pretty leading-snug">
            {copy.product.titleBefore}{" "}
            <span className="text-cta">{copy.product.brand}</span>
            {copy.product.titleAfter}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="w-full flex items-center justify-center mb-6 lg:mb-0 relative select-none">
            <div className="absolute inset-0 bg-cta/8 blur-[80px] rounded-full scale-110 pointer-events-none" aria-hidden="true" />
            <Image
              src="/images/mockup/produto-principal.webp"
              alt="Visual do Descomplica Libras — +300 mapas mentais visuais"
              width={1024}
              height={1024}
              loading="lazy"
              sizes="(max-width: 1024px) 75vw, 28rem"
              className="w-full max-w-[18rem] sm:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-[0_20px_40px_rgba(13,27,61,0.18)]"
            />
          </div>

          <div className="relative w-full px-2 sm:px-0">
            <div className="bg-white border border-cta/20 p-6 sm:p-10 pt-12 sm:pt-14 rounded-[2.5rem] relative shadow-[0_20px_50px_rgba(0,0,0,0.30)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ink text-white px-6 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-black shadow-md flex items-center gap-1.5">
                <span aria-hidden="true">⚡</span> {copy.product.badge}
              </div>

              <h3 className="text-2xl sm:text-[32px] leading-tight font-black mb-2 text-center text-ink text-balance tracking-tight">
                {copy.product.heading}
              </h3>
              <p className="text-body/70 text-sm sm:text-base text-center mb-7 text-balance font-semibold">
                {copy.product.intro}
              </p>

              <ul className="flex flex-col text-sm sm:text-[15px] font-bold text-ink">
                {copy.product.features.map((f, i) => (
                  <li
                    key={f}
                    className={`flex items-center gap-4 py-3 border-t border-cta/12 ${
                      i === copy.product.features.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="text-cta-darker text-lg shrink-0" aria-hidden="true">
                      ✅
                    </span>
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 text-center text-sm text-body/70 font-bold">{copy.product.more}</div>
            </div>

            <div className="mt-10 text-center w-full relative z-20">
              <CtaButton href="#oferta" className="w-full">
                {copy.product.cta}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
