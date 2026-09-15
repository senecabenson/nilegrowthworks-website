import { Hero } from '@/components/home/Hero'
import { LeakVisualization } from '@/components/home/LeakVisualization'
import { ProblemStatement } from '@/components/home/ProblemStatement'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { ApproachSteps } from '@/components/home/ApproachSteps'
import { VerticalProofStrip } from '@/components/home/VerticalProofStrip'
import { RevenueCalculator } from '@/components/home/RevenueCalculator'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { RevenueOpsExplainer } from '@/components/home/RevenueOpsExplainer'
import { FinalCTA } from '@/components/home/FinalCTA'
import { UpdatedDate } from '@/components/seo/UpdatedDate'
import { pageDates } from '@/content/site'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container-x">
        <UpdatedDate date={pageDates['/']} />
      </div>
      <LeakVisualization />
      <ProblemStatement />
      <RevenueOpsExplainer />
      <ServicesOverview />
      <ApproachSteps />
      <VerticalProofStrip />
      <RevenueCalculator />
      <AboutSnippet />
      <FinalCTA />
    </>
  )
}
