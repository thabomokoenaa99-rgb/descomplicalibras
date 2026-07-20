export const META_PIXEL_ID = "1701264531180748";

export type MetaEventData = Record<string, string | number | string[] | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __metaPixels?: Record<string, boolean>;
    __metaPageView?: boolean;
  }
}

function productPayload(plan: string, planName: string, value: number): MetaEventData {
  return {
    content_name: planName,
    content_ids: [plan],
    content_type: "product",
    value,
    currency: "BRL",
    num_items: 1,
  };
}

export function ensureMetaPixel(trackPageView = false) {
  if (typeof window === "undefined") return false;

  if (typeof window.fbq !== "function") {
    return false;
  }

  window.__metaPixels ??= {};
  if (!window.__metaPixels[META_PIXEL_ID]) {
    window.fbq("init", META_PIXEL_ID);
    window.__metaPixels[META_PIXEL_ID] = true;
  }

  if (trackPageView && !window.__metaPageView) {
    window.fbq("track", "PageView");
    window.__metaPageView = true;
  }

  return true;
}

export function waitForMetaPixel(maxMs = 6000): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  return new Promise((resolve) => {
    const started = Date.now();

    const tick = () => {
      if (ensureMetaPixel()) {
        resolve(true);
        return;
      }
      if (Date.now() - started >= maxMs) {
        resolve(false);
        return;
      }
      window.setTimeout(tick, 150);
    };

    tick();
  });
}

function callFbq(
  eventName: string,
  data: MetaEventData = {},
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  ensureMetaPixel();
  const fbq = window.fbq;
  if (typeof fbq !== "function") return;

  if (eventId) {
    fbq("track", eventName, data, { eventID: eventId });
    return;
  }

  fbq("track", eventName, data);
}

export function trackMetaViewContent(plan: string, planName: string, value: number) {
  callFbq("ViewContent", productPayload(plan, planName, value));
}

export function trackMetaInitiateCheckout(
  plan: string,
  planName: string,
  value: number,
) {
  callFbq("InitiateCheckout", productPayload(plan, planName, value));
}

export function trackMetaAddPaymentInfo(
  plan: string,
  planName: string,
  value: number,
  paymentMethod: "pix" | "creditCard",
) {
  callFbq("AddPaymentInfo", {
    ...productPayload(plan, planName, value),
    payment_method: paymentMethod,
  });
}

export function trackMetaPurchase(
  plan: string,
  planName: string,
  value: number,
  orderId?: string,
  paymentMethod?: "pix" | "creditCard",
) {
  callFbq(
    "Purchase",
    {
      ...productPayload(plan, planName, value),
      ...(orderId ? { order_id: orderId } : {}),
      ...(paymentMethod ? { payment_method: paymentMethod } : {}),
    },
    orderId,
  );
}

export function trackMetaLead() {
  callFbq("Lead");
}
