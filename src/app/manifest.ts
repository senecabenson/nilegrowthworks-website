import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NILE GrowthWorks',
    short_name: 'NILE',
    description: 'Revenue operations and automation for San Diego service businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141414',
    theme_color: '#D6B53A',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logos/nile-logo-charcoal.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
