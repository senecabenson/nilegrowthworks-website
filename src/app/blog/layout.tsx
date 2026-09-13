import type { Metadata } from 'next'

// Mirrors services/layout.tsx: this layout wraps every route under /blog,
// including [slug] post pages. It only sets default (index-page) metadata.
// Do not add page-specific JSON-LD here — it would duplicate onto every
// post. Breadcrumb + BlogPosting schema live in each page.tsx itself.
export const metadata: Metadata = {
  title: 'Blog · NILE GrowthWorks',
  description: 'Revenue leak breakdowns and system-building notes for San Diego service businesses, from the founder of NILE GrowthWorks.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog · NILE GrowthWorks',
    description: 'Revenue leak breakdowns and system-building notes for San Diego service businesses.',
    type: 'website',
    url: 'https://nilegrowthworks.com/blog',
    siteName: 'NILE GrowthWorks',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
