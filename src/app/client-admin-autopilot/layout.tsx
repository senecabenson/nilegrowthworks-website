import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Admin Autopilot · NILE GrowthWorks',
  description: 'A 5-automation system that runs new client intake, payment reminders, signed paperwork tracking, payment logging, and an end-of-day rollup. Live in about two weeks. $1,500 setup, founding rate.',
  openGraph: {
    title: 'Client Admin Autopilot · NILE GrowthWorks',
    description: 'Stop running your whole client pipeline out of your head. Intake, paperwork, and payment follow-up on autopilot.',
    type: 'website',
  },
}

export default function ClientAdminAutopilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
