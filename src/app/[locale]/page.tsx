import { AppGrid } from "@/components/home/AppGrid";
import { Hero } from "@/components/home/Hero";
import { ValueSections } from "@/components/home/ValueSections";
import { CTASection } from "@/components/shared/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AppGrid />
      <ValueSections />
      <CTASection />
    </>
  );
}
