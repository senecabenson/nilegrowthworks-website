import { cn } from '@/lib/cn'
import SectionHeading from '@/components/ui/SectionHeading'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

type Tier = typeof siteContent.services.tiers[number]

function TierCard({ tier, featured, delay }: { tier: Tier; featured: boolean; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <div
        className={cn(
          'relative flex flex-col p-8 h-full border transition-colors duration-300',
          featured
            ? 'border-ember/60 bg-gradient-to-br from-navy-deep to-navy'
            : 'border-mist/10 bg-navy-deep/60 hover:border-mist/30'
        )}
      >
        <p className={cn('text-eyebrow uppercase tracking-[0.2em]', featured ? 'text-ember' : 'text-slate')}>
          {tier.tier}
        </p>
        <h3 className="mt-4 font-display text-3xl italic text-mist">{tier.name}</h3>
        <p className="mt-6 font-display italic text-4xl text-ember">{tier.price}</p>
        <p className="mt-6 text-sm text-fog leading-relaxed">{tier.blurb}</p>
        <ul className="mt-8 space-y-3 flex-1">
          {tier.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-fog">
              <span className="text-ember mt-1 flex-shrink-0">✓</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <MagneticButton variant={featured ? 'primary' : 'ghost'} href={tier.cta.href}>
            {tier.cta.label}
          </MagneticButton>
        </div>
      </div>
    </RevealOnScroll>
  )
}

export function ServicesOverview() {
  return (
    <section id="diagnostic" className="py-16 md:py-32 bg-navy relative scroll-mt-24">
      <div className="container-x">
        <RevealOnScroll>
          <SectionHeading
            eyebrow={siteContent.services.eyebrow}
            title={siteContent.services.title}
          />
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteContent.services.tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} featured={i === 0} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
