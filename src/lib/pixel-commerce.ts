import { isPlanSlug, PLANS } from "@/lib/hoopay";

/** Vendas em reais — não usar USD do exemplo da documentação da Meta. */
export const PIXEL_CURRENCY = "BRL" as const;

export function getPixelPlanValue(plan: string): number {
  if (!isPlanSlug(plan)) return 0;
  return PLANS[plan].amount;
}

export function buildPixelProductPayload(plan: string, planName: string) {
  const value = getPixelPlanValue(plan);

  return {
    content_name: planName,
    content_ids: [plan],
    content_type: "product",
    value: Number(value.toFixed(2)),
    currency: PIXEL_CURRENCY,
    num_items: 1,
  };
}
