import RevealOnScroll from '@/components/ui/RevealOnScroll'
import TierCard from '@/components/services/TierCard'
import ComparisonTable from '@/components/services/ComparisonTable'
import { FinalCTA } from '@/components/home/FinalCTA'
import { siteContent } from '@/content/site'

export default function ServicesPage() {
  const { tiers } = siteContent.services

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-40 md:pb-28 bg-navy relative">
        <div className="container-x">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
                SERVICES
              </p>
              <h1 className="mt-6 font-display text-h1 text-mist leading-[1.02] text-balance">
                Three tiers. One outcome:{' '}
                <em className="italic font-light text-ember">
                  revenue that doesn&rsquo;t leak.
                </em>
              </h1>
              <p className="mt-8 text-body text-fog max-w-2xl leading-relaxed">
                Start with a paid diagnostic. Move to a full engagement if the
                numbers warrant it. Or scope a custom build inside the stack
                you already run. You pick the door; the outcome is the same.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Tier cards — stacked, full-width, room to breathe */}
      <section className="py-24 bg-navy">
        <div className="container-x">
          <div className="space-y-12 md:space-y-16">
            {tiers.map((tier, i) => (
              <TierCard
                key={tier.name}
                tier={tier}
                featured={i === 0}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <ComparisonTable />

      {/* Final CTA — reused from home */}
      <FinalCTA />
    </>
  )
}
