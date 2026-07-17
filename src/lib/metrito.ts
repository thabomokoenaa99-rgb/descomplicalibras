type MetritoLead = {
  name?: string;
  email?: string;
  phone?: string;
  doc?: string;
};

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

export function trackMetrito(
  eventName: string,
  {
    data = {},
    lead,
    facebookName = eventName,
  }: {
    data?: MetritoEventData;
    lead?: MetritoLead;
    facebookName?: string;
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
        trackCustom: false,
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

function productPayload(plan: string, planName: string, value: number) {
  return {
    content_name: planName,
    content_ids: [plan],
    content_type: "product",
    value,
    currency: "BRL",
    num_items: 1,
  };
}

export function trackViewContent(plan: string, planName: string, value: number) {
  trackMetrito("ViewContent", {
    data: productPayload(plan, planName, value),
    facebookName: "ViewContent",
  });
}

export function trackInitiateCheckout(
  plan: string,
  planName: string,
  value: number,
  lead?: MetritoLead,
) {
  trackMetrito("InitiateCheckout", {
    data: productPayload(plan, planName, value),
    lead,
    facebookName: "InitiateCheckout",
  });
}

export function trackAddPaymentInfo(
  plan: string,
  planName: string,
  value: number,
  paymentMethod: "pix" | "creditCard",
  lead?: MetritoLead,
) {
  trackMetrito("AddPaymentInfo", {
    data: {
      ...productPayload(plan, planName, value),
      payment_method: paymentMethod,
    },
    lead,
    facebookName: "AddPaymentInfo",
  });
}

export function trackPurchase(
  plan: string,
  planName: string,
  value: number,
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
  trackMetrito("Purchase", {
    data: {
      ...productPayload(plan, planName, value),
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
