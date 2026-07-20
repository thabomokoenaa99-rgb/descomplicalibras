import type { PlanSlug } from "@/lib/hoopay";

export const CHECKOUT_PIX_SESSION_KEY = "descomplicalibras_pix_session";

export type StoredPixData = {
  method: "pix";
  orderUUID: string;
  pixPayload: string;
  pixQrCode: string | null;
  expireAt: string | null;
  amount: number;
};

export type CheckoutPixSession = {
  plan: PlanSlug;
  planName: string;
  amount: number;
  form: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  pix: StoredPixData;
  savedAt: number;
};

export function persistPixSession(session: CheckoutPixSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHECKOUT_PIX_SESSION_KEY, JSON.stringify(session));
}

export function readPixSession(): CheckoutPixSession | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(CHECKOUT_PIX_SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CheckoutPixSession;
  } catch {
    return null;
  }
}

export function clearPixSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CHECKOUT_PIX_SESSION_KEY);
}
