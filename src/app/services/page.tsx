import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import TierCard from '@/components/services/TierCard'
import ComparisonTable from '@/components/services/ComparisonTable'
import FaqBlock from '@/components/services/FaqBlock'
import { FinalCTA } from '@/components/home/FinalCTA'
import { siteContent } from '@/content/site'
import { servicePages } from '@/content/services-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema'

// Breadcrumb + Service JSON-LD live here (not in layout.tsx) because
// services/layout.tsx wraps every route under /services, including the
// [slug] vertical pages, which each need their own distinct schema.
const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
])
const service = buildServiceSchema()

export default function ServicesPage() {
  const { tiers } = siteContent.services

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />

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
                you already run. You pick the door. The outcome is the same.
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

      {/* Diagnostic by vertical */}
      <section className="py-24 bg-ink">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="BY INDUSTRY"
              title="The diagnostic, built for your vertical."
              titleAccent="your vertical."
              description="Same $500–$750 offer. The leak looks different depending on what you run."
            />
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {servicePages.map((page, i) => (
              <RevealOnScroll key={page.slug} delay={i * 0.1}>
                <Link
                  href={`/services/${page.slug}`}
                  className="block border border-mist/10 bg-navy-deep/60 p-6 sm:p-8 h-full hover:border-ember/40 transition-colors"
                >
                  <p className="text-eyebrow font-sans uppercase tracking-[0.2em] text-teal/70">
                    {page.vertical}
                  </p>
                  <p className="mt-6 font-display italic text-2xl sm:text-3xl text-mist leading-tight">
                    {page.leakStats[0].stat}
                  </p>
                  <p className="mt-2 text-sm text-fog">{page.leakStats[0].descriptor}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.15em] text-ember">
                    See the diagnostic &rarr;
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqBlock />

      {/* Final CTA — reused from home */}
      <FinalCTA />
    </>
  )
}
