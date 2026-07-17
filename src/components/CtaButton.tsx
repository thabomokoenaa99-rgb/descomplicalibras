"use client";

import { type ReactNode } from "react";

type CtaButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  size?: "md" | "lg";
};

export function CtaButton({
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
  size = "lg",
}: CtaButtonProps) {
  const sizeClass =
    size === "lg"
      ? "text-base sm:text-2xl px-6 sm:px-14 py-4 sm:py-5"
      : "text-base sm:text-xl px-4 sm:px-10 py-4 sm:py-5";

  const base =
    `btn-shine inline-flex items-center justify-center w-full sm:w-auto bg-cta hover:bg-cta-dark ` +
    `text-ink font-extrabold rounded-full transition-colors duration-300 ` +
    `shadow-[0_12px_30px_rgba(37,211,102,0.4)] uppercase tracking-tight sm:tracking-wider ` +
    `border border-cta-dark/20 leading-[1.1] whitespace-nowrap focus-visible:outline-none ` +
    `focus-visible:ring-4 focus-visible:ring-cta/40 ${sizeClass} ${className}`;

  const resolvedHref = href ?? (onClick ? undefined : "#oferta");

  if (resolvedHref) {
    return (
      <a href={resolvedHref} onClick={onClick} className={base} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
