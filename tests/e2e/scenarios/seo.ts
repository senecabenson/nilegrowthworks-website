import { type Stagehand } from '@browserbasehq/stagehand'

const BASE_URL = 'http://localhost:3000'

const PAGES_WITH_EXPECTED_TYPES: { path: string; expectedTypes: string[] }[] = [
  { path: '/', expectedTypes: ['ProfessionalService', 'WebSite'] },
  { path: '/about', expectedTypes: ['ProfessionalService', 'WebSite', 'BreadcrumbList'] },
  {
    path: '/services',
    expectedTypes: ['ProfessionalService', 'WebSite', 'BreadcrumbList', 'Service', 'FAQPage'],
  },
  { path: '/client-admin-autopilot', expectedTypes: ['ProfessionalService', 'WebSite', 'BreadcrumbList'] },
]

const PLAIN_ROUTES = ['/llms.txt', '/manifest.webmanifest', '/opengraph-image']

export async function run(stagehand: InstanceType<typeof Stagehand>): Promise<{ name: string; failures: string[] }> {
  const failures: string[] = []
  const page = await stagehand.context.awaitActivePage()

  // ── 1. Every page has >= 1 ld+json block, each block parses, @type matches ──
  for (const { path, expectedTypes } of PAGES_WITH_EXPECTED_TYPES) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' })
    await page.waitForTimeout(500)

    const blocks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
        (el) => el.textContent || ''
      )
    )

    if (blocks.length === 0) {
      failures.push(`${path}: no <script type="application/ld+json"> blocks found`)
      continue
    }

    const foundTypes: string[] = []
    for (let i = 0; i < blocks.length; i++) {
      try {
        const parsed = JSON.parse(blocks[i])
        if (parsed['@type']) foundTypes.push(parsed['@type'])
      } catch (e) {
        failures.push(`${path}: ld+json block ${i} failed to JSON.parse: ${e}`)
      }
    }

    for (const expected of expectedTypes) {
      if (!foundTypes.includes(expected)) {
        failures.push(`${path}: expected @type "${expected}" not found among [${foundTypes.join(', ')}]`)
      }
    }
  }

  // ── 2. Plain routes return 200 ───────────────────────────────────────────
  for (const path of PLAIN_ROUTES) {
    const res = await fetch(`${BASE_URL}${path}`)
    if (res.status !== 200) {
      failures.push(`${path}: expected status 200, got ${res.status}`)
    }
  }

  // ── 3. /services FAQ copy is on the page ─────────────────────────────────
  await page.goto(`${BASE_URL}/services`, { waitUntil: 'load' })
  await page.waitForTimeout(500)
  const servicesText = await page.evaluate(() => document.body.innerText)
  if (!servicesText.includes('Revenue Leak Diagnostic?')) {
    failures.push('/services: FAQ question "What is a Revenue Leak Diagnostic?" not visible')
  }

  return { name: 'SEO — JSON-LD, llms.txt, manifest, OG image', failures }
}
