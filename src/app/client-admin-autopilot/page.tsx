import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import MagneticButton from '@/components/ui/MagneticButton'
import { FinalCTA } from '@/components/home/FinalCTA'
import { siteContent } from '@/content/site'

// Wraps a titleAccent substring in the same ember-italic treatment SectionHeading
// uses, for the hand-rolled hero heading on this page (mirrors services/about hero pattern).
function renderAccent(title: string, accent?: string): React.ReactNode {
  if (!accent) return title
  const idx = title.indexOf(accent)
  if (idx === -1) return title
  const before = title.slice(0, idx)
  const after = title.slice(idx + accent.length)
  return (
    <>
      {before}
      <em className="italic font-light text-ember">{accent}</em>
      {after}
    </>
  )
}

export default function ClientAdminAutopilotPage() {
  const { hero, forYou, whatItDoes, included, receipt, howItWorks, price, tagline } =
    siteContent.clientAdminAutopilot

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-40 md:pb-28 bg-navy relative">
        <div className="container-x">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
                {hero.eyebrow}
              </p>
              <h1 className="mt-6 font-display text-h1 text-mist leading-[1.02] text-balance">
                {renderAccent(hero.title, hero.titleAccent)}
              </h1>
              <p className="mt-8 text-body text-fog max-w-2xl leading-relaxed">
                {hero.subhead}
              </p>
              <p className="mt-4 text-body text-fog/80 max-w-2xl leading-relaxed">
                {hero.promise}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* This is for you */}
      <section className="py-16 md:py-32 bg-ink">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={forYou.eyebrow}
              title={forYou.title}
              description={forYou.body}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* What it does — 5 automations */}
      <section className="py-16 md:py-32 bg-navy-deep">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading eyebrow={whatItDoes.eyebrow} title={whatItDoes.title} />
          </RevealOnScroll>

          <div className="max-w-4xl">
            {whatItDoes.steps.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 0.1}>
                <div
                  className={`grid grid-cols-12 gap-8 py-10 ${
                    i < whatItDoes.steps.length - 1 ? 'border-b border-mist/10' : ''
                  }`}
                >
                  <div className="col-span-12 md:col-span-3">
                    <p className="font-display italic text-4xl sm:text-5xl md:text-6xl leading-none text-ember">
                      {step.number}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-display text-2xl md:text-3xl text-mist">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-body text-fog leading-relaxed max-w-2xl">
                      {step.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-32 bg-ink">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading eyebrow={included.eyebrow} title={included.title} />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl">
              {included.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-body text-fog leading-relaxed">
                  <span className="text-ember mt-[6px] flex-shrink-0" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* The receipt — anonymized proof band */}
      <section className="py-20 md:py-40 bg-navy relative">
        <div className="container-x max-w-4xl">
          <RevealOnScroll>
            <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
              {receipt.eyebrow}
            </p>
            <p className="mt-8 font-display text-h2 md:text-h1 italic text-mist leading-[1.1] text-balance">
              &ldquo;{receipt.quote}&rdquo;
            </p>
            <p className="mt-8 text-eyebrow font-sans uppercase tracking-[0.25em] text-ember">
              {receipt.attribution}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* How it works + Price */}
      <section className="py-16 md:py-32 bg-navy-deep">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <SectionHeading
                  eyebrow={howItWorks.eyebrow}
                  title={howItWorks.title}
                  description={howItWorks.body}
                  className="mb-0"
                />
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-5">
              <RevealOnScroll delay={0.1}>
                <div className="relative border border-ember/40 bg-gradient-to-br from-navy-deep to-navy p-8 sm:p-10">
                  <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-ember">
                    {price.eyebrow}
                  </p>
                  <p className="mt-6 text-eyebrow font-sans uppercase tracking-[0.2em] text-slate">
                    {price.label}
                  </p>
                  <p className="mt-3 font-display italic text-[40px] sm:text-[48px] leading-none text-mist">
                    {price.amount}
                  </p>
                  <p className="mt-5 text-sm text-fog leading-relaxed">
                    {price.optional}
                  </p>
                  <p className="mt-3 text-sm text-slate leading-relaxed">
                    {price.note}
                  </p>
                  <div className="mt-10">
                    <MagneticButton variant="primary" href={price.cta.href}>
                      {price.cta.label}
                    </MagneticButton>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <RevealOnScroll delay={0.15}>
            <p className="mt-16 text-center font-display italic text-ember text-xl">
              {tagline}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA — reused sitewide */}
      <FinalCTA />
    </>
  )
}
