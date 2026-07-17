import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PLANS, isPlanSlug } from "@/lib/hoopay";
import { SITE } from "@/lib/site";

const PLAN_UI = {
  basico: {
    name: "Plano Básico",
    amountLabel: `R$ ${SITE.prices.basic}`,
    image: "/images/mockup/produto-principal.webp",
    bullets: ["Biblioteca Digital com +100 Mapas Mentais Visuais de Libras"],
  },
  completo: {
    name: "Plano Completo + 4 Bônus",
    amountLabel: `R$ ${SITE.prices.complete}`,
    image: "/images/mockup/hero-bundle.webp",
    bullets: [
      "Biblioteca Digital com +100 Mapas Mentais Visuais",
      "4 bônus exclusivos inclusos",
      "Acesso imediato e vitalício",
    ],
  },
} as const;

export const metadata: Metadata = {
  title: `Checkout | ${SITE.name}`,
  description: "Finalize sua compra com PIX ou cartão e receba o acesso imediatamente.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(PLANS).map((plan) => ({ plan }));
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan } = await params;
  if (!isPlanSlug(plan)) notFound();

  const ui = PLAN_UI[plan];

  return (
    <main className="min-h-screen bg-primary px-4 py-8 sm:py-12">
      <div className="max-w-lg mx-auto">
        <Link
          href="/#oferta"
          className="inline-flex items-center gap-1.5 text-cta-darker font-bold text-sm mb-6 hover:underline"
        >
          ← Voltar para os planos
        </Link>

        <div className="bg-white rounded-[2rem] border border-zinc-200 p-5 sm:p-6 mb-6 flex items-center gap-4 shadow-sm">
          <Image
            src={ui.image}
            alt={`Mockup do ${ui.name}`}
            width={96}
            height={110}
            className="w-20 h-auto object-contain shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold text-ink leading-snug">{ui.name}</h1>
            <ul className="mt-1.5 space-y-0.5">
              {ui.bullets.map((b) => (
                <li key={b} className="text-xs text-body flex items-center gap-1.5">
                  <span className="text-cta-darker shrink-0" aria-hidden="true">✅</span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xl font-black text-cta-darker">{ui.amountLabel}</p>
          </div>
        </div>

        <CheckoutForm
          plan={plan}
          planName={ui.name}
          amountLabel={ui.amountLabel}
          amount={PLANS[plan].amount}
          enableCreditCard={process.env.ENABLE_CREDIT_CARD !== "false"}
        />

        <p className="mt-6 text-center text-xs text-body/60 flex items-center justify-center gap-2 flex-wrap">
          <span>🛡️ Garantia de 7 dias</span>
          <span aria-hidden="true">•</span>
          <span>⚡ Acesso imediato</span>
          <span aria-hidden="true">•</span>
          <span>🔒 Compra segura</span>
        </p>
      </div>
    </main>
  );
}
