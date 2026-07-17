"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/content";
import { formatBRLDate } from "@/utils/format";

export function UrgencyBanner() {
  const [date, setDate] = useState(formatBRLDate);

  useEffect(() => {
    setDate(formatBRLDate());
  }, []);

  return (
    <div
      id="top-banner"
      className="fixed top-0 inset-x-0 z-40 bg-banner text-white text-center py-2.5 px-2 sm:px-4 text-[11px] sm:text-sm font-bold shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true">⚠️ </span>
      <span className="uppercase tracking-wide font-extrabold">{copy.urgency.prefix}</span>{" "}
      {copy.urgency.text}{" "}
      <span className="underline decoration-white/70 whitespace-nowrap font-extrabold" suppressHydrationWarning>
        {date}!
      </span>
    </div>
  );
}
