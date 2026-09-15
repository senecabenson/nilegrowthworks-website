export interface LeakStat {
  stat: string
  descriptor: string
  detail: string
}

export interface HowItWorksStep {
  step: string
  title: string
  body: string
}

export interface ServiceFaqItem {
  question: string
  answer: string
}

export interface ServicePage {
  slug: string
  vertical: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  h1Accent: string
  eyebrow: string
  intro: string
  leakStats: LeakStat[]
  howItWorks: HowItWorksStep[]
  faq: ServiceFaqItem[]
  cta: { label: string; href: string }
  updatedAt: string
}

export const servicePages: ServicePage[] = [
  {
    slug: 'revenue-leak-diagnostic-property-management',
    vertical: 'Property Management',
    title: 'Revenue Leak Diagnostic for Property Management',
    metaTitle: 'Property Mgmt Revenue Leak Diagnostic · NILE GrowthWorks',
    metaDescription:
      'Property management revenue leak diagnostic for San Diego owners. A $500-$750 session maps missed placements and slow follow-up costing you money.',
    h1: 'Find the property management revenue leak in San Diego before it costs you another owner.',
    h1Accent: 'before it costs you another owner.',
    eyebrow: 'PROPERTY MANAGEMENT · REVENUE LEAK DIAGNOSTIC',
    intro:
      "San Diego property managers run into the same problem every month: the property management revenue leak San Diego owners never see coming, because it never shows up on a P&L. It hides in the gap between a signed lease and the follow-up call nobody made, between an interested owner and the email sitting unanswered for two days. NILE GrowthWorks runs a $500 to $750 diagnostic built for property management companies doing $500K to $5M a year. In 60 to 90 minutes we map where owner leads go cold, where tenant renewals slip, and what each dropped thread costs every month. You leave with numbers, not guesses.",
    leakStats: [
      {
        stat: '$8,100/mo',
        descriptor: 'recoverable from missed owner placements',
        detail:
          'Three missed placements a month at $2,700 average management value. Most owner acquisition leaks start at the first unreturned email, before a contract is ever on the table.',
      },
      {
        stat: '48 hrs',
        descriptor: 'average reply time to a new owner inquiry',
        detail:
          'By hour 48, the owner has toured two other management companies and already formed an opinion. Speed to first contact decides most of these deals before a phone call ever happens.',
      },
      {
        stat: '22%',
        descriptor: 'of tenant renewals never get a follow-up',
        detail:
          'No renewal reminder system in place means lease-end conversations happen late or never. Every avoidable turnover costs a vacancy period, a make-ready, and a new owner-facing risk.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Find the Leak',
        body: 'A 60 to 90 minute session walking your owner acquisition funnel, tenant renewal process, and maintenance request handoffs. We price every gap in dollars, not vibes.',
      },
      {
        step: '02',
        title: 'Build the System',
        body: 'If you move into Full Engagement, we wire up owner lead capture, renewal reminders, and maintenance dispatch so the property management team stops chasing paper.',
      },
      {
        step: '03',
        title: 'Keep It Running',
        body: 'Monthly reporting on placements, renewals, and response times, so the system keeps performing as your door count grows instead of drifting back to manual work.',
      },
    ],
    faq: [
      {
        question: 'What does a property management revenue leak diagnostic in San Diego find?',
        answer:
          'It finds the exact points where owner leads and tenant renewals stall inside your process, priced in dollars. Most property management companies lose money at owner inquiry response time, tenant renewal follow-up, and maintenance dispatch handoffs. The 60 to 90 minute session maps each gap and hands you a written report showing what it costs every month and what fixing it is worth.',
      },
      {
        question: 'How much does a Revenue Leak Diagnostic cost for a property management company?',
        answer:
          'The diagnostic runs $500 to $750 depending on the size of your portfolio and how many systems we need to review. If you move forward into a Full Engagement build afterward, the diagnostic fee is credited toward setup, so the audit never becomes a sunk cost.',
      },
      {
        question: 'Do you work with owner-side, tenant-side, or both parts of property management?',
        answer:
          'Both. Owner acquisition and tenant retention leak revenue in different ways, and most companies only track one of them closely. The diagnostic covers your full funnel: how fast owner leads get a reply, how renewals get scheduled, and how maintenance requests move from tenant to vendor to invoice.',
      },
      {
        question: "What if we're already using property management software?",
        answer:
          "Software alone doesn't stop a leak. Most property management platforms hold the data but don't automate the follow-up, the renewal reminder, or the missed-call response. The diagnostic looks at what your current stack already does well and where a manual step is still quietly costing you owners or tenants.",
      },
      {
        question: 'How long until we see the results of the diagnostic?',
        answer:
          'The session itself is live and runs 60 to 90 minutes. Your written report, with a prioritized fix list and dollar estimates for each fix, follows within about a week. Nothing changes in your business during the diagnostic itself. It is a paid audit, not an implementation.',
      },
    ],
    cta: { label: 'Book the PM Diagnostic', href: 'mailto:hello@nilegrowthworks.com?subject=Property Management Revenue Leak Diagnostic' },
    updatedAt: '2026-09-15',
  },
  {
    slug: 'revenue-leak-diagnostic-hvac-plumbing',
    vertical: 'HVAC & Plumbing',
    title: 'Revenue Leak Diagnostic for HVAC & Plumbing',
    metaTitle: 'HVAC & Plumbing Revenue Leak Diagnostic · NILE GrowthWorks',
    metaDescription:
      'HVAC plumbing missed calls cost San Diego shops real revenue. Our $500-$750 diagnostic maps every leak and hands you a fix list within a week.',
    h1: 'HVAC plumbing missed calls are draining revenue out of your San Diego shop, right now.',
    h1Accent: 'right now.',
    eyebrow: 'HVAC & PLUMBING · REVENUE LEAK DIAGNOSTIC',
    intro:
      "Every ringing phone your HVAC or plumbing shop doesn't answer is a ticket walking to a competitor. HVAC plumbing missed calls revenue San Diego shops lose adds up fast: a $700 average service call, four missed calls a week, and no system catching any of it. NILE GrowthWorks runs a $500 to $750 diagnostic built for HVAC and plumbing operators doing $500K to $5M a year. In 60 to 90 minutes we map missed calls, slow dispatch, and rebooking gaps, and price exactly what each one costs. You leave with a report, not a sales pitch.",
    leakStats: [
      {
        stat: '$11,200/mo',
        descriptor: 'lost to missed calls',
        detail:
          'Four missed calls a week at a $700 average ticket, with no missed-call text-back to recover the job. Emergency HVAC and plumbing calls go to whoever answers first, rarely the shop letting it ring.',
      },
      {
        stat: '78%',
        descriptor: 'of unanswered leads go cold within a day',
        detail:
          'A homeowner with a broken water heater does not wait around. Without an automated response inside minutes, most of these leads book with the next name on a search result page.',
      },
      {
        stat: '0',
        descriptor: 'automated review or rebooking touches after a job',
        detail:
          'Most shops finish a job and move to the next one, with no system asking for a review or scheduling the next maintenance visit. That is repeat revenue and reputation, both left on the table.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Find the Leak',
        body: 'A 60 to 90 minute session on your call handling, dispatch process, and post-job follow-up. We map every missed call and every skipped rebooking, priced out in dollars.',
      },
      {
        step: '02',
        title: 'Build the System',
        body: 'Full Engagement wires up missed-call text-back, speed-to-lead routing, and automated review and rebooking requests, so techs stay on trucks instead of chasing callbacks.',
      },
      {
        step: '03',
        title: 'Keep It Running',
        body: 'Monthly reporting on answer rate, response time, and rebooking volume, tuned as call volume shifts with the seasons your HVAC and plumbing business runs on.',
      },
    ],
    faq: [
      {
        question: 'How much revenue do HVAC plumbing missed calls cost a San Diego shop?',
        answer:
          'For a shop missing four calls a week at a $700 average ticket, the math lands around $11,200 a month in lost revenue, before counting the review and rebooking work skipped after a job. The diagnostic runs on your real call volume and ticket size instead of a rough industry number, so the figure reflects your shop.',
      },
      {
        question: 'What does the HVAC and plumbing Revenue Leak Diagnostic include?',
        answer:
          'A 60 to 90 minute live session covering call answer rates, dispatch speed, and post-job follow-up, plus a written report with a revenue leak map, a prioritized fix list, and cost estimates for each fix. Everything is priced at $500 to $750, credited toward setup if you move into a Full Engagement build.',
      },
      {
        question: 'Do you set up missed-call text-back during the diagnostic?',
        answer:
          "No. The diagnostic is a paid audit, not an implementation. It tells you exactly where calls, dispatch, and follow-up leak revenue and what fixing each gap is worth. Missed-call text-back, dispatch automation, and rebooking sequences get built in the Full Engagement tier, after you've seen the numbers.",
      },
      {
        question: 'Is this only for emergency service calls, or does it cover maintenance plans too?',
        answer:
          'It covers both. Emergency HVAC and plumbing calls leak the fastest because response time decides the job, but maintenance plan renewals and seasonal tune-up rebooking leak as much revenue over a year. The diagnostic maps your full customer lifecycle, not the emergency line alone.',
      },
      {
        question: 'What size HVAC or plumbing company is a good fit for this?',
        answer:
          'Shops doing $500K to $5M a year with more than one truck on the road and a phone ringing more often than the owner personally answers. Below this range, a missed call is a rare event you notice. Above it, missed calls become a pattern your team stops seeing because it happens every week.',
      },
    ],
    cta: { label: 'Book the HVAC & Plumbing Diagnostic', href: 'mailto:hello@nilegrowthworks.com?subject=HVAC & Plumbing Revenue Leak Diagnostic' },
    updatedAt: '2026-09-15',
  },
  {
    slug: 'revenue-leak-diagnostic-med-spa',
    vertical: 'Med Spa & Aesthetics',
    title: 'Revenue Leak Diagnostic for Med Spa & Aesthetics',
    metaTitle: 'Med Spa Revenue Leak Diagnostic · NILE GrowthWorks',
    metaDescription:
      'Med spa client follow-up automation starts with a $500-$750 diagnostic. See where San Diego med spas lose repeat revenue and how to capture it.',
    h1: 'Med spa client follow-up automation starts with knowing where San Diego spas lose repeat clients.',
    h1Accent: 'where San Diego spas lose repeat clients.',
    eyebrow: 'MED SPA & AESTHETICS · REVENUE LEAK DIAGNOSTIC',
    intro:
      "Most med spas build a loyal client base by accident, one referral at a time, with no system behind it. Med spa client follow-up automation San Diego owners are missing would turn a single Botox or filler visit into a repeat client relationship, but without it, 73% of this repeat potential sits uncaptured. NILE GrowthWorks runs a $500 to $750 diagnostic built for med spas and aesthetics practices doing $500K to $5M a year. In 60 to 90 minutes we map every point a client falls out of your rebooking cycle and price what it costs you. You leave with a report, not a product pitch.",
    leakStats: [
      {
        stat: '73%',
        descriptor: 'average repeat potential with zero follow-up system',
        detail:
          'Aesthetics clients return at a higher rate than almost any other service business, but only when someone reaches out at the right interval. Without automated follow-up, most of this repeat revenue never gets asked for.',
      },
      {
        stat: '6/wk',
        descriptor: 'inquiries lost to slow first response',
        detail:
          'A med spa lead researching injectables or a package usually messages two or three practices at once. The first one to respond, not the best one, tends to book the consult.',
      },
      {
        stat: '$0',
        descriptor: 'spent turning single visits into membership or package clients',
        detail:
          'Most spas sell one service at a time and hope the client rebooks on her own. Without a structured upsell and rebooking sequence, membership and package revenue stays flat regardless of how good the service is.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Find the Leak',
        body: 'A 60 to 90 minute session on your inquiry response, consult booking, and post-treatment follow-up. We map exactly where clients fall out of the rebooking cycle.',
      },
      {
        step: '02',
        title: 'Build the System',
        body: 'Full Engagement wires up med spa client follow-up automation: treatment interval reminders, review requests, and package or membership upsell sequences, so retention runs without front-desk memory.',
      },
      {
        step: '03',
        title: 'Keep It Running',
        body: 'Monthly reporting on rebooking rate, average visits per client, and inquiry response time, adjusted as you add new treatments or providers to the spa.',
      },
    ],
    faq: [
      {
        question: 'What is med spa client follow-up automation, and why does a San Diego spa need it?',
        answer:
          'It is a system reaching out to clients at the right interval after a treatment, so a single Botox, filler, or facial visit turns into a repeat relationship instead of a one-time transaction. San Diego med spas compete on more than technique now, and the practices retaining the most clients run a follow-up system instead of relying on a great injector alone.',
      },
      {
        question: 'How is repeat potential calculated in the diagnostic?',
        answer:
          'We look at your treatment mix, typical retreatment intervals, and current rebooking rate, then compare it against the 73% average repeat potential aesthetics practices carry when a follow-up system is in place. The gap between your current number and this benchmark is the revenue the diagnostic prices out for you.',
      },
      {
        question: 'Does the diagnostic cover HIPAA and compliance concerns for a med spa?',
        answer:
          "Yes, at a process level. We review how client communication and follow-up currently move through your systems and flag where a workflow needs a compliant tool instead of a personal text or spreadsheet. Full HIPAA compliance implementation is scoped separately in Full Engagement, based on what your practice already uses.",
      },
      {
        question: 'We already send a monthly newsletter. Is this enough follow-up?',
        answer:
          "A newsletter reaches everyone the same way on the same day, regardless of when they were last treated. Med spa client follow-up automation works off each client's own treatment date, so a Botox client gets a reminder around month three, not whenever your newsletter happens to go out. That timing difference is most of what drives rebooking.",
      },
      {
        question: 'What size med spa is a good fit for this diagnostic?',
        answer:
          'Practices doing $500K to $5M a year with more than one provider and a client list large enough for front-desk staff to lose track of every retreatment date. Smaller solo practices often manage follow-up by memory fine on their own. Once a spa is booking multiple providers and rooms, memory stops being a system.',
      },
    ],
    cta: { label: 'Book the Med Spa Diagnostic', href: 'mailto:hello@nilegrowthworks.com?subject=Med Spa Revenue Leak Diagnostic' },
    updatedAt: '2026-09-15',
  },
]

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug)
}
