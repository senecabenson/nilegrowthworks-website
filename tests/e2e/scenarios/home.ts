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

  // Track console errors
  const consoleErrors: string[] = []
  const consoleHandler = (msg: { type(): string; text(): string }) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  }
  page.on('console', consoleHandler)

  await page.goto(BASE_URL, { waitUntil: 'load' })
  await page.waitForTimeout(2000)

  // ── 1. Hero content — DOM-based ────────────────────────────────────────────
  const heroContent = await page.evaluate(() => {
    const eyebrow = Array.from(document.querySelectorAll('p, span')).find(
      (el) => el.textContent?.includes('REVENUE OPERATIONS')
    )
    const h1 = document.querySelector('h1')
    return {
      eyebrow: eyebrow?.textContent?.trim() || null,
      headline: h1?.textContent?.trim() || null,
    }
  })

  if (!heroContent.eyebrow) {
    failures.push('Hero eyebrow "REVENUE OPERATIONS" not found in DOM')
  }
  if (!heroContent.headline) {
    failures.push('H1 headline not found in DOM')
  } else if (!heroContent.headline.toLowerCase().includes('build it')) {
    failures.push(`H1 headline doesn't contain "Build it": "${heroContent.headline}"`)
  }

  // Check subhead via text search
  const subheadVisible = await page.evaluate(() => {
    const text = document.body.innerText
    return text.includes('We find where your revenue is leaking') ||
           text.includes('revenue is leaking')
  })
  if (!subheadVisible) {
    failures.push('Hero subhead "We find where your revenue is leaking" not visible')
  }

  // ── 2. Scroll page ─────────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)

  // ── 3. Brand integrity — DOM-based ─────────────────────────────────────────
  // Body background
  const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor)
  const rgbMatch = bodyBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number)
    // Ink = rgb(20, 20, 20) or navy = rgb(26, 39, 68) — both are dark
    const isDark = r < 50 && g < 60 && b < 90
    if (!isDark) {
      failures.push(`Body background is not dark ink/navy: ${bodyBg}`)
    }
  }

  // Body font contains Jakarta
  const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily)
  if (!bodyFont.toLowerCase().includes('jakarta')) {
    failures.push(`Body font-family doesn't contain Plus Jakarta Sans: ${bodyFont}`)
  }

  // H1 font contains Fraunces
  const headingFont = await page.evaluate(() => {
    const h1 = document.querySelector('h1')
    return h1 ? window.getComputedStyle(h1).fontFamily : null
  })
  if (!headingFont || !headingFont.toLowerCase().includes('fraunces')) {
    failures.push(`H1 font-family doesn't contain Fraunces: ${headingFont}`)
  }

  // Primary CTA ember background
  const ctaBgFound = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('a, button'))
    for (const el of els) {
      const bg = window.getComputedStyle(el).backgroundColor
      if (bg.includes('214') && bg.includes('181') && bg.includes('58')) return true
    }
    return false
  })
  if (!ctaBgFound) {
    failures.push('No element found with ember background color rgb(214, 181, 58)')
  }

  // ── 4. No undefined/null/NaN in text ──────────────────────────────────────
  const badStrings = await page.evaluate(() => {
    const text = document.body.innerText || ''
    const found: string[] = []
    if (/\bundefined\b/.test(text)) found.push('undefined')
    if (/\bnull\b/.test(text)) found.push('null')
    if (/\bNaN\b/.test(text)) found.push('NaN')
    return found
  })
  if (badStrings.length > 0) {
    failures.push(`Page contains literal bad string: ${badStrings.join(', ')}`)
  }

  // ── 5. Console errors ─────────────────────────────────────────────────────
  const criticalErrors = consoleErrors.filter(
    (e) => !e.includes('favicon') && !e.includes('Preload') && !e.includes('preload') && !e.includes('font')
  )
  if (criticalErrors.length > 0) {
    failures.push(`Console errors on home: ${criticalErrors.slice(0, 3).join('; ')}`)
  }

  // ── 6. Services tier names — DOM-based ────────────────────────────────────
  const pageText = await page.evaluate(() => document.body.innerText)
  const expectedTiers = siteContent.services.tiers.map((t) => t.name)
  for (const tier of expectedTiers) {
    // Check at least first 2 words of tier name appear
    const tierPrefix = tier.split(' ').slice(0, 2).join(' ')
    if (!pageText.includes(tierPrefix)) {
      failures.push(`Service tier "${tier}" (looking for "${tierPrefix}") not visible on home page`)
    }
  }

  // ── 7. Approach steps ────────────────────────────────────────────────────
  const approachSteps = siteContent.approach.steps.map((s) => s.title)
  for (const step of approachSteps) {
    if (!pageText.includes(step)) {
      failures.push(`Approach step "${step}" not visible on home page`)
    }
  }

  // ── 8. Leak viz stage labels ─────────────────────────────────────────────
  for (const stage of siteContent.leak.stages) {
    if (!pageText.includes(stage.label)) {
      failures.push(`Leak stage "${stage.label}" not visible on home page`)
    }
  }

  // ── 9. Final CTA visible ─────────────────────────────────────────────────
  const finalCtaVisible = pageText.includes("Let") && pageText.includes("revenue is leaking")
  if (!finalCtaVisible) {
    failures.push('Final CTA headline not found on home page')
  }

  // ── 10. AI-enhanced extraction (optional) ────────────────────────────────
  if (HAS_AI) {
    try {
      const HeroSchema = z.object({ eyebrow: z.string(), headline: z.string(), subhead: z.string() })
      await stagehand.extract(
        'Extract from the hero section: eyebrow text, main headline, and subheading paragraph.',
        HeroSchema
      )
    } catch (e) {
      // AI extraction failed — DOM assertions above already cover this
      console.log(`    ℹ AI extraction skipped: ${e}`)
    }
  }

  page.off('console', consoleHandler)

  return { name: 'Home — content rendering + brand integrity', failures }
}
