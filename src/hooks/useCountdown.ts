"use client";

import { useEffect, useState } from "react";
import { pad2 } from "@/utils/format";

export function useCountdown(durationSec: number, storageKey: string) {
  const [remaining, setRemaining] = useState(durationSec);

  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey);
    let end = stored ? Number(stored) : Date.now() + durationSec * 1000;
    if (!stored || Number.isNaN(end) || end < Date.now()) {
      end = Date.now() + durationSec * 1000;
    }
    sessionStorage.setItem(storageKey, String(end));

    const tick = () => {
      let next = Math.max(0, Math.floor((end - Date.now()) / 1000));
      if (next === 0) {
        end = Date.now() + durationSec * 1000;
        sessionStorage.setItem(storageKey, String(end));
        next = durationSec;
      }
      setRemaining(next);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationSec, storageKey]);

  return {
    minutes: pad2(Math.floor(remaining / 60)),
    seconds: pad2(remaining % 60),
    remaining,
  };
}
