"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { copy } from "@/lib/content";

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const oferta = document.getElementById("oferta");
      const bannerH = 40;
      const pastHero = window.scrollY > window.innerHeight * 0.55;
      let inOffer = false;
      if (oferta) {
        const rect = oferta.getBoundingClientRect();
        inOffer = rect.top < window.innerHeight * 0.7 && rect.bottom > bannerH;
      }
      setShow(pastHero && !inOffer);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 bg-gradient-to-t from-ink/90 via-ink/70 to-transparent transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="max-w-lg mx-auto">
        <CtaButton href="#oferta" ariaLabel="Ir para a oferta" className="shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          {copy.stickyCta}
        </CtaButton>
      </div>
    </div>
  );
}
