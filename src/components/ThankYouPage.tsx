"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  readCheckoutSuccess,
  type CheckoutSuccessPayload,
} from "@/lib/checkout-success";
import { isPlanSlug, PLANS } from "@/lib/hoopay";
import { firePurchaseOnce } from "@/lib/purchase-tracking";
import { SITE } from "@/lib/site";

type ViewState = {
  payload: CheckoutSuccessPayload;
};

function parseMethod(value: string | null): "pix" | "creditCard" | null {
  if (value === "pix" || value === "creditCard") return value;
  return null;
}

async function verifyOrderPaid(orderId: string, attempts = 5): Promise<boolean> {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(`/api/checkout/status?order=${orderId}`);
      const data = (await res.json()) as { status?: string };
      if (data.status === "paid" || data.status === "approved") return true;
    } catch {
      // retry
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  return false;
}

export function ThankYouPage() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<ViewState | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  const planParam = searchParams.get("plan");
  const orderParam = searchParams.get("order");
  const methodParam = parseMethod(searchParams.get("method"));

  const planSlug = useMemo(
    () => (planParam && isPlanSlug(planParam) ? planParam : null),
    [planParam],
  );

  useEffect(() => {
    let cancelled = false;

    async function finalize() {
      if (!planSlug) {
        if (!cancelled) {
          setInvalid(true);
          setLoading(false);
        }
        return;
      }

      const stored = readCheckoutSuccess();
      const orderId = orderParam ?? stored?.orderId;
      const paymentMethod = methodParam ?? stored?.paymentMethod ?? "pix";

      const payload: CheckoutSuccessPayload = {
        plan: planSlug,
        planName: stored?.planName ?? PLANS[planSlug].title,
        amount: stored?.amount ?? PLANS[planSlug].amount,
        orderId,
        paymentMethod,
        email: stored?.email ?? "",
        lead: stored?.lead,
      };

      // Veio do checkout: pagamento já foi confirmado antes do redirect.
      if (stored?.plan === planSlug) {
        await firePurchaseOnce(payload);
        if (!cancelled) {
          setView({ payload });
          setLoading(false);
        }
        return;
      }

      // Link direto com order id — consulta API com retry.
      if (orderId) {
        const paid = await verifyOrderPaid(orderId);
        if (paid) {
          await firePurchaseOnce(payload);
          if (!cancelled) {
            setView({ payload });
            setLoading(false);
          }
          return;
        }
      }

      if (!cancelled) {
        setInvalid(true);
        setLoading(false);
      }
    }

    finalize();

    return () => {
      cancelled = true;
    };
  }, [planSlug, orderParam, methodParam]);

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] border border-zinc-200 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-cta/30 border-t-cta animate-spin" />
        <p className="text-body font-semibold">Confirmando seu pagamento…</p>
      </div>
    );
  }

  if (invalid || !view) {
    return (
      <div className="bg-white rounded-[2rem] border border-zinc-200 p-8 text-center shadow-sm">
        <h1 className="text-xl font-extrabold text-ink mb-2">Não encontramos esta compra</h1>
        <p className="text-body text-sm leading-relaxed mb-6">
          Se você acabou de pagar, aguarde alguns instantes e atualize a página. Caso o problema
          persista, confira seu e-mail ou fale com o suporte.
        </p>
        <Link
          href="/"
          className="btn-shine inline-flex items-center justify-center bg-cta hover:bg-cta-dark text-ink font-extrabold rounded-full px-8 py-3.5 uppercase tracking-wide transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    );
  }

  const { payload } = view;

  return (
    <>
      <div className="bg-white rounded-[2rem] border-[3px] border-cta p-7 sm:p-10 text-center shadow-[0_15px_40px_rgba(13,27,61,0.15)]">
        <span className="text-6xl block mb-4" aria-hidden="true">
          ✅
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">Pagamento confirmado!</h1>
        <p className="text-body text-sm sm:text-base leading-relaxed mb-6">
          Obrigado por garantir o <strong>{payload.planName}</strong>.
          {payload.email ? (
            <>
              {" "}
              Seu acesso será enviado para <strong>{payload.email}</strong> em instantes.
            </>
          ) : (
            <> Seu acesso será enviado por e-mail em instantes.</>
          )}
        </p>

        <ul className="text-left text-sm font-semibold text-ink space-y-3 mb-8 max-w-md mx-auto">
          <li className="flex items-start gap-3">
            <span className="text-cta-darker shrink-0" aria-hidden="true">
              📧
            </span>
            <span>Confira sua caixa de entrada e também a pasta de spam/lixo eletrônico.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cta-darker shrink-0" aria-hidden="true">
              ⚡
            </span>
            <span>O acesso é imediato após a confirmação do pagamento.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cta-darker shrink-0" aria-hidden="true">
              🛡️
            </span>
            <span>Você tem 7 dias de garantia incondicional, conforme nossa política.</span>
          </li>
        </ul>

        <Link
          href="/"
          className="btn-shine inline-flex items-center justify-center w-full sm:w-auto bg-cta hover:bg-cta-dark text-ink font-extrabold rounded-full px-10 py-4 uppercase tracking-wide transition-colors shadow-[0_12px_30px_rgba(37,211,102,0.35)]"
        >
          Voltar ao site
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-body/60 flex items-center justify-center gap-2 flex-wrap">
        <span>🔒 Compra segura</span>
        <span aria-hidden="true">•</span>
        <span>{SITE.name}</span>
      </p>
    </>
  );
}
