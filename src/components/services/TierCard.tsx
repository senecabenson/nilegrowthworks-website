import { cn } from '@/lib/cn'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

type Tier = typeof siteContent.services.tiers[number]

interface TierCardProps {
  tier: Tier
  featured?: boolean
  delay?: number
}

export default function TierCard({ tier, featured = false, delay = 0 }: TierCardProps) {
  return (
    <RevealOnScroll delay={delay}>
      <article
        className={cn(
          'relative border transition-colors duration-300 p-6 sm:p-8 md:p-14',
          featured
            ? 'border-ember/60 bg-gradient-to-br from-navy-deep to-navy'
            : 'border-mist/10 bg-navy-deep/60 hover:border-mist/30'
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16">
          {/* Left column — identity + copy */}
          <div className="lg:col-span-7">
            <p
              className={cn(
                'text-eyebrow font-sans uppercase tracking-[0.25em]',
                featured ? 'text-ember' : 'text-slate'
              )}
            >
              {tier.tier}
            </p>

            <h3 className="mt-5 font-display italic text-3xl sm:text-4xl md:text-5xl text-mist leading-[1.05]">
              {tier.name}
            </h3>

            <p
              className={cn(
                'mt-6 font-display italic',
                'text-[28px] sm:text-[36px] md:text-[48px] leading-none',
                featured ? 'text-ember' : 'text-ember-soft'
              )}
            >
              {tier.price}
            </p>

            <div className="mt-8 space-y-5 max-w-xl">
              {tier.description.map((paragraph, i) => (
                <p key={i} className="text-body text-fog leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-mist/10 p-5">
                <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-ember">
                  Best for
                </p>
                <p className="mt-3 text-sm text-fog leading-relaxed">{tier.bestFor}</p>
              </div>
              <div className="border border-mist/10 p-5">
                <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-teal/70">
                  Not for
                </p>
                <p className="mt-3 text-sm text-fog leading-relaxed">{tier.notFor}</p>
              </div>
            </div>
          </div>

          {/* Right column — checklist + CTA */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-slate">
              What&rsquo;s included
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {tier.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-fog">
                  <span className="text-ember mt-[2px] flex-shrink-0" aria-hidden="true">
                    ✓
                  </span>
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
        </div>
      </article>
    </RevealOnScroll>
  )
}
