import { isPlanSlug, PLANS } from "@/lib/hoopay";

/** Conta Meta em USD — valores convertidos de BRL para o pixel. */
export const PIXEL_CURRENCY = "USD" as const;

const DEFAULT_USD_BRL_RATE = 5.5;

export function getUsdBrlRate(): number {
  const raw = process.env.NEXT_PUBLIC_PIXEL_USD_BRL_RATE;
  const parsed = raw ? Number(raw.replace(",", ".")) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_USD_BRL_RATE;
}

export function getPixelPlanValueBrl(plan: string): number {
  if (!isPlanSlug(plan)) return 0;
  return PLANS[plan].amount;
}

/** Valor enviado ao Meta Pixel / Metrito (USD). */
export function getPixelPlanValue(plan: string): number {
  const brl = getPixelPlanValueBrl(plan);
  if (brl <= 0) return 0;
  return Number((brl / getUsdBrlRate()).toFixed(2));
}

export function buildPixelProductPayload(plan: string, planName: string) {
  const value = getPixelPlanValue(plan);

  return {
    content_name: planName,
    content_ids: [plan],
    content_type: "product",
    value,
    currency: PIXEL_CURRENCY,
    num_items: 1,
  };
}
