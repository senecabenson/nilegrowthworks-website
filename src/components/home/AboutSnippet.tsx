import { cn } from '@/lib/cn'
import SectionHeading from '@/components/ui/SectionHeading'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

export function AboutSnippet() {
  return (
    <section className="py-32 bg-ink">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-6">
            <RevealOnScroll>
              <SectionHeading
                eyebrow={siteContent.about.eyebrow}
                title={siteContent.about.title}
              />
              <p className="text-body text-fog leading-relaxed max-w-xl">
                {siteContent.about.story}
              </p>
              <div className="mt-10">
                <MagneticButton variant="ghost" href="/about">
                  Read our story
                </MagneticButton>
              </div>
            </RevealOnScroll>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <RevealOnScroll delay={0.2}>
              <ul className="space-y-8">
                {siteContent.about.values.map((value, i) => (
                  <li key={value.name} className="flex gap-6">
                    <span className={cn(
                      'font-display italic text-2xl flex-shrink-0 w-10',
                      i % 2 === 1 ? 'text-teal' : 'text-ember'
                    )}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-display italic text-xl text-mist">{value.name}</p>
                      <p className="mt-1 text-sm text-fog leading-relaxed">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
