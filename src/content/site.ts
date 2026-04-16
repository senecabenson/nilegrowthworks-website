export const siteContent = {
  nav: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
    ],
    cta: { label: 'Start a Diagnostic →', href: '/#diagnostic' },
  },

  hero: {
    eyebrow: 'REVENUE OPERATIONS · SAN DIEGO',
    title: 'Build it',
    titleAccent: 'so it runs.',
    subhead: 'We find where your revenue is leaking. Then we build the systems that stop it.',
    primaryCta: { label: 'Start the $500 Diagnostic →', href: 'mailto:senecacbenson@gmail.com?subject=Revenue Leak Diagnostic' },
    secondaryCta: { label: 'See how we work', href: '/services' },
    credibility: 'For service businesses doing $500K–$5M · Property Management · HVAC · Med Spa',
  },

  leak: {
    eyebrow: 'THE LEAK',
    title: "Revenue doesn't vanish.",
    titleAccent: 'It leaks.',
    description: "Most service businesses lose 30–50% of their leads before anyone ever talks to them. Here's where.",
    stages: [
      {
        number: '01',
        label: 'Missed Call',
        description: 'Phone rings. Nobody answers. Lead gone in 90 seconds.',
        stat: '$700 avg ticket lost',
      },
      {
        number: '02',
        label: 'Slow Follow-Up',
        description: "48 hours to respond. You've already lost to three competitors.",
        stat: '78% of leads go cold',
      },
      {
        number: '03',
        label: 'No Nurture',
        description: 'One-time customer. Never heard from again.',
        stat: '73% repeat potential wasted',
      },
    ],
  },

  problem: {
    quote: "We don't generate leads. We make sure every lead, customer, and dollar already in the door gets handled, followed up on, and retained — systematically.",
    attribution: 'NILE POSITIONING',
  },

  services: {
    eyebrow: 'SERVICES',
    title: 'Three ways to work with us.',
    tiers: [
      {
        name: 'Revenue Leak Diagnostic',
        tier: 'TIER 1 — START HERE',
        price: '$500–$750',
        blurb: '60–90 min diagnostic session plus a written report showing exactly where revenue leaks and what it costs. This is a deliverable, not a free sales call. Diagnostic fee credited toward setup if you move forward.',
        bullets: [
          '60–90 minute live diagnostic session',
          'Written report with revenue leak map',
          'Prioritized fix list with cost estimates',
          'ROI projection for each fix',
          'Fee credited toward Tier 2 setup',
        ],
        cta: { label: 'Book a Diagnostic →', href: 'mailto:senecacbenson@gmail.com?subject=Revenue Leak Diagnostic' },
      },
      {
        name: 'Full Engagement',
        tier: 'TIER 2',
        price: '$5,000 setup + $2,000/mo',
        blurb: 'GHL sub-account built on NILE-managed infrastructure, n8n automation, lifecycle mapping, training, and ongoing monthly optimization plus reporting. Your team focuses on serving customers. The systems handle the rest.',
        bullets: [
          'GoHighLevel sub-account on NILE infrastructure',
          'CRM setup and pipeline configuration',
          'Automated lead capture and follow-up sequences',
          'Lifecycle mapping for your customer journey',
          'n8n workflow automation',
          'Team training and onboarding',
          'Monthly optimization and reporting',
          'Ongoing retainer support',
        ],
        cta: { label: 'See Full Engagement →', href: 'mailto:senecacbenson@gmail.com?subject=Full Engagement Inquiry' },
      },
      {
        name: 'Custom Build',
        tier: 'TIER 3',
        price: 'Custom Pricing',
        blurb: 'Automation work built within your existing tech stack. For businesses that need specific workflows without full NILE infrastructure. Scoped and priced per project.',
        bullets: [
          'Works within your existing tools',
          'Custom automation workflows',
          'Integration with current CRM/systems',
          'Per-project scoping and pricing',
          'Documentation and handoff included',
        ],
        cta: { label: 'Scope a Custom Build →', href: 'mailto:senecacbenson@gmail.com?subject=Custom Build Inquiry' },
      },
    ],
  },

  approach: {
    eyebrow: 'THE APPROACH',
    title: 'Find the leak. Build the system.',
    titleAccent: 'Keep it running.',
    steps: [
      {
        number: '01',
        title: 'Find the Leak',
        body: "60–90 min diagnostic. Every manual handoff, every dropped thread, every dollar walking out the door — mapped, priced, prioritized.",
      },
      {
        number: '02',
        title: 'Build the System',
        body: "GHL sub-account, n8n automations, lifecycle maps, training. Your team focuses on serving customers. The systems handle the rest.",
      },
      {
        number: '03',
        title: 'Keep It Running',
        body: "Monthly retainer. Reporting. Optimization. Evolution. We don't hand you a tool and vanish — we stay.",
      },
    ],
  },

  verticals: [
    {
      name: 'PROPERTY MANAGEMENT',
      stat: '$8,100/mo',
      descriptor: 'recoverable from missed placements',
      detail: '3 missed placements/mo at $2,700 avg. Owner acquisition leaks at first unreturned email.',
    },
    {
      name: 'HVAC & PLUMBING',
      stat: '$11,200/mo',
      descriptor: 'lost to missed calls',
      detail: '4 missed calls/week at $700 avg ticket. No rebooking or review automation.',
    },
    {
      name: 'MED SPA & AESTHETICS',
      stat: '73%',
      descriptor: 'repeat potential with zero follow-up',
      detail: '73% avg repeat potential with zero follow-up system capturing it.',
    },
  ],

  calculator: {
    eyebrow: 'SEE YOUR NUMBERS',
    title: 'How much revenue is',
    titleAccent: 'leaking?',
    description: "Adjust the sliders to match your business. No email required — the math speaks for itself.",
    cta: 'Get the full picture — book a $500 diagnostic',
    presets: {
      'Property Management': { avgTicket: 2700, missedPerWeek: 3, followUpHours: 48, repeatRate: 0.40 },
      'HVAC & Plumbing': { avgTicket: 700, missedPerWeek: 4, followUpHours: 24, repeatRate: 0.55 },
      'Med Spa': { avgTicket: 350, missedPerWeek: 6, followUpHours: 36, repeatRate: 0.73 },
      'Other Service Business': { avgTicket: 500, missedPerWeek: 4, followUpHours: 24, repeatRate: 0.50 },
    },
  },

  about: {
    eyebrow: 'WHO WE ARE',
    title: 'Operators, not influencers.',
    story: "Next In Line Enterprises. San Diego. We've seen what actually breaks inside service businesses — because we've worked inside them.",
    founderQuote: 'Everyone willing to put in the work is next in line to break through. It is a matter of when, not if.',
    elevatorPitch: "NILE GrowthWorks helps service businesses doing $500K–$5M in revenue but losing money to manual processes and broken follow-up. We find where revenue is leaking, then build the automated systems — CRM, workflows, lifecycle management — that handle 80–90% of operational work. Your team focuses on serving customers. The systems handle the rest.",
    values: [
      { name: 'Humility Over Ego', description: 'Students first. Lead with questions, not answers.' },
      { name: 'Purpose Over Presence', description: 'Show up with intention, not just attendance.' },
      { name: 'Systems Over Heroics', description: "Build so teams can breathe. If it depends on one person, it's broken." },
      { name: 'Honesty Over Comfort', description: "Say what clients need to hear, not what they want to hear." },
      { name: 'Progress Over Perfection', description: 'Done and running beats planned and sitting.' },
    ],
  },

  finalCta: {
    eyebrow: 'READY?',
    title: "Let's find where your revenue is leaking.",
    body: '$500 diagnostic. 60–90 minutes. A written report. Credited toward setup if you move forward.',
    cta: { label: 'Book a Diagnostic →', href: 'mailto:senecacbenson@gmail.com?subject=Revenue Leak Diagnostic' },
  },

  footer: {
    tagline: 'Build it so it runs.',
    email: 'senecacbenson@gmail.com',
    location: 'San Diego, CA',
    copyright: `© ${new Date().getFullYear()} NILE GrowthWorks. All rights reserved.`,
  },
} as const
