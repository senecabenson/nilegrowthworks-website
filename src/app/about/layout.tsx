import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — NILE GrowthWorks',
  description: 'Revenue-operations and automation for service businesses doing $500K–$5M. We find where revenue is leaking. Then we build the systems that stop it.',
  openGraph: {
    title: 'About — NILE GrowthWorks',
    description: 'Revenue-operations and automation for service businesses doing $500K–$5M.',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
