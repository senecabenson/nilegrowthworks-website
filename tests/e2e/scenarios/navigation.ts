import { type Stagehand } from '@browserbasehq/stagehand'

const BASE_URL = 'http://localhost:3000'
const HAS_AI = !!process.env.ANTHROPIC_API_KEY

export async function run(stagehand: InstanceType<typeof Stagehand>): Promise<{ name: string; failures: string[] }> {
  const failures: string[] = []

  const page = await stagehand.context.awaitActivePage()

  // ── 1. Nav links via DOM click ─────────────────────────────────────────────
  await page.goto(BASE_URL, { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  // Click Services nav link via DOM
  const servicesClicked = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a'))
    const link = links.find((l) => l.textContent?.trim() === 'Services')
    if (link) {
      (link as HTMLAnchorElement).click()
      return true
    }
    return false
  })

  if (!servicesClicked) {
    failures.push('Services nav link not found in nav')
  } else {
    await page.waitForTimeout(1500)
    const url = page.url()
    if (!url.includes('/services')) {
      failures.push(`Services nav: expected /services URL, got ${url}`)
    }
  }

  // Click About nav link
  await page.goto(BASE_URL, { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  const aboutClicked = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a'))
    const link = links.find((l) => l.textContent?.trim() === 'About')
    if (link) {
      (link as HTMLAnchorElement).click()
      return true
    }
    return false
  })

  if (!aboutClicked) {
    failures.push('About nav link not found in nav')
  } else {
    await page.waitForTimeout(1500)
    const url = page.url()
    if (!url.includes('/about')) {
      failures.push(`About nav: expected /about URL, got ${url}`)
    }
  }

  // Home link
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  const homeClicked = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a'))
    const link = links.find((l) => l.textContent?.trim() === 'Home')
    if (link) {
      (link as HTMLAnchorElement).click()
      return true
    }
    return false
  })

  if (!homeClicked) {
    failures.push('Home nav link not found in nav')
  } else {
    await page.waitForTimeout(1500)
    const url = page.url()
    if (!url.endsWith('/') && !url.endsWith(':3000') && !url.match(/localhost:3000\/?$/)) {
      failures.push(`Home nav: expected / URL, got ${url}`)
    }
  }

  // ── 2. Nav CTA href ───────────────────────────────────────────────────────
  await page.goto(BASE_URL, { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  const navCtaHref = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'))
    // Find the nav-level CTA — typically says "Start a Diagnostic"
    const cta = links.find((l) =>
      (l.textContent?.includes('Start a Diagnostic') || l.textContent?.includes('Diagnostic →')) &&
      !l.closest('section') // prefer header-level links
    )
    return cta ? cta.getAttribute('href') : null
  })

  if (!navCtaHref) {
    failures.push('Nav "Start a Diagnostic" CTA not found')
  } else if (!navCtaHref.includes('#diagnostic') && !navCtaHref.includes('mailto:')) {
    failures.push(`Nav CTA href unexpected (expected #diagnostic or mailto): ${navCtaHref}`)
  }

  // ── 3. Hero CTAs ──────────────────────────────────────────────────────────
  const heroPrimaryHref = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'))
    const cta = links.find((l) =>
      l.textContent?.includes('$500 Diagnostic') ||
      (l.textContent?.includes('Start the') && l.textContent?.includes('Diagnostic'))
    )
    return cta ? cta.getAttribute('href') : null
  })

  if (!heroPrimaryHref) {
    failures.push('Hero primary CTA not found')
  } else if (!heroPrimaryHref.includes('mailto:senecacbenson@gmail.com')) {
    failures.push(`Hero primary CTA doesn't link to mailto: ${heroPrimaryHref}`)
  }

  const heroSecondaryHref = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'))
    const cta = links.find((l) => l.textContent?.trim().includes('See how we work'))
    return cta ? cta.getAttribute('href') : null
  })

  if (!heroSecondaryHref) {
    failures.push('Hero secondary CTA "See how we work" not found')
  } else if (!heroSecondaryHref.includes('/services')) {
    failures.push(`Hero secondary CTA unexpected href: ${heroSecondaryHref}`)
  }

  // ── 4. FinalCTA on every page ─────────────────────────────────────────────
  for (const pagePath of ['/', '/services', '/about']) {
    await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'load' })
    await page.waitForTimeout(1000)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const finalCtaHref = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="Revenue Leak Diagnostic"], a[href*="Revenue%20Leak%20Diagnostic"]'))
      if (links.length > 0) return (links[0] as HTMLAnchorElement).getAttribute('href')

      // Also check decoded href
      const allLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]'))
      for (const l of allLinks) {
        const href = decodeURIComponent((l as HTMLAnchorElement).getAttribute('href') || '')
        if (href.includes('Revenue Leak Diagnostic')) return (l as HTMLAnchorElement).getAttribute('href')
      }
      return null
    })

    if (!finalCtaHref) {
      failures.push(`FinalCTA on ${pagePath}: no mailto link with "Revenue Leak Diagnostic"`)
    }

    // 404 check
    const is404 = await page.evaluate(() => /404|page not found/i.test(document.body.innerText.slice(0, 500)))
    if (is404) failures.push(`${pagePath}: page appears to be a 404`)
  }

  // ── 5. About ghost CTA on home ────────────────────────────────────────────
  await page.goto(BASE_URL, { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  const aboutCtaFound = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).some((l) => {
      const href = l.getAttribute('href') || ''
      return href.includes('/about') && (l.textContent?.trim().length || 0) > 0
    })
  })

  if (!aboutCtaFound) {
    failures.push('Link to /about not found on home page')
  }

  // ── 6. Internal link 404 check ────────────────────────────────────────────
  const internalLinks = await page.evaluate(() => {
    const hrefs = new Set<string>()
    document.querySelectorAll('a[href]').forEach((l) => {
      const href = l.getAttribute('href') || ''
      if (href.startsWith('/') && !href.startsWith('//') && href !== '/' && !href.includes('#')) {
        hrefs.add(href.split('?')[0])
      }
    })
    return Array.from(hrefs)
  })

  for (const href of internalLinks) {
    await page.goto(`${BASE_URL}${href}`, { waitUntil: 'load' })
    await page.waitForTimeout(300)
    const is404 = await page.evaluate(() => /404|page not found/i.test(document.body.innerText.slice(0, 300)))
    if (is404) failures.push(`Internal link ${href} returns 404`)
  }

  // ── 7. AI-enhanced nav test (optional) ───────────────────────────────────
  if (HAS_AI) {
    await page.goto(BASE_URL, { waitUntil: 'load' })
    await page.waitForTimeout(1000)
    try {
      await stagehand.act('Click the "Services" link in the navigation bar')
      await page.waitForTimeout(1000)
      const url = page.url()
      if (!url.includes('/services')) {
        failures.push(`AI nav test: Services link didn't navigate to /services (got ${url})`)
      }
    } catch (e) {
      console.log(`    ℹ AI act skipped: ${e}`)
    }
  }

  return { name: 'Navigation — CTAs + internal links', failures }
}
