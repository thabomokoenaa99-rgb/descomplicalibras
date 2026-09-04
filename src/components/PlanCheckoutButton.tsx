"use client";

import { type MouseEvent, type ReactNode } from "react";
import { CtaButton } from "@/components/CtaButton";
import { trackMetaInitiateCheckout } from "@/lib/meta-pixel";
import { urlWithCurrentSearchParams } from "@/lib/url-parameters";

type Props = {
  href: string;
  plan: string;
  planName: string;
  className?: string;
  children: ReactNode;
};

export function PlanCheckoutButton({ href, plan, planName, className, children }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    event.preventDefault();
    trackMetaInitiateCheckout(plan, planName);
    window.setTimeout(() => {
      window.location.href = urlWithCurrentSearchParams(href);
    }, 150);
  }

  return (
    <CtaButton href={href} className={className} onClick={handleClick}>
      {children}
    </CtaButton>
  );
}
