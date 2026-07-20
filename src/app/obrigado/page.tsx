import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ThankYouPage } from "@/components/ThankYouPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Obrigado! | ${SITE.name}`,
  description: "Pagamento confirmado. Seu acesso ao Descomplica Libras será enviado por e-mail.",
  robots: { index: false, follow: false },
};

function ThankYouFallback() {
  return (
    <div className="bg-white rounded-[2rem] border border-zinc-200 p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-cta/30 border-t-cta animate-spin" />
      <p className="text-body font-semibold">Carregando…</p>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-primary px-4 py-8 sm:py-12">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-cta-darker font-bold text-sm mb-6 hover:underline"
        >
          ← Voltar ao início
        </Link>

        <Suspense fallback={<ThankYouFallback />}>
          <ThankYouPage />
        </Suspense>
      </div>
    </main>
  );
}
