import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildFaqSchema } from '@/lib/schema'
import { siteContent } from '@/content/site'

interface FaqBlockProps {
  faq?: { question: string; answer: string }[]
}

export default function FaqBlock({ faq: faqProp }: FaqBlockProps = {}) {
  const faq = faqProp ?? siteContent.services.faq

  return (
    <section className="py-24 bg-navy-deep">
      <JsonLd data={buildFaqSchema([...faq])} />
      <div className="container-x">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          titleAccent="answered."
        />
        <ul className="max-w-3xl space-y-10">
          {faq.map((item, i) => (
            <li key={item.question}>
              <RevealOnScroll delay={i * 0.05}>
                <div className="border-b border-mist/10 pb-10">
                  <h3 className="font-display text-xl text-mist">{item.question}</h3>
                  <p className="mt-3 text-body text-fog leading-relaxed">{item.answer}</p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
