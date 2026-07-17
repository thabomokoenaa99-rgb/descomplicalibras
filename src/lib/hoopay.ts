export const HOOPAY_API_URL = process.env.HOOPAY_API_URL ?? "https://api.pay.hoopay.com.br";

export const PLANS = {
  basico: {
    title: "Descomplica Libras — Plano Básico",
    amount: 17.9,
  },
  completo: {
    title: "Descomplica Libras — Plano Completo + 4 Bônus",
    amount: 27.9,
  },
} as const;

export type PlanSlug = keyof typeof PLANS;

export function isPlanSlug(value: string): value is PlanSlug {
  return value in PLANS;
}

export function hoopayAuthHeader() {
  const id = process.env.HOOPAY_CLIENT_ID;
  const secret = process.env.HOOPAY_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error("HOOPAY_CLIENT_ID / HOOPAY_CLIENT_SECRET não configurados");
  }
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}
