"use client";

import { type MouseEvent, type ReactNode } from "react";
import { CtaButton } from "@/components/CtaButton";
import { trackMetaInitiateCheckout } from "@/lib/meta-pixel";

type Props = {
  href: string;
  plan: string;
  planName: string;
  className?: string;
  children: ReactNode;
};

const CHECKOUT_TRACKING_PARAMS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "src",
  "sck",
  "vtid",
] as const;

function checkoutUrlWithTracking(href: string) {
  const destination = new URL(href, window.location.href);
  const currentParams = new URLSearchParams(window.location.search);

  for (const param of CHECKOUT_TRACKING_PARAMS) {
    const value = currentParams.get(param);
    if (value && !destination.searchParams.has(param)) {
      destination.searchParams.set(param, value);
    }
  }

  return destination.toString();
}

export function PlanCheckoutButton({ href, plan, planName, className, children }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    event.preventDefault();
    trackMetaInitiateCheckout(plan, planName);
    window.setTimeout(() => {
      window.location.href = checkoutUrlWithTracking(href);
    }, 150);
  }

  return (
    <CtaButton href={href} className={className} onClick={handleClick}>
      {children}
    </CtaButton>
  );
}
