'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'

export function BrandStory() {
  return (
    <section className="py-16 md:py-32 bg-navy-deep">
      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
            {/* Left: Pull quote */}
            <div>
              <p className="font-display italic text-h2 text-mist leading-[1.15]">
                &ldquo;Not with hype.<br />
                <em className="text-ember not-italic">With systems.</em>&rdquo;
              </p>
            </div>

            {/* Right: Brand name story */}
            <div className="space-y-8">
              <div>
                <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">THE NAME</p>
                <h2 className="mt-4 font-display text-h2 text-mist leading-tight">Next In Line.</h2>
                <p className="mt-4 text-body text-fog leading-relaxed">
                  NILE stands for Next In Line Enterprises. The name comes from a deeply personal belief: anyone who dedicates themselves, puts their mind to it, and pursues something of greatness is next in line to break through. It&rsquo;s not a question of if — it&rsquo;s a question of when.
                </p>
                <p className="mt-4 text-body text-fog leading-relaxed">
                  The Nile River is the longest river in the world. It sustained entire civilizations — not because it was loud or flashy, but because it showed up, consistently, with life-giving purpose. That&rsquo;s the energy behind this brand. NILE GrowthWorks shows up for the business owner who&rsquo;s next.
                </p>
              </div>

              <div className="border-t border-mist/10 pt-8">
                <h2 className="font-display text-h2 text-mist leading-tight">GrowthWorks.</h2>
                <p className="mt-4 text-body text-fog leading-relaxed">
                  One deliberate word. Growth that actually works, and the real work it takes to make growth happen. No shortcuts, no silver bullets. Just operational truth.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
