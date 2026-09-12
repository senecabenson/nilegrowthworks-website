import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About · NILE GrowthWorks',
  description: 'Revenue-operations and automation for service businesses doing $500K–$5M. We find where revenue is leaking. Then we build the systems that stop it.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About · NILE GrowthWorks',
    description: 'Revenue-operations and automation for service businesses doing $500K–$5M.',
    type: 'website',
    url: 'https://nilegrowthworks.com/about',
    siteName: 'NILE GrowthWorks',
  },
}

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
])

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
