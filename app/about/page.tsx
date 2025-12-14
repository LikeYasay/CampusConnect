import HeroSection from "@/components/about/hero-section"
import StatsSection from "@/components/about/stats-section"
import FeatureSection from "@/components/about/feature-section"
import StepsSection from "@/components/about/steps-section"
import CTASection from "@/components/about/cta-section"
import Testimonials from "@/components/testimonials"

export default function About() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <StepsSection />
      <Testimonials />
      <CTASection />
    </main>
  )
}
