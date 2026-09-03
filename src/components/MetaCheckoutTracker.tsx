"use client";

import { useEffect } from "react";
import { trackMetaViewContent } from "@/lib/meta-pixel";

type Props = {
  plan: string;
  planName: string;
};

export function MetaCheckoutTracker({ plan, planName }: Props) {
  useEffect(() => {
    trackMetaViewContent(plan, planName);
  }, [plan, planName]);

  return null;
}
