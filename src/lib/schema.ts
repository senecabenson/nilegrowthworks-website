import { siteContent } from '@/content/site'

const SITE_URL = 'https://nilegrowthworks.com'

/** Drops keys whose value is an empty string, empty array, or undefined. */
function omitEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Partial<T> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue
    if (typeof value === 'string' && value.trim() === '') continue
    if (Array.isArray(value) && value.length === 0) continue
    out[key as keyof T] = value as T[keyof T]
  }
  return out
}

export function buildOrganizationSchema() {
  const org = siteContent.organization

  return omitEmpty({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#org`,
    name: org.name,
    legalName: org.legalName,
    description: org.description,
    url: SITE_URL,
    email: org.email,
    telephone: org.telephone,
    founder: {
      '@type': 'Person',
      name: org.founder,
    },
    address: omitEmpty({
      '@type': 'PostalAddress',
      addressLocality: org.addressLocality,
      addressRegion: org.addressRegion,
      addressCountry: 'US',
    }),
    areaServed: [...org.areaServed],
    sameAs: [...org.sameAs],
    knowsAbout: [
      'Revenue operations',
      'GoHighLevel',
      'n8n',
      'Lifecycle automation',
      'CRM implementation',
      'Lead follow-up automation',
    ],
  })
}

export function buildWebsiteSchema() {
  return omitEmpty({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: siteContent.organization.name,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#org` },
  })
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return omitEmpty({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  })
}

export function buildServiceSchema() {
  const { tiers } = siteContent.services

  return omitEmpty({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/#service`,
    name: 'Revenue Leak Diagnostic',
    serviceType: 'Revenue Leak Diagnostic',
    provider: { '@id': `${SITE_URL}/#org` },
    areaServed: [...siteContent.organization.areaServed],
    description: siteContent.organization.description,
    offers: tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      price: tier.price,
      description: tier.blurb,
    })),
  })
}

export function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return omitEmpty({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })
}
