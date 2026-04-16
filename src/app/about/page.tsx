import type { Metadata } from 'next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { FounderStory } from '@/components/about/FounderStory'
import { ProofStrip } from '@/components/about/ProofStrip'
import { ValuesGrid } from '@/components/about/ValuesGrid'
import { FinalCTA } from '@/components/home/FinalCTA'
import { siteContent } from '@/content/site'

export const metadata: Metadata = {
  title: 'About — NILE GrowthWorks',
  description:
    'Revenue-operations and automation for service businesses doing $500K–$5M. We find where revenue is leaking. Then we build the systems that stop it.',
  openGraph: {
    title: 'About — NILE GrowthWorks',
    description:
      'Revenue-operations and automation for service businesses doing $500K–$5M. We find where revenue is leaking. Then we build the systems that stop it.',
    type: 'website',
  },
}

export default function AboutPage() {
  const { partnership } = siteContent.about

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-navy relative">
        <div className="container-x">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-ember">
                ABOUT
              </p>
              <h1 className="mt-6 font-display text-h1 text-mist leading-[1.02] text-balance">
                We build what we wish{' '}
                <em className="italic font-light text-ember">
                  we&rsquo;d had.
                </em>
              </h1>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Founder Story */}
      <FounderStory />

      {/* Proof Strip */}
      <ProofStrip />

      {/* Values Grid */}
      <ValuesGrid />

      {/* Partnership Principles */}
      <section className="py-32 bg-navy">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={partnership.eyebrow}
              title={partnership.title}
            />

            <div className="space-y-8 max-w-4xl">
              {partnership.paragraphs.map((item, idx) => (
                <p
                  key={idx}
                  className="text-body text-fog max-w-2xl leading-relaxed"
                >
                  <strong className="text-mist font-semibold mr-2">
                    {item.lead}
                  </strong>
                  {item.body}
                </p>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}
