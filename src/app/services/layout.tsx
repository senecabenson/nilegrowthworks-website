import type { Metadata } from 'next'

// Note: this layout wraps every route under /services, including the
// [slug] vertical pages. It only sets the default (index-page) metadata,
// which /services/[slug]/page.tsx overrides with generateMetadata(). Do
// not add page-specific JSON-LD here — it would duplicate onto every child
// route. Breadcrumb + Service schema for /services live in page.tsx itself.
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
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
