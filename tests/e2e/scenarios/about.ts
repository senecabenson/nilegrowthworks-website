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

  await page.goto(`${BASE_URL}/about`, { waitUntil: 'load' })
  await page.waitForTimeout(2000)

  // ── 1. Founder pull quote ─────────────────────────────────────────────────
  const pullQuoteText = siteContent.about.founderStory.pullQuote
  const pullQuotePrefix = norm(pullQuoteText).slice(0, 30)

  const quoteVisible = await page.evaluate((prefix: string) => {
    return document.body.innerText.toLowerCase().includes(prefix.toLowerCase())
  }, pullQuotePrefix)

  if (!quoteVisible) {
    failures.push(`Founder pull quote not found (looking for: "${pullQuotePrefix}")`)
  }

  // ── 2. Scroll to load all content ─────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)

  const fullPageText = await page.evaluate(() => document.body.innerText)

  // ── 3. Values grid — all 5 values ────────────────────────────────────────
  for (const value of siteContent.about.values) {
    // Check first 2 words of each value name
    const valuePrefix = value.name.split(' ').slice(0, 2).join(' ')
    if (!fullPageText.includes(valuePrefix)) {
      failures.push(`Value "${value.name}" (looking for "${valuePrefix}") not found on about page`)
    }
  }

  // ── 4. Partnership section ────────────────────────────────────────────────
  const partnershipVisible = fullPageText.includes('HOW WE WORK WITH CLIENTS') ||
    fullPageText.includes('Four principles')
  if (!partnershipVisible) {
    failures.push('Partnership section heading not found on about page')
  }

  const firstPrinciple = siteContent.about.partnership.paragraphs[0]
  const principleLeadText = typeof firstPrinciple === 'object' && 'lead' in firstPrinciple
    ? firstPrinciple.lead
    : String(firstPrinciple).slice(0, 20)
  if (!fullPageText.includes('Grounded') && !fullPageText.includes('grounded')) {
    failures.push('Partnership principle "Grounded, not arrogant" not found')
  }

  // ── 5. FinalCTA ───────────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(500)
  const finalText = await page.evaluate(() => document.body.innerText)
  if (!finalText.includes('revenue is leaking') && !finalText.includes('Book a Diagnostic')) {
    failures.push('FinalCTA not found on about page')
  }

  // ── 6. Founder story paragraphs ───────────────────────────────────────────
  const para1Prefix = norm(siteContent.about.founderStory.paragraphs[0]).slice(0, 25)
  if (!fullPageText.toLowerCase().includes(para1Prefix.toLowerCase())) {
    failures.push(`Founder paragraph 1 not found (looking for: "${para1Prefix}")`)
  }

  // ── 7. Proof stats ────────────────────────────────────────────────────────
  let missingStatCount = 0
  for (const stat of siteContent.about.proof.stats) {
    // Check simplified value — handle → character
    const statVal = stat.value.replace(/→/g, '→').trim()
    const prefix = statVal.slice(0, 4)
    if (!fullPageText.includes(prefix)) {
      missingStatCount++
    }
  }
  if (missingStatCount > 2) {
    failures.push(`${missingStatCount}/${siteContent.about.proof.stats.length} proof stats missing from about page`)
  }

  // ── 8. AI-enhanced extraction (optional) ─────────────────────────────────
  if (HAS_AI) {
    try {
      const ValuesSchema = z.object({
        values: z.array(z.object({ name: z.string() })),
      })
      const result = await stagehand.extract(
        'Extract all company values from the values section (Humility Over Ego, Purpose Over Presence, etc.)',
        ValuesSchema
      )
      if (result.values.length < 5) {
        failures.push(`AI extraction: expected 5 values, got ${result.values.length}`)
      }
    } catch (e) {
      console.log(`    ℹ AI extract skipped: ${e}`)
    }
  }

  return { name: 'About page — founder story + values + partnership + FinalCTA', failures }
}
