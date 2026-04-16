import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nilegrowthworks.com'
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/services`, lastModified: now, priority: 0.8 },
    { url: `${base}/about`, lastModified: now, priority: 0.6 },
  ]
}
