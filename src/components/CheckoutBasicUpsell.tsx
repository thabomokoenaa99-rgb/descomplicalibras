import Link from "next/link";
import { copy } from "@/lib/content";
import { SITE } from "@/lib/site";

export function CheckoutBasicUpsell() {
  const completeFeatures = copy.pricing.complete.features;
  const completeBonuses = copy.pricing.complete.bonuses;

  return (
    <section
      className="mb-6 bg-white rounded-[2rem] border-[3px] border-cta p-5 sm:p-6 shadow-[0_15px_40px_rgba(13,27,61,0.12)]"
      aria-labelledby="checkout-upsell-title"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-cta text-ink text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
          ⭐ Oferta recomendada
        </span>
      </div>

      <h2
        id="checkout-upsell-title"
        className="text-lg sm:text-xl font-extrabold text-ink leading-snug mb-1"
      >
        No Plano Completo você recebe:
      </h2>
      <p className="text-sm text-body/70 font-semibold mb-4">
        Tudo do Plano Básico + conteúdo extra e 4 bônus exclusivos
      </p>

      <ul className="space-y-2 mb-4 text-xs sm:text-sm font-semibold text-ink">
        {completeFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2 leading-tight">
            <span className="text-cta-darker shrink-0" aria-hidden="true">
              ✅
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="border border-cta/25 rounded-2xl p-4 mb-5 bg-cta/5">
        <h3 className="text-ink font-black text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span aria-hidden="true">🎁</span> {copy.pricing.complete.bonusesTitle}
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm font-bold text-body">
          {completeBonuses.map((bonus) => (
            <li key={bonus} className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">
                🎁
              </span>
              <span>{bonus}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <p className="text-body/60 line-through text-sm mb-0.5">
          De R$ {SITE.prices.completeOriginal}
        </p>
        <p className="text-2xl font-black text-cta-darker mb-4">
          Por apenas R$ {SITE.prices.complete}
        </p>
        <Link
          href={SITE.checkout.complete}
          className="btn-shine inline-flex items-center justify-center w-full bg-cta hover:bg-cta-dark text-ink font-extrabold rounded-full py-4 text-sm sm:text-base uppercase tracking-wide transition-colors shadow-[0_12px_30px_rgba(37,211,102,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/40"
        >
          Quero o Plano Completo
        </Link>
        <p className="mt-2 text-[11px] text-body/60 font-semibold">
          ✅ Você economiza R$ {SITE.prices.savings}
        </p>
      </div>
    </section>
  );
}
