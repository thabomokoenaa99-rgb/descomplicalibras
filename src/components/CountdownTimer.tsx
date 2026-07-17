"use client";

import { useCountdown } from "@/hooks/useCountdown";

const DURATION = 10 * 60;

export function CountdownTimer({ label }: { label: string }) {
  const { minutes, seconds } = useCountdown(DURATION, "dlb-offer-timer");

  return (
    <div
      className="inline-flex justify-center items-center gap-3 sm:gap-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3.5 shadow-lg w-full sm:w-auto overflow-hidden"
      role="timer"
      aria-live="polite"
      aria-label={`${label}: ${minutes} minutos e ${seconds} segundos`}
    >
      <span className="text-xs sm:text-lg font-extrabold tracking-wide sm:tracking-widest uppercase text-white whitespace-nowrap drop-shadow-sm">
        {label}
      </span>
      <div className="flex items-start gap-1 sm:gap-2 font-black shrink-0 border-l border-white/20 pl-3 sm:pl-8">
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-4xl leading-none text-cta font-mono tabular-nums">{minutes}</span>
          <span className="text-[7px] sm:text-[9px] tracking-widest uppercase text-white/60 mt-1">MIN</span>
        </div>
        <span className="text-xl sm:text-3xl leading-none text-cta/80" aria-hidden="true">
          :
        </span>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-4xl leading-none text-cta font-mono tabular-nums">{seconds}</span>
          <span className="text-[7px] sm:text-[9px] tracking-widest uppercase text-white/60 mt-1">SEG</span>
        </div>
      </div>
    </div>
  );
}
