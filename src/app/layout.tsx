import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { PageShell } from '@/components/layout/PageShell'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nilegrowthworks.com'),
  title: 'NILE GrowthWorks | Revenue Operations & Automation for Service Businesses',
  description: 'We find where your revenue is leaking. Then we build the systems that stop it. Revenue operations and automation for service businesses doing $500K–$5M.',
  keywords: ['revenue operations', 'automation', 'service business', 'San Diego', 'RevOps', 'CRM', 'lead follow-up'],
  icons: {
    icon: [
      { url: '/logos/nile-wordmark-charcoal.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'NILE GrowthWorks | Revenue Operations & Automation',
    description: 'Revenue operations and automation for San Diego service businesses doing $500K–$5M. We find the leak. We build the system. We keep it running.',
    type: 'website',
    url: 'https://nilegrowthworks.com',
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
  twitter: {
    card: 'summary_large_image',
    title: 'NILE GrowthWorks | Revenue Operations & Automation',
    description: 'Revenue operations and automation for San Diego service businesses doing $500K–$5M.',
    images: ['/logos/nile-wordmark-charcoal.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="bg-ink text-mist font-sans antialiased selection:bg-ember selection:text-ink">
        <GrainOverlay />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  )
}
