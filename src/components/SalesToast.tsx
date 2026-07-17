"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/content";

const CYCLE_MS = 9000;
const VISIBLE_MS = 4500;

export function SalesToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      setIndex((i) => (i + 1) % copy.salesToast.names.length);
      setVisible(true);
      hideTimer = setTimeout(() => setVisible(false), VISIBLE_MS);
    };

    const start = setTimeout(show, 3500);
    const loop = setInterval(show, CYCLE_MS);

    return () => {
      clearTimeout(start);
      clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed left-4 z-50 bg-white border border-zinc-200 p-3 rounded-2xl shadow-[0_10px_40px_rgba(13,27,61,0.12)] flex items-center gap-3 max-w-[calc(100vw-2rem)] w-68 sm:w-72 pointer-events-none transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
      style={{ top: 65 }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="w-9 h-9 bg-secondary text-cta-darker rounded-full flex items-center justify-center shrink-0 border border-cta/20">
        <span className="text-lg" aria-hidden="true">
          🤟
        </span>
      </div>
      <div className="overflow-hidden min-w-0">
        <p className="text-xs sm:text-sm font-bold text-ink leading-tight truncate">
          {copy.salesToast.names[index]}
        </p>
        <p className="text-[10px] sm:text-xs text-body/60 truncate">{copy.salesToast.action}</p>
      </div>
    </div>
  );
}
