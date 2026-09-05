"use client";

import { useEffect } from "react";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

const LOWTRACK_PIXEL_ID = "lt_px_1ae682aa199a";
const META_SCRIPT = "https://connect.facebook.net/en_US/fbevents.js";
const LOWTRACK_SCRIPT = "https://lowtrack.com.br/pixel.js";

function bootMetaStub() {
  if (typeof window.fbq === "function") return;

  const n = function (...args: unknown[]) {
    n.queue.push(args);
  } as ((...args: unknown[]) => void) & { queue: unknown[][] };

  n.queue = [];
  window.fbq = n;
  window.fbq("init", META_PIXEL_ID);
  window.__metaPixelInitialized = true;
  window.__metaPageView = true;
}

function inject(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadThirdPartyPixels() {
  bootMetaStub();
  inject(META_SCRIPT);
  window.pixelId = LOWTRACK_PIXEL_ID;
  inject(LOWTRACK_SCRIPT);
}

export function DeferredPixels() {
  useEffect(() => {
    const timeoutId = window.setTimeout(loadThirdPartyPixels, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
