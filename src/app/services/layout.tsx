import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — NILE GrowthWorks',
  description: 'Three tiers for fixing revenue leaks: $500 Diagnostic, Full Engagement build-and-run, or Custom Build inside your stack.',
  openGraph: {
    title: 'Services — NILE GrowthWorks',
    description: 'Three tiers for fixing revenue leaks: $500 Diagnostic, Full Engagement, or Custom Build.',
    type: 'website',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
