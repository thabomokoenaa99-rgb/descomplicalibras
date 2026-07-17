"use client";

import { useEffect } from "react";
import { ensureMetaPixel } from "@/lib/meta-pixel";

export function MetaPixelEnsure() {
  useEffect(() => {
    const boot = () => {
      if (ensureMetaPixel(true)) return;
      window.setTimeout(boot, 300);
    };
    boot();
  }, []);

  return null;
}
