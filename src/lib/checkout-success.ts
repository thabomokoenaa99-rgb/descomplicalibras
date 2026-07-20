import type { MetritoLead } from "@/lib/metrito";
import type { PlanSlug } from "@/lib/hoopay";

export const CHECKOUT_SUCCESS_STORAGE_KEY = "descomplicalibras_checkout_success";

export type CheckoutSuccessPayload = {
  plan: PlanSlug;
  planName: string;
  amount: number;
  orderId?: string;
  paymentMethod: "pix" | "creditCard";
  email: string;
  lead?: MetritoLead;
};

export function persistCheckoutSuccess(payload: CheckoutSuccessPayload) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHECKOUT_SUCCESS_STORAGE_KEY, JSON.stringify(payload));
}

export function readCheckoutSuccess(): CheckoutSuccessPayload | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(CHECKOUT_SUCCESS_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CheckoutSuccessPayload;
  } catch {
    return null;
  }
}

export function getThankYouUrl(
  plan: PlanSlug,
  orderId?: string,
  paymentMethod?: "pix" | "creditCard",
) {
  const params = new URLSearchParams({ plan });
  if (orderId) params.set("order", orderId);
  if (paymentMethod) params.set("method", paymentMethod);
  return `/obrigado?${params.toString()}`;
}

export function purchaseTrackedKey(orderId: string) {
  return `descomplicalibras_purchase_tracked_${orderId}`;
}

export function hasPurchaseBeenTracked(orderId: string) {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(purchaseTrackedKey(orderId)) === "1";
}

export function markPurchaseTracked(orderId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(purchaseTrackedKey(orderId), "1");
}
