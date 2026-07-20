"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getThankYouUrl, readCheckoutSuccess } from "@/lib/checkout-success";
import { readPixSession } from "@/lib/checkout-pix-session";
import type { PlanSlug } from "@/lib/hoopay";
import { isPaymentConfirmed } from "@/lib/payment-status";

type Props = {
  plan: PlanSlug;
};

export function CheckoutOrderRecovery({ plan }: Props) {
  const [checking, setChecking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const pixSession = readPixSession();
    const checkout = readCheckoutSuccess();
    const id =
      (pixSession?.plan === plan ? pixSession.pix.orderUUID : null) ??
      (checkout?.plan === plan ? checkout.orderId : null) ??
      null;
    setOrderId(id ?? null);
  }, [plan]);

  if (!orderId) return null;

  async function handleVerify() {
    setChecking(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/checkout/status?order=${orderId}`, { cache: "no-store" });
      const data = (await res.json()) as { status?: string };
      if (isPaymentConfirmed(data.status)) {
        window.location.href = getThankYouUrl(plan, orderId!, "pix");
        return;
      }
      setNotice(
        "Pagamento ainda não confirmado. Se você já pagou, aguarde 1–2 minutos e tente de novo.",
      );
    } catch {
      setNotice("Não foi possível verificar agora. Tente novamente em instantes.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="mb-6 rounded-[1.5rem] border-2 border-cta bg-cta/10 p-4 sm:p-5 shadow-sm">
      <p className="text-sm font-extrabold text-ink mb-1">Você já iniciou uma compra neste plano</p>
      <p className="text-xs sm:text-sm text-body leading-relaxed mb-4">
        Seu pedido <strong className="text-ink">não se perde</strong> ao atualizar a página. Se você
        já pagou o PIX, verifique abaixo ou acesse a confirmação.
      </p>
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          disabled={checking}
          onClick={() => void handleVerify()}
          className="btn-shine inline-flex items-center justify-center w-full bg-ink hover:bg-ink-soft disabled:opacity-60 text-white font-extrabold rounded-full py-3.5 text-sm uppercase tracking-wide transition-colors"
        >
          {checking ? "Verificando pagamento…" : "✅ Já paguei — Verificar agora"}
        </button>
        <Link
          href={getThankYouUrl(plan, orderId, "pix")}
          className="inline-flex items-center justify-center w-full bg-white border border-zinc-200 text-ink font-bold rounded-full py-3 text-sm hover:bg-primary transition-colors"
        >
          Ir para página de confirmação
        </Link>
      </div>
      {notice && (
        <p role="status" className="mt-3 text-xs text-body font-semibold leading-relaxed">
          {notice}
        </p>
      )}
    </div>
  );
}
