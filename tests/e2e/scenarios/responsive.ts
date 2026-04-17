import { type Stagehand } from '@browserbasehq/stagehand'
import * as path from 'path'
import * as fs from 'fs'

const BASE_URL = 'http://localhost:3000'

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
]

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
]

const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots')

export async function run(stagehand: InstanceType<typeof Stagehand>): Promise<{ name: string; failures: string[] }> {
  const failures: string[] = []

  const page = await stagehand.context.awaitActivePage()

  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
  }

  for (const viewport of VIEWPORTS) {
    // setViewportSize takes (width, height) as separate args in V3
    await page.setViewportSize(viewport.width, viewport.height)
    await page.waitForTimeout(300)

    for (const pageInfo of PAGES) {
      await page.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'load' })
      await page.waitForTimeout(1500)

      // ── 1. No horizontal scroll ──────────────────────────────────────────
      const scrollInfo = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }))

      if (scrollInfo.scrollWidth > scrollInfo.innerWidth + 1) {
        failures.push(
          `Horizontal scroll at ${viewport.width}px on ${pageInfo.path}: ` +
          `scrollWidth=${scrollInfo.scrollWidth}, innerWidth=${scrollInfo.innerWidth}`
        )
      }

      // ── 2. Nav visible ────────────────────────────────────────────────────
      const navVisible = await page.evaluate(() => {
        const nav = document.querySelector('nav') ||
          document.querySelector('[role="navigation"]') ||
          document.querySelector('header')
        if (!nav) return false
        const rect = nav.getBoundingClientRect()
        return rect.height > 0 && rect.width > 0
      })
      if (!navVisible) {
        failures.push(`Nav not visible at ${viewport.width}px on ${pageInfo.path}`)
      }

      // ── 3. Screenshot ─────────────────────────────────────────────────────
      const screenshotPath = path.join(SCREENSHOTS_DIR, `${pageInfo.name}-${viewport.width}.png`)
      try {
        // V3 Page screenshot — returns Buffer, optionally writes to path
        await page.screenshot({ path: screenshotPath, fullPage: true })
      } catch (e) {
        failures.push(`Screenshot failed for ${pageInfo.name} at ${viewport.width}px: ${e}`)
      }
    }

    // ── 4. Calculator sliders reachable on home ───────────────────────────
    await page.goto(BASE_URL, { waitUntil: 'load' })
    await page.waitForTimeout(1500)

    // Scroll to calculator
    await page.evaluate(() => {
      const sliders = document.querySelectorAll('input[type="range"]')
      if (sliders.length > 0) (sliders[0] as HTMLElement).scrollIntoView({ block: 'center' })
    })
    await page.waitForTimeout(500)

    const sliderCount = await page.evaluate(() =>
      document.querySelectorAll('input[type="range"]').length
    )

    if (sliderCount < 4) {
      failures.push(`Only ${sliderCount} sliders found at ${viewport.width}px (expected 4)`)
    }

    // ── 5. Mobile touch target check (390px only) ─────────────────────────
    if (viewport.width === 390) {
      const sliderContainerHeights = await page.evaluate(() => {
        const sliders = Array.from(document.querySelectorAll('input[type="range"]'))
        return sliders.map((s) => {
          // Check the slider's own minHeight or container height
          const el = s as HTMLElement
          const containerEl = el.closest('.space-y-3') || el.parentElement
          if (containerEl) {
            return containerEl.getBoundingClientRect().height
          }
          return el.getBoundingClientRect().height
        })
      })

      for (let i = 0; i < sliderContainerHeights.length; i++) {
        if (sliderContainerHeights[i] < 44) {
          failures.push(
            `Slider ${i} container height too small at 390px: ${sliderContainerHeights[i].toFixed(0)}px (min 44px for touch target)`
          )
        }
      }

      // ── 6. Anchor jump #diagnostic doesn't hide under nav ─────────────────
      await page.goto(`${BASE_URL}/#diagnostic`, { waitUntil: 'load' })
      await page.waitForTimeout(800)

      const diagnosticCheck = await page.evaluate(() => {
        const section = document.getElementById('diagnostic')
        if (!section) return { found: false, sectionTop: 0, navHeight: 0 }

        const sectionRect = section.getBoundingClientRect()
        const nav = document.querySelector('nav') || document.querySelector('header')
        const navHeight = nav ? nav.getBoundingClientRect().bottom : 0

        return {
          found: true,
          sectionTop: sectionRect.top,
          navHeight,
        }
      })

      if (!diagnosticCheck.found) {
        failures.push('#diagnostic section not found in DOM at 390px')
      } else if (diagnosticCheck.sectionTop < -10) {
        // Section top should not be way above viewport (hidden behind nav)
        failures.push(
          `#diagnostic appears hidden at 390px: sectionTop=${diagnosticCheck.sectionTop.toFixed(0)}, navBottom=${diagnosticCheck.navHeight.toFixed(0)}`
        )
      }
    }
  }

  // ── 7. Verify screenshots were created ────────────────────────────────────
  const expectedScreenshots = PAGES.flatMap((p) =>
    VIEWPORTS.map((v) => `${p.name}-${v.width}.png`)
  )

  for (const filename of expectedScreenshots) {
    const screenshotPath = path.join(SCREENSHOTS_DIR, filename)
    if (!fs.existsSync(screenshotPath)) {
      failures.push(`Missing screenshot: ${filename}`)
    }
  }

  return { name: 'Responsive — 1440/1024/768/390px no-scroll + screenshots', failures }
}
