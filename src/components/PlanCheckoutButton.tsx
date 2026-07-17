"use client";

import { type MouseEvent, type ReactNode } from "react";
import { CtaButton } from "@/components/CtaButton";
import { trackInitiateCheckout } from "@/lib/metrito";

type Props = {
  href: string;
  plan: string;
  planName: string;
  value: number;
  className?: string;
  children: ReactNode;
};

export function PlanCheckoutButton({ href, plan, planName, value, className, children }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    event.preventDefault();
    trackInitiateCheckout(plan, planName, value);
    window.setTimeout(() => {
      window.location.href = href;
    }, 150);
  }

  return (
    <CtaButton href={href} className={className} onClick={handleClick}>
      {children}
    </CtaButton>
  );
}
