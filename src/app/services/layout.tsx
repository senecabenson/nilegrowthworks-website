import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Services · NILE GrowthWorks',
  description: 'Three tiers for fixing revenue leaks: $500 Diagnostic, Full Engagement build-and-run, or Custom Build inside your stack.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services · NILE GrowthWorks',
    description: 'Three tiers for fixing revenue leaks: $500 Diagnostic, Full Engagement, or Custom Build.',
    type: 'website',
    url: 'https://nilegrowthworks.com/services',
    siteName: 'NILE GrowthWorks',
    images: [
      {
        url: '/logos/nile-wordmark-charcoal.png',
        width: 1200,
        height: 300,
        alt: 'NILE GrowthWorks',
      },
    ],
  },
}

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
])
const service = buildServiceSchema()

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />
      {children}
    </>
  )
}
