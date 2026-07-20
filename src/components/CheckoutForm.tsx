"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearPixSession,
  persistPixSession,
  readPixSession,
} from "@/lib/checkout-pix-session";
import {
  getThankYouUrl,
  persistCheckoutSuccess,
  type CheckoutSuccessPayload,
} from "@/lib/checkout-success";
import {
  toMetritoLead,
  trackAddPaymentInfo,
  trackInitiateCheckout,
} from "@/lib/metrito";
import { isPaymentConfirmed } from "@/lib/payment-status";
import { firePurchaseOnce } from "@/lib/purchase-tracking";

type PixData = {
  method: "pix";
  orderUUID: string;
  pixPayload: string;
  pixQrCode: string | null;
  expireAt: string | null;
  amount: number;
};

type Props = {
  plan: "basico" | "completo";
  planName: string;
  amountLabel: string;
  amount: number;
  enableCreditCard?: boolean;
};

type Method = "pix" | "creditCard";

const UF_LIST = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const inputClass =
  "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 text-sm sm:text-base text-ink font-semibold placeholder:text-body/40 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-cta focus:border-cta transition";

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskCpf(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCard(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function maskExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 6);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function maskCep(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function CheckoutForm({
  plan,
  planName,
  amountLabel,
  amount,
  enableCreditCard = true,
}: Props) {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("pix");
  const [form, setForm] = useState({ name: "", email: "", phone: "", document: "" });
  const [card, setCard] = useState({
    number: "",
    holder: "",
    expirationDate: "",
    cvv: "",
    installments: 1,
  });
  const [address, setAddress] = useState({
    zipcode: "",
    street: "",
    streetNumber: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "SP",
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pix, setPix] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixChecking, setPixChecking] = useState(false);
  const [pixCheckNotice, setPixCheckNotice] = useState<string | null>(null);
  const [pixRestored, setPixRestored] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxInstallments = amount >= 50 ? 6 : amount >= 30 ? 3 : 1;

  const goToThankYou = useCallback(
    async (orderId: string | undefined, paymentMethod: Method) => {
      const payload: CheckoutSuccessPayload = {
        plan,
        planName,
        amount,
        orderId,
        paymentMethod,
        email: form.email,
        lead: toMetritoLead(form),
      };
      persistCheckoutSuccess(payload);
      clearPixSession();
      await firePurchaseOnce(payload);
      router.push(getThankYouUrl(plan, orderId, paymentMethod));
    },
    [plan, planName, amount, form, router],
  );

  const confirmPixPayment = useCallback(
    (orderId: string) => {
      if (pollRef.current) clearInterval(pollRef.current);
      goToThankYou(orderId, "pix");
    },
    [goToThankYou],
  );

  const checkPixPayment = useCallback(
    async (orderId: string, manual = false) => {
      if (manual) {
        setPixChecking(true);
        setPixCheckNotice(null);
      }

      try {
        const res = await fetch(`/api/checkout/status?order=${orderId}`, {
          cache: "no-store",
        });
        const data = (await res.json()) as { status?: string; error?: string };

        if (isPaymentConfirmed(data.status)) {
          confirmPixPayment(orderId);
          return true;
        }

        if (manual) {
          setPixCheckNotice(
            "Pagamento ainda não identificado. Se você acabou de pagar, aguarde alguns segundos e clique de novo.",
          );
        }
        return false;
      } catch {
        if (manual) {
          setPixCheckNotice("Não foi possível verificar agora. Tente novamente em instantes.");
        }
        return false;
      } finally {
        if (manual) setPixChecking(false);
      }
    },
    [confirmPixPayment],
  );

  useEffect(() => {
    if (!pix) return;

    void checkPixPayment(pix.orderUUID);

    pollRef.current = setInterval(() => {
      void checkPixPayment(pix.orderUUID);
    }, 4000);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void checkPixPayment(pix.orderUUID);
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pix, checkPixPayment]);

  useEffect(() => {
    const saved = readPixSession();
    if (!saved || saved.plan !== plan || pix) return;

    setForm(saved.form);
    setPix(saved.pix);
    setMethod("pix");
    setPixRestored(true);
    persistCheckoutSuccess({
      plan: saved.plan,
      planName: saved.planName,
      amount: saved.amount,
      orderId: saved.pix.orderUUID,
      paymentMethod: "pix",
      email: saved.form.email,
      lead: toMetritoLead(saved.form),
    });
  }, [plan, pix]);

  function savePixSession(pixData: PixData) {
    persistPixSession({
      plan,
      planName,
      amount,
      form,
      pix: pixData,
      savedAt: Date.now(),
    });
  }

  async function lookupCep(raw: string) {
    const cep = raw.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setAddress((a) => ({
          ...a,
          street: data.logradouro || a.street,
          neighborhood: data.bairro || a.neighborhood,
          city: data.localidade || a.city,
          state: data.uf || a.state,
        }));
      }
    } catch {
      // ignore
    } finally {
      setCepLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const lead = toMetritoLead(form);
    trackInitiateCheckout(plan, planName, amount, lead);

    try {
      const payload: Record<string, unknown> = {
        plan,
        method,
        ...form,
      };
      if (method === "creditCard") {
        payload.card = {
          ...card,
          installments: Number(card.installments) || 1,
        };
        payload.address = address;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao processar o pagamento. Tente novamente.");
        return;
      }

      if (data.method === "creditCard" || data.status === "paid") {
        trackAddPaymentInfo(plan, planName, amount, "creditCard", lead);
        goToThankYou(data.orderUUID as string | undefined, "creditCard");
        return;
      }

      trackAddPaymentInfo(plan, planName, amount, "pix", lead);
      persistCheckoutSuccess({
        plan,
        planName,
        amount,
        orderId: data.orderUUID as string,
        paymentMethod: "pix",
        email: form.email,
        lead,
      });
      const pixData = data as PixData;
      savePixSession(pixData);
      setPix(pixData);
    } catch {
      setError("Falha de conexão. Verifique sua internet e tente de novo.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPix() {
    if (!pix) return;
    await navigator.clipboard.writeText(pix.pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (pix) {
    return (
      <div className="bg-white rounded-[2rem] border border-zinc-200 p-6 sm:p-8 text-center shadow-[0_15px_40px_rgba(13,27,61,0.10)]">
        <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-1.5">
          Pague com PIX para liberar o acesso
        </h2>
        <p className="text-body text-sm mb-5">
          {planName} — <strong className="text-cta-darker">{amountLabel}</strong>
        </p>

        {pixRestored && (
          <p className="mb-4 text-xs sm:text-sm font-semibold text-ink bg-cta/10 border border-cta/25 rounded-xl px-4 py-3 leading-relaxed">
            Recuperamos seu PIX desta compra. Se você já pagou, clique em{" "}
            <strong>Já paguei — Verificar pagamento</strong>.
          </p>
        )}

        {pix.pixQrCode && (
          <div className="mx-auto w-52 h-52 sm:w-60 sm:h-60 rounded-2xl border border-zinc-200 p-2 mb-5 bg-white">
            <Image
              src={`data:image/png;base64,${pix.pixQrCode}`}
              alt="QR Code PIX para pagamento"
              width={240}
              height={240}
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <p className="text-xs text-body/60 mb-2 font-semibold">
          Ou copie o código e pague no app do seu banco:
        </p>
        <div className="bg-primary border border-zinc-200 rounded-xl p-3 text-[10px] sm:text-xs text-body break-all mb-4 max-h-24 overflow-y-auto text-left">
          {pix.pixPayload}
        </div>

        <button
          type="button"
          onClick={copyPix}
          className="btn-shine inline-flex items-center justify-center w-full bg-cta hover:bg-cta-dark text-ink font-extrabold rounded-full py-4 uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/40"
        >
          {copied ? "✅ Código copiado!" : "📋 Copiar código PIX"}
        </button>

        <button
          type="button"
          disabled={pixChecking}
          onClick={() => void checkPixPayment(pix.orderUUID, true)}
          className="mt-3 inline-flex items-center justify-center w-full bg-ink hover:bg-ink-soft disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-full py-4 text-sm sm:text-base uppercase tracking-wide transition-colors shadow-[0_10px_24px_rgba(13,27,61,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/30"
        >
          {pixChecking ? "Verificando pagamento…" : "✅ Já paguei — Verificar pagamento"}
        </button>

        {pixCheckNotice && (
          <p role="status" className="mt-3 text-xs sm:text-sm text-body font-semibold leading-relaxed bg-primary border border-zinc-200 rounded-xl px-4 py-3">
            {pixCheckNotice}
          </p>
        )}

        <a
          href={getThankYouUrl(plan, pix.orderUUID, "pix")}
          className="mt-4 inline-block text-sm font-bold text-cta-darker hover:text-ink underline"
        >
          Já paguei e a página não atualizou? Acesse sua confirmação aqui
        </a>

        <button
          type="button"
          onClick={() => {
            clearPixSession();
            setPix(null);
            setPixRestored(false);
            setError(null);
          }}
          className="mt-3 text-sm font-bold text-body/70 hover:text-ink underline"
        >
          Voltar e escolher outra forma
        </button>

        <p className="mt-5 text-xs text-body/60 flex items-center justify-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-cta animate-pulse" aria-hidden="true" />
          Aguardando confirmação do pagamento…
        </p>
        {pix.expireAt && (
          <p className="mt-1 text-[10px] text-body/50">Código válido até {pix.expireAt}</p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[2rem] border border-zinc-200 p-6 sm:p-8 shadow-[0_15px_40px_rgba(13,27,61,0.10)] flex flex-col gap-4"
    >
      <div
        className="grid grid-cols-2 gap-2 p-1.5 bg-primary rounded-2xl border border-zinc-200"
        role="tablist"
        aria-label="Forma de pagamento"
      >
        <button
          type="button"
          role="tab"
          aria-selected={method === "pix"}
          onClick={() => {
            setMethod("pix");
            setError(null);
          }}
          className={`rounded-xl py-3 text-sm font-extrabold transition-colors ${
            method === "pix"
              ? "bg-cta text-ink shadow-sm"
              : "text-body hover:text-ink"
          }`}
        >
          ⚡ PIX
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "creditCard"}
          disabled={!enableCreditCard}
          onClick={() => {
            if (!enableCreditCard) return;
            setMethod("creditCard");
            setError(null);
          }}
          className={`rounded-xl py-3 text-sm font-extrabold transition-colors ${
            method === "creditCard"
              ? "bg-cta text-ink shadow-sm"
              : enableCreditCard
                ? "text-body hover:text-ink"
                : "text-body/40 cursor-not-allowed"
          }`}
        >
          💳 Cartão
        </button>
      </div>

      <div>
        <label htmlFor="co-name" className="block text-xs font-black text-ink uppercase tracking-wide mb-1.5">
          Nome completo
        </label>
        <input
          id="co-name"
          name="nome"
          className={inputClass}
          placeholder="Seu nome"
          autoComplete="name"
          required
          minLength={3}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="co-email" className="block text-xs font-black text-ink uppercase tracking-wide mb-1.5">
          E-mail (onde você recebe o acesso)
        </label>
        <input
          id="co-email"
          name="email"
          type="email"
          className={inputClass}
          placeholder="voce@email.com"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="co-phone" className="block text-xs font-black text-ink uppercase tracking-wide mb-1.5">
            Celular com DDD
          </label>
          <input
            id="co-phone"
            name="telefone"
            type="tel"
            inputMode="numeric"
            className={inputClass}
            placeholder="(11) 91234-5678"
            autoComplete="tel-national"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor="co-cpf" className="block text-xs font-black text-ink uppercase tracking-wide mb-1.5">
            CPF
          </label>
          <input
            id="co-cpf"
            name="cpf"
            inputMode="numeric"
            className={inputClass}
            placeholder="000.000.000-00"
            required
            value={form.document}
            onChange={(e) => setForm({ ...form, document: maskCpf(e.target.value) })}
          />
        </div>
      </div>

      {method === "creditCard" && (
        <>
          <div className="border-t border-zinc-100 pt-4 mt-1">
            <p className="text-xs font-black text-ink uppercase tracking-wide mb-3">Dados do cartão</p>

            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="co-card-number" className="block text-xs font-bold text-body mb-1.5">
                  Número do cartão
                </label>
                <input
                  id="co-card-number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className={inputClass}
                  placeholder="0000 0000 0000 0000"
                  required
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: maskCard(e.target.value) })}
                />
              </div>

              <div>
                <label htmlFor="co-card-holder" className="block text-xs font-bold text-body mb-1.5">
                  Nome impresso no cartão
                </label>
                <input
                  id="co-card-holder"
                  autoComplete="cc-name"
                  className={inputClass}
                  placeholder="Como está no cartão"
                  required
                  value={card.holder}
                  onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="co-card-exp" className="block text-xs font-bold text-body mb-1.5">
                    Validade
                  </label>
                  <input
                    id="co-card-exp"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    className={inputClass}
                    placeholder="MM/AAAA"
                    required
                    value={card.expirationDate}
                    onChange={(e) => setCard({ ...card, expirationDate: maskExpiry(e.target.value) })}
                  />
                </div>
                <div>
                  <label htmlFor="co-card-cvv" className="block text-xs font-bold text-body mb-1.5">
                    CVV
                  </label>
                  <input
                    id="co-card-cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    className={inputClass}
                    placeholder="000"
                    required
                    maxLength={4}
                    value={card.cvv}
                    onChange={(e) =>
                      setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })
                    }
                  />
                </div>
              </div>

              {maxInstallments > 1 && (
                <div>
                  <label htmlFor="co-installments" className="block text-xs font-bold text-body mb-1.5">
                    Parcelas
                  </label>
                  <select
                    id="co-installments"
                    className={inputClass}
                    value={card.installments}
                    onChange={(e) => setCard({ ...card, installments: Number(e.target.value) })}
                  >
                    {Array.from({ length: maxInstallments }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}x de {formatBRL(amount / n)} {n === 1 ? "à vista" : "sem juros"}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-4">
            <p className="text-xs font-black text-ink uppercase tracking-wide mb-3">
              Endereço de cobrança
            </p>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                <div>
                  <label htmlFor="co-cep" className="block text-xs font-bold text-body mb-1.5">
                    CEP
                  </label>
                  <input
                    id="co-cep"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={inputClass}
                    placeholder="00000-000"
                    required
                    value={address.zipcode}
                    onChange={(e) => {
                      const zip = maskCep(e.target.value);
                      setAddress({ ...address, zipcode: zip });
                      if (zip.replace(/\D/g, "").length === 8) lookupCep(zip);
                    }}
                  />
                </div>
                {cepLoading && (
                  <span className="text-xs text-body/60 pb-3.5 whitespace-nowrap">Buscando…</span>
                )}
              </div>

              <div>
                <label htmlFor="co-street" className="block text-xs font-bold text-body mb-1.5">
                  Rua
                </label>
                <input
                  id="co-street"
                  autoComplete="address-line1"
                  className={inputClass}
                  placeholder="Rua / Avenida"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="co-number" className="block text-xs font-bold text-body mb-1.5">
                    Número
                  </label>
                  <input
                    id="co-number"
                    className={inputClass}
                    placeholder="123"
                    required
                    value={address.streetNumber}
                    onChange={(e) => setAddress({ ...address, streetNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="co-comp" className="block text-xs font-bold text-body mb-1.5">
                    Complemento
                  </label>
                  <input
                    id="co-comp"
                    className={inputClass}
                    placeholder="Apto / sala"
                    value={address.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="co-neigh" className="block text-xs font-bold text-body mb-1.5">
                  Bairro
                </label>
                <input
                  id="co-neigh"
                  className={inputClass}
                  placeholder="Bairro"
                  required
                  value={address.neighborhood}
                  onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-[1fr_5.5rem] gap-4">
                <div>
                  <label htmlFor="co-city" className="block text-xs font-bold text-body mb-1.5">
                    Cidade
                  </label>
                  <input
                    id="co-city"
                    autoComplete="address-level2"
                    className={inputClass}
                    placeholder="Cidade"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="co-uf" className="block text-xs font-bold text-body mb-1.5">
                    UF
                  </label>
                  <select
                    id="co-uf"
                    className={inputClass}
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  >
                    {UF_LIST.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {error && (
        <p
          role="alert"
          className="text-red-600 text-sm font-bold bg-red-50 border border-red-200 rounded-xl px-4 py-3"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-shine mt-1 inline-flex items-center justify-center w-full bg-cta hover:bg-cta-dark disabled:opacity-60 disabled:cursor-not-allowed text-ink font-extrabold rounded-full py-5 text-base sm:text-lg uppercase tracking-wide transition-colors shadow-[0_12px_30px_rgba(37,211,102,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/40"
      >
        {loading
          ? method === "pix"
            ? "Gerando PIX…"
            : "Processando cartão…"
          : method === "pix"
            ? `Gerar PIX de ${amountLabel}`
            : `Pagar ${amountLabel} no cartão`}
      </button>

      <p className="text-center text-[11px] text-body/60 leading-relaxed">
        <span aria-hidden="true">🔒</span> Pagamento seguro processado pela Hoopay.
        {method === "creditCard" && (
          <> Consulta de CEP via ViaCEP conforme nossa{" "}
            <a href="/privacidade" className="underline hover:text-ink">
              Política de Privacidade
            </a>.
          </>
        )}
      </p>
    </form>
  );
}
