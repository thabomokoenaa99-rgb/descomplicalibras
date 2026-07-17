import { NextRequest, NextResponse } from "next/server";
import { HOOPAY_API_URL, PLANS, hoopayAuthHeader, isPlanSlug } from "@/lib/hoopay";
import { isValidCpf, onlyDigits } from "@/lib/security/cpf";
import {
  extractGatewayError,
  publicGatewayError,
  publicPaymentError,
} from "@/lib/security/errors";
import { enforceCheckoutRateLimit } from "@/lib/security/rate-limit";
import { safeLog } from "@/lib/security/log";
import { buildWebhookCallbackUrl } from "@/lib/security/webhook";

type PaymentMethod = "pix" | "creditCard";

type CheckoutBody = {
  plan: string;
  method: PaymentMethod;
  name: string;
  email: string;
  phone: string;
  document: string;
  card?: {
    number: string;
    holder: string;
    expirationDate: string;
    cvv: string;
    installments: number;
  };
  address?: {
    zipcode: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    complement?: string;
    city: string;
    state: string;
  };
};

function creditCardEnabled(): boolean {
  return process.env.ENABLE_CREDIT_CARD !== "false";
}

export async function POST(req: NextRequest) {
  const rateLimited = await enforceCheckoutRateLimit(req);
  if (rateLimited) return rateLimited;

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const { plan, method, name, email, phone, document, card, address } = body;

  if (!plan || !isPlanSlug(plan)) {
    return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
  }
  if (method !== "pix" && method !== "creditCard") {
    return NextResponse.json({ error: "Forma de pagamento inválida" }, { status: 400 });
  }
  if (method === "creditCard" && !creditCardEnabled()) {
    return NextResponse.json({ error: "Pagamento com cartão indisponível no momento." }, { status: 503 });
  }

  const cleanPhone = onlyDigits(phone);
  const cleanDoc = onlyDigits(document);

  if (!name?.trim() || name.trim().length < 3) {
    return NextResponse.json({ error: "Informe seu nome completo" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido" }, { status: 400 });
  }
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return NextResponse.json({ error: "Informe um celular válido com DDD" }, { status: 400 });
  }
  if (!isValidCpf(cleanDoc)) {
    return NextResponse.json({ error: "Informe um CPF válido" }, { status: 400 });
  }

  if (method === "creditCard") {
    if (!card) {
      return NextResponse.json({ error: "Dados do cartão incompletos" }, { status: 400 });
    }
    const cardNumber = onlyDigits(card.number);
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return NextResponse.json({ error: "Número do cartão inválido" }, { status: 400 });
    }
    if (!card.holder?.trim() || card.holder.trim().length < 3) {
      return NextResponse.json({ error: "Informe o nome impresso no cartão" }, { status: 400 });
    }
    if (!/^\d{2}\/\d{4}$/.test(card.expirationDate ?? "")) {
      return NextResponse.json({ error: "Validade inválida. Use MM/AAAA" }, { status: 400 });
    }
    if (!/^\d{3,4}$/.test(onlyDigits(card.cvv))) {
      return NextResponse.json({ error: "CVV inválido" }, { status: 400 });
    }
    const installments = Number(card.installments) || 1;
    if (installments < 1 || installments > 12) {
      return NextResponse.json({ error: "Parcelas inválidas" }, { status: 400 });
    }
    if (!address) {
      return NextResponse.json({ error: "Informe o endereço de cobrança" }, { status: 400 });
    }
    const zip = onlyDigits(address.zipcode);
    if (zip.length !== 8) {
      return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
    }
    if (!address.street?.trim() || !address.streetNumber?.trim() || !address.neighborhood?.trim()) {
      return NextResponse.json({ error: "Preencha rua, número e bairro" }, { status: 400 });
    }
    if (!address.city?.trim() || !/^[A-Z]{2}$/.test(address.state ?? "")) {
      return NextResponse.json({ error: "Informe cidade e UF" }, { status: 400 });
    }
  }

  const product = PLANS[plan];
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    req.nextUrl.origin ??
    "http://localhost:3001"
  ).replace(/\/$/, "");
  const callbackURL = buildWebhookCallbackUrl(siteUrl);

  const payments =
    method === "pix"
      ? [{ type: "pix", amount: product.amount }]
      : [
          {
            type: "creditCard",
            number: onlyDigits(card!.number),
            holder: card!.holder.trim(),
            expirationDate: card!.expirationDate,
            cvv: onlyDigits(card!.cvv),
            installments: Number(card!.installments) || 1,
            amount: product.amount,
          },
        ];

  const payload: Record<string, unknown> = {
    amount: product.amount,
    customer: {
      email,
      name: name.trim(),
      phone: cleanPhone,
      document: cleanDoc,
    },
    products: [
      {
        title: product.title,
        amount: product.amount,
        quantity: 1,
      },
    ],
    payments,
    data: {
      ip,
      url: siteUrl,
      src: "landing",
      callbackURL,
    },
  };

  if (method === "creditCard" && address) {
    payload.address = {
      zipcode: onlyDigits(address.zipcode),
      street: address.street.trim(),
      streetNumber: address.streetNumber.trim(),
      neighborhood: address.neighborhood.trim(),
      complement: address.complement?.trim() || "N/A",
      city: address.city.trim(),
      state: address.state.toUpperCase(),
    };
  }

  try {
    const res = await fetch(`${HOOPAY_API_URL}/charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: hoopayAuthHeader(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || data?.payment?.hasErrors) {
      const internal = extractGatewayError(data);
      safeLog("[checkout] gateway error", { plan, method, internal });
      return NextResponse.json({ error: publicPaymentError() }, { status: 502 });
    }

    if (method === "pix") {
      const charge = data?.payment?.charges?.[0];
      if (!charge?.pixPayload) {
        return NextResponse.json({ error: publicPaymentError() }, { status: 502 });
      }
      return NextResponse.json({
        method: "pix",
        orderUUID: data.orderUUID,
        pixPayload: charge.pixPayload,
        pixQrCode: charge.pixQrCode ?? null,
        expireAt: charge.expireAt ?? null,
        amount: product.amount,
        plan,
      });
    }

    const status = data?.payment?.status ?? data?.payment?.charges?.[0]?.status;
    if (status !== "paid" && status !== "approved") {
      return NextResponse.json({ error: publicPaymentError() }, { status: 402 });
    }

    return NextResponse.json({
      method: "creditCard",
      orderUUID: data.orderUUID,
      status: "paid",
      amount: product.amount,
      plan,
    });
  } catch (err) {
    safeLog("[checkout] communication error", {
      plan,
      method,
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: publicGatewayError() }, { status: 502 });
  }
}
