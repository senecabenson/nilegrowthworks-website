import { cn } from '@/lib/cn'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

export function ApproachSteps() {
  return (
    <section className="py-32 bg-ink">
      <div className="container-x">
        <RevealOnScroll>
          <SectionHeading
            eyebrow={siteContent.approach.eyebrow}
            title={siteContent.approach.title}
            titleAccent={siteContent.approach.titleAccent}
          />
        </RevealOnScroll>

        <div className="mt-16 max-w-4xl">
          {siteContent.approach.steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 0.1}>
              <div
                className={cn(
                  'grid grid-cols-12 gap-8 py-12',
                  i < siteContent.approach.steps.length - 1 && 'border-b border-mist/10'
                )}
              >
                <div className="col-span-12 md:col-span-3">
                  <p className="font-display italic text-6xl md:text-7xl text-ember leading-none">
                    {step.number}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-3xl text-mist">{step.title}</h3>
                  <p className="mt-4 text-body text-fog leading-relaxed max-w-2xl">{step.body}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
