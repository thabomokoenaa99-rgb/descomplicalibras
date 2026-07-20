import { buildPixelProductPayload } from "@/lib/pixel-commerce";
import {
  trackMetaAddPaymentInfo,
  trackMetaInitiateCheckout,
  trackMetaPurchase,
  trackMetaViewContent,
} from "@/lib/meta-pixel";

type MetritoLead = {
  name?: string;
  email?: string;
  phone?: string;
  doc?: string;
};

export type { MetritoLead };

type MetritoEventData = Record<string, unknown>;

type MetritoTrackPayload = {
  event?: {
    data?: MetritoEventData;
    facebook?: {
      name: string;
      data?: MetritoEventData;
      trackCustom?: boolean;
      actionSource?: string;
    };
  };
  lead?: MetritoLead;
};

type MtrtFn = ((eventName: string, payload?: MetritoTrackPayload) => void) & {
  track?: (eventName: string, payload?: MetritoTrackPayload) => void;
  queue?: unknown[];
};

declare global {
  interface Window {
    mtrt?: MtrtFn;
    metrito?: MtrtFn;
  }
}

function getMtrt(): MtrtFn | undefined {
  if (typeof window === "undefined") return undefined;
  return window.mtrt ?? window.metrito;
}

function trackMetrito(
  eventName: string,
  {
    data = {},
    lead,
    facebookName = eventName,
    trackCustom = false,
  }: {
    data?: MetritoEventData;
    lead?: MetritoLead;
    facebookName?: string;
    trackCustom?: boolean;
  } = {},
) {
  const mtrt = getMtrt();
  if (!mtrt) return;

  const payload: MetritoTrackPayload = {
    event: {
      data,
      facebook: {
        name: facebookName,
        data,
        trackCustom,
        actionSource: "website",
      },
    },
    ...(lead ? { lead } : {}),
  };

  if (typeof mtrt.track === "function") {
    mtrt.track(eventName, payload);
    return;
  }

  mtrt(eventName, payload);
}

export function trackViewContent(plan: string, planName: string, _value?: number) {
  trackMetaViewContent(plan, planName);
  trackMetrito("ViewContent", {
    data: buildPixelProductPayload(plan, planName),
    facebookName: "ViewContent",
  });
}

export function trackInitiateCheckout(
  plan: string,
  planName: string,
  _value?: number,
  lead?: MetritoLead,
) {
  trackMetaInitiateCheckout(plan, planName);
  trackMetrito("InitiateCheckout", {
    data: buildPixelProductPayload(plan, planName),
    lead,
    facebookName: "InitiateCheckout",
  });
}

export function trackAddPaymentInfo(
  plan: string,
  planName: string,
  _value?: number,
  paymentMethod?: "pix" | "creditCard",
  lead?: MetritoLead,
) {
  const method = paymentMethod ?? "pix";
  trackMetaAddPaymentInfo(plan, planName, method);
  trackMetrito("AddPaymentInfo", {
    data: {
      ...buildPixelProductPayload(plan, planName),
      payment_method: method,
    },
    lead,
    facebookName: "AddPaymentInfo",
  });
}

export function trackPurchase(
  plan: string,
  planName: string,
  _value: number,
  {
    orderId,
    paymentMethod,
    lead,
  }: {
    orderId?: string;
    paymentMethod: "pix" | "creditCard";
    lead?: MetritoLead;
  },
) {
  trackMetaPurchase(plan, planName, orderId, paymentMethod);
  trackMetrito("Purchase", {
    data: {
      ...buildPixelProductPayload(plan, planName),
      order_id: orderId,
      payment_method: paymentMethod,
    },
    lead,
    facebookName: "Purchase",
  });
}

export function toMetritoLead(form: {
  name: string;
  email: string;
  phone: string;
  document: string;
}): MetritoLead {
  return {
    name: form.name.trim() || undefined,
    email: form.email.trim() || undefined,
    phone: form.phone.replace(/\D/g, "") || undefined,
    doc: form.document.replace(/\D/g, "") || undefined,
  };
}
