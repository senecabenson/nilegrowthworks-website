import { type Stagehand } from '@browserbasehq/stagehand'
import { z } from 'zod'
import { siteContent } from '../../../src/content/site'

const BASE_URL = 'http://localhost:3000'
const HAS_AI = !!process.env.ANTHROPIC_API_KEY

// Calculator formula (same as implementation)
function calcExpected(avgTicket: number, missedPerWeek: number, followUpHours: number, repeatRate: number) {
  const weeksPerMonth = 4.33
  const missedRevenue = avgTicket * missedPerWeek * weeksPerMonth
  const followUpLoss = missedRevenue * Math.min(followUpHours / 48, 1) * 0.78
  const nurtureGap = avgTicket * repeatRate * missedPerWeek * weeksPerMonth * 0.6
  const totalMonthly = missedRevenue + followUpLoss + nurtureGap
  return { missedRevenue, followUpLoss, nurtureGap, totalMonthly }
}

export async function run(stagehand: InstanceType<typeof Stagehand>): Promise<{ name: string; failures: string[] }> {
  const failures: string[] = []

  const page = await stagehand.context.awaitActivePage()

  await page.goto(BASE_URL, { waitUntil: 'load' })
  await page.waitForTimeout(2000)

  // Scroll to calculator section
  await page.evaluate(function() {
    var els = document.querySelectorAll('*')
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent && els[i].textContent.trim() === 'SEE YOUR NUMBERS') {
        els[i].scrollIntoView({ block: 'center' })
        return
      }
    }
    window.scrollTo(0, document.body.scrollHeight / 2)
  })
  await page.waitForTimeout(1000)

  // ── 1. Verify sliders exist ────────────────────────────────────────────────
  const sliderCount = await page.evaluate(function() {
    return document.querySelectorAll('input[type="range"]').length
  })
  if (sliderCount < 4) {
    failures.push('Expected 4 range sliders in calculator, found ' + sliderCount)
  }

  // ── 2. Preset dropdown has HVAC option ────────────────────────────────────
  const dropdownHasHVAC = await page.evaluate(function() {
    var select = document.querySelector('select')
    if (!select) return false
    var options = Array.from(select.options)
    for (var i = 0; i < options.length; i++) {
      if (options[i].text.indexOf('HVAC') !== -1) return true
    }
    return false
  })
  if (!dropdownHasHVAC) {
    failures.push('Calculator dropdown missing "HVAC & Plumbing" option')
  }

  // ── 3. Select HVAC preset ─────────────────────────────────────────────────
  if (HAS_AI) {
    try {
      await stagehand.act("Select 'HVAC & Plumbing' from the Business Type dropdown in the calculator")
      await page.waitForTimeout(800)
    } catch (e) {
      // Fall back to DOM
      await page.evaluate(function() {
        var select = document.querySelector('select')
        if (!select) return
        var options = Array.from(select.options)
        for (var i = 0; i < options.length; i++) {
          if (options[i].text.indexOf('HVAC') !== -1) {
            select.value = options[i].value
            select.dispatchEvent(new Event('change', { bubbles: true }))
            return
          }
        }
      })
      await page.waitForTimeout(800)
    }
  } else {
    // DOM-based preset selection
    await page.evaluate(function() {
      var select = document.querySelector('select')
      if (!select) return
      var options = Array.from(select.options)
      for (var i = 0; i < options.length; i++) {
        if (options[i].text.indexOf('HVAC') !== -1) {
          select.value = options[i].value
          select.dispatchEvent(new Event('change', { bubbles: true }))
          return
        }
      }
    })
    await page.waitForTimeout(800)
  }

  // Verify HVAC preset
  const hvacPreset = siteContent.calculator.presets['HVAC & Plumbing']
  const sliderVals = await page.evaluate(function() {
    var sliders = Array.from(document.querySelectorAll('input[type="range"]'))
    return sliders.map(function(s) { return parseFloat((s as HTMLInputElement).value) })
  })
  if (sliderVals.length >= 2) {
    if (Math.abs(sliderVals[0] - hvacPreset.avgTicket) > 100) {
      failures.push('HVAC preset: avgTicket expected ~' + hvacPreset.avgTicket + ', got ' + sliderVals[0])
    }
  }

  // ── 4. Set sliders to test vector using nativeInputValueSetter ────────────
  // avgTicket=1000, missedPerWeek=5, followUpHours=48, repeatRate=0.50 (50 in slider)
  await page.evaluate(function() {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    )
    var setter = nativeInputValueSetter ? nativeInputValueSetter.set : null
    var sliders = Array.from(document.querySelectorAll('input[type="range"]'))
    if (sliders.length < 4) return

    function setSlider(slider: any, val: any) {
      if (setter) setter.call(slider, val)
      else (slider as HTMLInputElement).value = val
      slider.dispatchEvent(new Event('input', { bubbles: true }))
      slider.dispatchEvent(new Event('change', { bubbles: true }))
    }

    setSlider(sliders[0], '1000')  // avgTicket
    setSlider(sliders[1], '5')     // missedPerWeek
    setSlider(sliders[2], '48')    // followUpHours
    setSlider(sliders[3], '50')    // repeatRate (50% on 0-90 scale)
  })
  await page.waitForTimeout(2000)

  // ── 5. Assert monthly total within ±$100 of expected ─────────────────────
  const expected = calcExpected(1000, 5, 48, 0.50)

  // Extract dollar amounts from page text
  const dollarAmounts = await page.evaluate(function() {
    var spans = Array.from(document.querySelectorAll('span'))
    var found = []
    for (var i = 0; i < spans.length; i++) {
      var text = (spans[i].innerText || '').trim()
      // Match standalone dollar amounts like $45,032
      if (text.charAt(0) === '$' && text.length < 12 && text.indexOf('/') === -1) {
        var val = parseFloat(text.replace(/[$,]/g, ''))
        if (!isNaN(val) && val > 5000 && val < 300000) {
          found.push(val)
        }
      }
    }
    return found
  })

  if (dollarAmounts.length === 0) {
    failures.push('No dollar amounts found in calculator output panel after setting sliders')
  } else {
    const monthlyMatch = dollarAmounts.find((v) => Math.abs(v - expected.totalMonthly) <= 100)
    if (!monthlyMatch) {
      failures.push(
        'Calculator monthly total mismatch. Expected ~$' + expected.totalMonthly.toFixed(0) +
        ' (±$100). Found: ' + dollarAmounts.map((v) => '$' + v.toFixed(0)).join(', ')
      )
    }
  }

  // ── 6. CTA href ───────────────────────────────────────────────────────────
  const ctaHref = await page.evaluate(function() {
    var links = Array.from(document.querySelectorAll('a'))
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || ''
      if (href.indexOf('mailto:') === 0 &&
          (href.indexOf('senecacbenson') !== -1 || href.indexOf('Revenue') !== -1)) {
        return href
      }
    }
    // Fallback: any mailto
    var allMailto = Array.from(document.querySelectorAll('a[href^="mailto:"]'))
    return allMailto.length > 0 ? allMailto[0].getAttribute('href') : null
  })

  if (!ctaHref) {
    failures.push('No mailto CTA found on calculator page')
  } else {
    var decoded = decodeURIComponent(ctaHref)
    if (decoded.indexOf('senecacbenson@gmail.com') === -1) {
      failures.push('Calculator CTA missing correct email: ' + ctaHref.slice(0, 100))
    }
    if (decoded.toLowerCase().indexOf('revenue') === -1 && decoded.toLowerCase().indexOf('diagnostic') === -1) {
      failures.push('Calculator CTA missing "Revenue Leak Diagnostic" in subject: ' + ctaHref.slice(0, 120))
    }
  }

  // ── 7. AI-enhanced verification (optional) ────────────────────────────────
  if (HAS_AI) {
    try {
      const MonthlySchema = z.object({ monthlyTotal: z.string() })
      const result = await stagehand.extract(
        'Find the large monthly revenue leak number in the calculator results panel.',
        MonthlySchema
      )
      const displayedNum = parseFloat(result.monthlyTotal.replace(/[^0-9.]/g, ''))
      if (!isNaN(displayedNum) && Math.abs(displayedNum - expected.totalMonthly) > 100) {
        failures.push(
          'AI extraction: monthly total $' + displayedNum.toFixed(0) +
          ' != expected ~$' + expected.totalMonthly.toFixed(0) + ' (±$100)'
        )
      }
    } catch (e) {
      console.log('    ℹ AI extract skipped: ' + e)
    }
  }

  return { name: 'Calculator — interactive logic + CTA', failures }
}
