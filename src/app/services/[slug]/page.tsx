import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import MagneticButton from '@/components/ui/MagneticButton'
import FaqBlock from '@/components/services/FaqBlock'
import { FinalCTA } from '@/components/home/FinalCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildVerticalServiceSchema } from '@/lib/schema'
import { servicePages, getServicePage } from '@/content/services-data'

const SITE_URL = 'https://nilegrowthworks.com'

// Mirrors SectionHeading's accent-wrapping so the hand-rolled hero heading
// on this page gets the same em/ember treatment (pattern copied from
// client-admin-autopilot/page.tsx and services/page.tsx).
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

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getServicePage(params.slug)
  if (!page) return {}

  const url = `${SITE_URL}/services/${page.slug}`

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'website',
      url,
      siteName: 'NILE GrowthWorks',
    },
  }
}

export default function ServiceVerticalPage({ params }: { params: { slug: string } }) {
  const page = getServicePage(params.slug)
  if (!page) notFound()

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: page.title, path: `/services/${page.slug}` },
  ])
  const service = buildVerticalServiceSchema(page)

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />

      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-40 md:pb-28 bg-navy relative">
        <div className="container-x">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
                {page.eyebrow}
              </p>
              <h1 className="mt-6 font-display text-h1 text-mist leading-[1.02] text-balance">
                {renderAccent(page.h1, page.h1Accent)}
              </h1>
              <p className="mt-8 text-body text-fog max-w-2xl leading-relaxed">
                {page.intro}
              </p>
              <div className="mt-10">
                <MagneticButton variant="primary" href={page.cta.href}>
                  {page.cta.label}
                </MagneticButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Leak stats for this vertical */}
      <section className="py-24 bg-navy-deep overflow-hidden">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="THE LEAK"
              title={`Where ${page.vertical} revenue leaks.`}
              titleAccent="leaks."
            />
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {page.leakStats.map((stat, i) => (
              <RevealOnScroll key={stat.descriptor} delay={i * 0.1}>
                <div className="border border-mist/10 bg-ink/60 p-6 sm:p-8 h-full flex flex-col">
                  <p className="font-display italic text-3xl sm:text-4xl md:text-5xl text-ember leading-none">
                    {stat.stat}
                  </p>
                  <p className="mt-4 text-sm text-fog">{stat.descriptor}</p>
                  <p className="mt-6 text-xs text-slate leading-relaxed border-t border-mist/10 pt-6">
                    {stat.detail}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-32 bg-ink">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading eyebrow="THE DIAGNOSTIC" title="How it works." titleAccent="works." />
          </RevealOnScroll>

          <div className="max-w-4xl">
            {page.howItWorks.map((step, i) => (
              <RevealOnScroll key={step.step} delay={i * 0.1}>
                <div
                  className={`grid grid-cols-12 gap-8 py-10 ${
                    i < page.howItWorks.length - 1 ? 'border-b border-mist/10' : ''
                  }`}
                >
                  <div className="col-span-12 md:col-span-3">
                    <p className="font-display italic text-4xl sm:text-5xl md:text-6xl leading-none text-ember">
                      {step.step}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h2 className="font-display text-2xl md:text-3xl text-mist">
                      {step.title}
                    </h2>
                    <p className="mt-4 text-body text-fog leading-relaxed max-w-2xl">
                      {step.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.2}>
            <div className="mt-16 border border-mist/10 bg-navy-deep/60 p-6 sm:p-8 max-w-2xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-ember">
                Revenue Leak Diagnostic
              </p>
              <p className="mt-4 font-display italic text-[28px] sm:text-[36px] text-mist leading-none">
                $500–$750
              </p>
              <p className="mt-4 text-sm text-fog leading-relaxed">
                Fee credited toward Full Engagement setup if you move forward.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ — vertical-specific */}
      <FaqBlock faq={page.faq} />

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}
