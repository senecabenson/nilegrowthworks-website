import { Hero } from '@/components/home/Hero'
import { LeakVisualization } from '@/components/home/LeakVisualization'
import { ProblemStatement } from '@/components/home/ProblemStatement'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { ApproachSteps } from '@/components/home/ApproachSteps'
import { VerticalProofStrip } from '@/components/home/VerticalProofStrip'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <LeakVisualization />
      <ProblemStatement />
      <ServicesOverview />
      <ApproachSteps />
      <VerticalProofStrip />
      {/* RevenueCalculator will be added here in Task 9 */}
      <AboutSnippet />
      <FinalCTA />
    </>
  )
}
