import type { CheckoutSuccessPayload } from "@/lib/checkout-success";
import {
  hasPurchaseBeenTracked,
  markPurchaseTracked,
} from "@/lib/checkout-success";
import { trackPurchase } from "@/lib/metrito";
import { waitForMetaPixel } from "@/lib/meta-pixel";

function purchaseDedupeKey(payload: CheckoutSuccessPayload) {
  return payload.orderId ?? `session_${payload.plan}_${payload.email || "guest"}`;
}

export async function firePurchaseOnce(payload: CheckoutSuccessPayload): Promise<boolean> {
  const key = purchaseDedupeKey(payload);
  if (hasPurchaseBeenTracked(key)) return false;

  await waitForMetaPixel();

  trackPurchase(payload.plan, payload.planName, payload.amount, {
    orderId: payload.orderId,
    paymentMethod: payload.paymentMethod,
    lead: payload.lead,
  });

  markPurchaseTracked(key);
  return true;
}
