'use client'

import { cn } from '@/lib/cn'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteContent } from '@/content/site'

export function ValuesGrid() {
  const { values } = siteContent.about

  return (
    <section className="py-32 bg-ink">
      <div className="container-x">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="OUR VALUES"
            title="Five lines we run every decision through."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {values.map((value, idx) => (
              <div key={idx} className="flex flex-col">
                <p className={cn('font-display italic text-5xl', idx % 2 === 1 ? 'text-teal' : 'text-ember')}>
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <p className="font-sans font-bold text-xl text-mist mt-2">
                  {value.name}
                </p>
                <p className="font-sans text-[15px] text-fog leading-relaxed mt-3">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
