import { type Stagehand } from '@browserbasehq/stagehand'
import { z } from 'zod'
import { siteContent } from '../../../src/content/site'

const BASE_URL = 'http://localhost:3000'
const HAS_AI = !!process.env.ANTHROPIC_API_KEY

function norm(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

export async function run(stagehand: InstanceType<typeof Stagehand>): Promise<{ name: string; failures: string[] }> {
  const failures: string[] = []

  const page = await stagehand.context.awaitActivePage()

  await page.goto(`${BASE_URL}/services`, { waitUntil: 'load' })
  await page.waitForTimeout(2000)

  const pageText = await page.evaluate(() => document.body.innerText)

  // ── 1. Page eyebrow and headline ──────────────────────────────────────────
  if (!pageText.toUpperCase().includes('SERVICES')) {
    failures.push('Services page eyebrow "SERVICES" not found')
  }
  if (!pageText.toLowerCase().includes('three tiers') && !pageText.toLowerCase().includes('three')) {
    failures.push('Services page headline "three tiers" not found')
  }

  // ── 2. Tier names ─────────────────────────────────────────────────────────
  for (const tier of siteContent.services.tiers) {
    // Check first 2+ words of tier name
    const tierWords = tier.name.split(' ').slice(0, 3).join(' ')
    if (!pageText.includes(tierWords)) {
      failures.push(`Tier "${tier.name}" (looking for "${tierWords}") not found on services page`)
    }
  }

  // ── 3. Tier prices ────────────────────────────────────────────────────────
  // Tier 1 price
  if (!pageText.includes('$500') && !pageText.includes('500')) {
    failures.push('Tier 1 price ($500–$750) not visible on services page')
  }
  // Tier 2 price
  if (!pageText.includes('$5,000') && !pageText.includes('5,000') && !pageText.includes('5K')) {
    failures.push('Tier 2 price ($5,000 setup) not visible on services page')
  }

  // ── 4. Scroll and check comparison table ─────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1000)

  const fullPageText = await page.evaluate(() => document.body.innerText)
  const fullPageTextUpper = fullPageText.toUpperCase()

  // Check comparison table rows (case-insensitive — table may render in ALL CAPS)
  for (const row of siteContent.services.comparison.rows) {
    if (!fullPageTextUpper.includes(row.label.toUpperCase())) {
      failures.push(`Comparison table row "${row.label}" not visible on services page`)
    }
  }

  // ── 5. FinalCTA ───────────────────────────────────────────────────────────
  const hasFinalCta = fullPageText.includes('revenue is leaking') || fullPageText.includes('Book a Diagnostic')
  if (!hasFinalCta) {
    failures.push('FinalCTA not found on services page')
  }

  // ── 6. Tier 1 bullets ────────────────────────────────────────────────────
  const tier1Bullets = siteContent.services.tiers[0].bullets.slice(0, 4)
  for (const bullet of tier1Bullets) {
    const bulletPrefix = norm(bullet).slice(0, 20)
    if (!fullPageText.includes(bulletPrefix)) {
      failures.push(`Tier 1 bullet "${bullet}" not found on services page`)
    }
  }

  // ── 7. AI-enhanced extraction (optional) ─────────────────────────────────
  if (HAS_AI) {
    try {
      const TiersSchema = z.object({
        tiers: z.array(z.object({ name: z.string(), price: z.string() })),
      })
      const result = await stagehand.extract(
        'Extract the three service tier cards with their name and price.',
        TiersSchema
      )
      if (result.tiers.length < 3) {
        failures.push(`AI extraction: expected 3 tiers, got ${result.tiers.length}`)
      }
    } catch (e) {
      console.log(`    ℹ AI extract skipped: ${e}`)
    }
  }

  return { name: 'Services page — tiers + comparison + FinalCTA', failures }
}
