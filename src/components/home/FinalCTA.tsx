import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

export function FinalCTA() {
  return (
    <section className="py-40 bg-gradient-to-br from-navy to-ink relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(214,181,58,0.08), transparent 60%)' }}
      />
      <div className="container-x relative">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-eyebrow uppercase tracking-[0.3em] text-ember">
              {siteContent.finalCta.eyebrow}
            </p>
            <h2 className="mt-8 font-display text-h1 text-mist text-balance leading-[1.05]">
              {siteContent.finalCta.title}
            </h2>
            <p className="mt-8 text-body text-fog max-w-xl mx-auto leading-relaxed">
              {siteContent.finalCta.body}
            </p>
            <div className="mt-12">
              <MagneticButton variant="primary" href={siteContent.finalCta.cta.href}>
                {siteContent.finalCta.cta.label}
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
