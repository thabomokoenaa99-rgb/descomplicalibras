import dynamic from "next/dynamic";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { BenefitsSection } from "@/sections/BenefitsSection";
import { BonusesSection } from "@/sections/BonusesSection";
import { CarouselSection } from "@/sections/CarouselSection";
import { FaqSection } from "@/sections/FaqSection";
import { FooterSection } from "@/sections/FooterSection";
import { HeroSection } from "@/sections/HeroSection";
import { IdealForSection } from "@/sections/IdealForSection";
import { PricingSection } from "@/sections/PricingSection";
import { ProductSection } from "@/sections/ProductSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { UrgencySection } from "@/sections/UrgencySection";

export const revalidate = 3600;

const SalesToast = dynamic(() =>
  import("@/components/SalesToast").then((mod) => mod.SalesToast),
);

const StickyCta = dynamic(() =>
  import("@/components/StickyCta").then((mod) => mod.StickyCta),
);

export default function HomePage() {
  return (
    <>
      <UrgencyBanner />
      <SalesToast />
      <main className="w-full overflow-x-clip flex flex-col min-h-screen relative">
        <HeroSection />
        <CarouselSection />
        <BenefitsSection />
        <UrgencySection />
        <ProductSection />
        <BonusesSection />
        <PricingSection />
        <TestimonialsSection />
        <IdealForSection />
        <FaqSection />
        <FooterSection />
      </main>
      <StickyCta />
    </>
  );
}
