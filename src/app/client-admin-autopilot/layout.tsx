import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Client Admin Autopilot · NILE GrowthWorks',
  description: 'A 5-automation system that runs new client intake, payment reminders, signed paperwork tracking, payment logging, and an end-of-day rollup. Live in about two weeks. $1,500 setup, founding rate.',
  alternates: {
    canonical: '/client-admin-autopilot',
  },
  openGraph: {
    title: 'Client Admin Autopilot · NILE GrowthWorks',
    description: 'Stop running your whole client pipeline out of your head. Intake, paperwork, and payment follow-up on autopilot.',
    type: 'website',
    url: 'https://nilegrowthworks.com/client-admin-autopilot',
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
  { name: 'Client Admin Autopilot', path: '/client-admin-autopilot' },
])

export default function ClientAdminAutopilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
