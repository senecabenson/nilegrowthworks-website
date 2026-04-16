'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

export function FounderStory() {
  const { founderStory } = siteContent.about

  return (
    <section className="py-32 bg-ink">
      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left: Pull quote */}
            <div>
              <p className="font-display italic text-h2 text-ember leading-[1.15]">
                &ldquo;{founderStory.pullQuote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-ember/50">—</span>
                <p className="text-eyebrow font-sans uppercase tracking-wider text-slate">
                  {founderStory.pullQuoteAttribution}
                </p>
              </div>
            </div>

            {/* Right: Body paragraphs */}
            <div className="space-y-6">
              {founderStory.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-sans text-body text-fog leading-relaxed max-w-[520px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
