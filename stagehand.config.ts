import type { V3Options } from '@browserbasehq/stagehand'

export const stagehandConfig: V3Options = {
  env: 'LOCAL',
  model: {
    modelName: 'claude-sonnet-4-6',
    apiKey: process.env.ANTHROPIC_API_KEY!,
  },
  verbose: 1,
  localBrowserLaunchOptions: {
    headless: process.env.HEADLESS !== 'false',
  },
  domSettleTimeout: 5_000,
}
