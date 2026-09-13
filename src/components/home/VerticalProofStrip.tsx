import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

// Matches each home verticals[] card to its service x vertical page by name,
// so the card and the page copy never drift out of sync on rename.
const verticalSlugs: Record<string, string> = {
  'PROPERTY MANAGEMENT': 'revenue-leak-diagnostic-property-management',
  'HVAC & PLUMBING': 'revenue-leak-diagnostic-hvac-plumbing',
  'MED SPA & AESTHETICS': 'revenue-leak-diagnostic-med-spa',
}

export function VerticalProofStrip() {
  return (
    <section className="py-24 bg-navy-deep overflow-hidden">
      <div className="container-x">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-teal">PROOF</p>
            <h2 className="font-display text-h2 text-mist mt-4">Where the leaks show up.</h2>
          </div>
        </RevealOnScroll>
      </div>

      <div className="mt-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:overflow-visible">
        <div className="flex gap-6 px-6 md:px-12 pb-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-0 lg:pb-0 container-x">
          {siteContent.verticals.map((v, i) => {
            const slug = verticalSlugs[v.name]
            const card = (
              <div className="w-[280px] sm:w-[340px] lg:w-auto border border-mist/10 bg-ink/60 p-5 sm:p-8 h-full flex flex-col transition-colors hover:border-ember/40">
                <p className="text-eyebrow uppercase tracking-[0.2em] text-teal/70">{v.name}</p>
                <p className="mt-8 font-display italic text-3xl sm:text-4xl md:text-6xl text-ember leading-none">{v.stat}</p>
                <p className="mt-4 text-sm text-fog">{v.descriptor}</p>
                <p className="mt-10 text-xs text-slate leading-relaxed border-t border-mist/10 pt-6">{v.detail}</p>
                {slug && (
                  <p className="mt-6 text-xs uppercase tracking-[0.15em] text-ember">
                    See the diagnostic &rarr;
                  </p>
                )}
              </div>
            )

            return (
              <RevealOnScroll key={v.name} delay={i * 0.1} className="flex-shrink-0 snap-start lg:flex-shrink lg:w-auto">
                {slug ? <Link href={`/services/${slug}`}>{card}</Link> : card}
              </RevealOnScroll>
            )
          })}
          {/* Spacer to let last card snap cleanly */}
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </div>
    </section>
  )
}
