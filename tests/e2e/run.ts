import { Stagehand, type V3Options } from '@browserbasehq/stagehand'
import { spawn, ChildProcess } from 'child_process'
import * as path from 'path'

// ─── Import all scenarios ────────────────────────────────────────────────────
import { run as runHome } from './scenarios/home'
import { run as runCalculator } from './scenarios/calculator'
import { run as runNavigation } from './scenarios/navigation'
import { run as runServices } from './scenarios/services'
import { run as runAbout } from './scenarios/about'
import { run as runResponsive } from './scenarios/responsive'

const BASE_URL = 'http://localhost:3000'
const HAS_AI = !!process.env.ANTHROPIC_API_KEY

// ─── Port availability check ─────────────────────────────────────────────────
async function isPortOpen(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
    return res.status < 500
  } catch {
    return false
  }
}

async function waitForPort(url: string, maxMs = 120_000): Promise<void> {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    if (await isPortOpen(url)) return
    await new Promise((r) => setTimeout(r, 1000))
  }
  throw new Error(`Server at ${url} did not start within ${maxMs / 1000}s`)
}

// ─── Server bootstrap ─────────────────────────────────────────────────────────
let serverProc: ChildProcess | null = null

async function ensureServer(): Promise<void> {
  if (await isPortOpen(BASE_URL)) {
    console.log('  ✓ Server already running at', BASE_URL)
    return
  }

  console.log('  Building and starting server...')
  const cwd = path.resolve(__dirname, '../..')

  // Build first
  await new Promise<void>((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    build.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Build failed with exit code ${code}`))
    })
  })

  // Then start
  serverProc = spawn('npm', ['run', 'start'], {
    cwd,
    stdio: 'pipe',
    shell: true,
  })

  await waitForPort(BASE_URL)
  console.log('  ✓ Server started')
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n══════════════════════════════════════════')
  console.log('  NILE GrowthWorks — Stagehand E2E Suite ')
  console.log('══════════════════════════════════════════\n')

  if (!HAS_AI) {
    console.log('  ℹ ANTHROPIC_API_KEY not set — running in DOM-only mode.')
    console.log('  ℹ AI-driven assertions (stagehand.act/extract) will be skipped.\n')
  }

  // Start server if needed
  console.log('► Bootstrapping server...')
  await ensureServer()

  // Boot Stagehand (AI key optional — DOM assertions work without it)
  console.log('\n► Initializing Stagehand...')

  const config: V3Options = {
    env: 'LOCAL',
    ...(HAS_AI && {
      model: {
        modelName: 'claude-sonnet-4-6',
        apiKey: process.env.ANTHROPIC_API_KEY!,
      },
    }),
    verbose: 0,
    localBrowserLaunchOptions: {
      headless: process.env.HEADLESS !== 'false',
    },
    domSettleTimeout: 5_000,
  }

  const stagehand = new Stagehand(config)
  await stagehand.init()

  // Get the active page and set up global console error tracking
  const page = await stagehand.context.awaitActivePage()
  const globalErrors: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      globalErrors.push(`[console.error] ${msg.text()}`)
    }
  })

  // ── Run scenarios ─────────────────────────────────────────────────────────
  const scenarios = [
    { name: 'home', fn: runHome },
    { name: 'calculator', fn: runCalculator },
    { name: 'navigation', fn: runNavigation },
    { name: 'services', fn: runServices },
    { name: 'about', fn: runAbout },
    { name: 'responsive', fn: runResponsive },
  ]

  const results: Array<{ name: string; failures: string[]; passed: boolean }> = []

  for (const scenario of scenarios) {
    console.log(`\n► Running scenario: ${scenario.name}`)
    try {
      const result = await scenario.fn(stagehand)
      const scenarioResult = {
        name: result.name,
        failures: result.failures,
        passed: result.failures.length === 0,
      }
      results.push(scenarioResult)

      if (scenarioResult.passed) {
        console.log(`  ✓ PASS: ${result.name}`)
      } else {
        console.log(`  ✗ FAIL: ${result.name}`)
        result.failures.forEach((f) => console.log(`    - ${f}`))
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      results.push({
        name: scenario.name,
        failures: [`Scenario threw: ${errMsg}`],
        passed: false,
      })
      console.log(`  ✗ FAIL (thrown): ${scenario.name}`)
      console.log(`    - ${errMsg}`)
    }
  }

  // ── Teardown ──────────────────────────────────────────────────────────────
  await stagehand.close()
  if (serverProc) {
    serverProc.kill('SIGTERM')
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════')
  console.log('  RESULTS')
  console.log('══════════════════════════════════════════')
  let anyFailed = false
  for (const r of results) {
    const icon = r.passed ? '✓' : '✗'
    console.log(`  ${icon} ${r.name}`)
    if (!r.passed) {
      r.failures.forEach((f) => console.log(`      └─ ${f}`))
      anyFailed = true
    }
  }

  const total = results.length
  const passed = results.filter((r) => r.passed).length
  console.log(`\n  ${passed}/${total} scenarios passed`)
  if (!HAS_AI) {
    console.log('  (DOM-only mode — set ANTHROPIC_API_KEY for full AI assertion coverage)\n')
  } else {
    console.log()
  }

  if (globalErrors.length > 0) {
    console.log('  Global page errors captured:')
    globalErrors.slice(0, 10).forEach((e) => console.log(`    - ${e}`))
  }

  process.exit(anyFailed ? 1 : 0)
}

main().catch((err) => {
  console.error('\n❌ Runner crashed:', err)
  if (serverProc) serverProc.kill('SIGTERM')
  process.exit(1)
})
