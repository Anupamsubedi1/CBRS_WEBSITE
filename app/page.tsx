import { Hero } from "@/components/home/hero";
import { AboutStrip } from "@/components/home/about-strip";
import { ThemesSection } from "@/components/home/themes-section";
import { ImpactBand } from "@/components/home/impact-band";
import { FeaturedPrograms } from "@/components/home/featured-programs";
import { Highlights } from "@/components/home/highlights";
import { DonateBand } from "@/components/layout/donate-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutStrip />
      <ThemesSection />
      <ImpactBand />
      <FeaturedPrograms />
      <Highlights />
      <DonateBand />
    </>
  );
}
