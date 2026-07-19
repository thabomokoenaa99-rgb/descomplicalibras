import { SalesToast } from "@/components/SalesToast";
import { StickyCta } from "@/components/StickyCta";
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
        <IdealForSection />
        <ProductSection />
        <BonusesSection />
        <PricingSection />
        <FaqSection />
        <TestimonialsSection />
        <FooterSection />
      </main>
      <StickyCta />
    </>
  );
}
