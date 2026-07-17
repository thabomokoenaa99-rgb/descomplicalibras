"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/metrito";

type Props = {
  plan: string;
  planName: string;
  value: number;
};

export function MetritoCheckoutTracker({ plan, planName, value }: Props) {
  useEffect(() => {
    trackViewContent(plan, planName, value);
  }, [plan, planName, value]);

  return null;
}
