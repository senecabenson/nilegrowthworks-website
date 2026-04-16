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
  title: 'NILE GrowthWorks — Build it so it runs.',
  description: 'We find where your revenue is leaking. Then we build the systems that stop it. Revenue operations for service businesses doing $500K–$5M.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'NILE GrowthWorks',
    description: 'Revenue operations and automation for San Diego service businesses.',
    type: 'website',
    images: ['/og-image.png'],
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
