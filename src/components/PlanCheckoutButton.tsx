"use client";

import { type ReactNode } from "react";
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
  return (
    <CtaButton
      href={href}
      className={className}
      onClick={() => trackInitiateCheckout(plan, planName, value)}
    >
      {children}
    </CtaButton>
  );
}
