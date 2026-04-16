'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteContent } from '@/content/site'

export function ProofStrip() {
  const { proof } = siteContent.about

  return (
    <section className="py-24 bg-navy-deep">
      <div className="container-x">
        <RevealOnScroll>
          <SectionHeading
            eyebrow={proof.eyebrow}
            title={proof.title}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {proof.stats.map((stat, idx) => (
              <div key={idx}>
                <p className="font-display italic text-h2 text-ember">
                  {stat.value}
                </p>
                <p className="font-sans font-semibold text-mist text-sm uppercase tracking-wider mt-3">
                  {stat.label}
                </p>
                <p className="font-sans text-[14px] text-fog leading-snug max-w-xs mt-3">
                  {stat.context}
                </p>
                <div className="border-b border-ember/30 mt-6 pt-0" />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
