import { HeroBanner } from "./hero-banner"
import { TeamGrid } from "./team-grid"
import { WhySection } from "./why-section"

export function TeamPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      <HeroBanner />
      <TeamGrid />
      <WhySection />
    </div>
  )
}
