import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

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

      <div className="mt-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-6 px-6 md:px-12 lg:px-20 pb-4">
          {siteContent.verticals.map((v, i) => (
            <RevealOnScroll key={v.name} delay={i * 0.1} className="flex-shrink-0 snap-start">
              <div className="w-[340px] md:w-[420px] border border-mist/10 bg-ink/60 p-8 h-full flex flex-col">
                <p className="text-eyebrow uppercase tracking-[0.2em] text-teal/70">{v.name}</p>
                <p className="mt-8 font-display italic text-5xl md:text-6xl text-ember leading-none">{v.stat}</p>
                <p className="mt-4 text-sm text-fog">{v.descriptor}</p>
                <p className="mt-10 text-xs text-slate leading-relaxed border-t border-mist/10 pt-6">{v.detail}</p>
              </div>
            </RevealOnScroll>
          ))}
          {/* Spacer to let last card snap cleanly */}
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </div>
    </section>
  )
}
