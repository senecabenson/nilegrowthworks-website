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
    eyebrow: 'NILE GROWTHWORKS · REVENUE OPERATIONS · SAN DIEGO',
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
    quote: "We don't generate leads. We make sure every lead, customer, and dollar already in the door gets handled, followed up on, and retained. Systematically.",
    attribution: 'NILE POSITIONING',
  },

  services: {
    eyebrow: 'SERVICES',
    title: 'Three ways to work with us.',
    tiers: [
      {
        name: 'Revenue Leak Diagnostic',
        tier: 'TIER 1: START HERE',
        price: '$500–$750',
        blurb: '60–90 min diagnostic session plus a written report showing exactly where revenue leaks and what it costs. This is a deliverable, not a free sales call. Diagnostic fee credited toward setup if you move forward.',
        description: [
          'A paid, structured audit of how revenue moves through your business, from first inquiry to repeat customer. We map every manual handoff, every dropped thread, and every place a dollar can walk out the door unnoticed.',
          "You leave with a written report, a prioritized fix list with cost estimates, and an ROI projection for each fix. If you choose to move forward on Tier 2, the diagnostic fee is credited toward setup. If you don't, you still own the playbook.",
        ],
        bullets: [
          '60–90 minute live diagnostic session',
          'Written report with revenue leak map',
          'Prioritized fix list with cost estimates',
          'ROI projection for each fix',
          'Missed-call and follow-up loss calculation',
          'Lifecycle and retention gap analysis',
          'Tech stack review and consolidation notes',
          'Fee credited toward Tier 2 setup',
        ],
        bestFor:
          'Service businesses doing $500K–$5M that suspect revenue is leaking but need numbers before they commit to fixing it.',
        notFor:
          "Teams under $500K, pre-revenue startups, or anyone looking for a free consultation. This is a paid deliverable.",
        cta: { label: 'Book a Diagnostic →', href: 'mailto:senecacbenson@gmail.com?subject=Revenue Leak Diagnostic' },
      },
      {
        name: 'Full Engagement',
        tier: 'TIER 2',
        price: '$5,000 setup + $2,000/mo',
        blurb: 'A fully configured ops stack built on NILE infrastructure: lead capture, follow-up automation, lifecycle mapping, team training, and ongoing monthly optimization plus reporting. Your team focuses on serving customers. The systems handle the rest.',
        description: [
          "The fix, built and handed back to you running. A fully configured ops stack built on NILE infrastructure, automations wired to your actual workflow, lifecycle maps drawn from your real customer journey, and your team trained on how to operate it.",
          "Then we stay. Monthly retainer covers optimization, reporting, and evolution as your business changes. You don't get handed a tool and left to figure it out. That's how systems die. We keep it running.",
        ],
        bullets: [
          'Fully configured ops stack on NILE infrastructure',
          'CRM setup and pipeline configuration',
          'Automated lead capture and follow-up sequences',
          'Missed-call text-back and speed-to-lead flows',
          'Lifecycle mapping for your customer journey',
          'Custom workflow automation',
          'Team training and onboarding',
          'Monthly optimization and reporting',
          'Ongoing retainer support',
        ],
        bestFor:
          'Operators who ran the diagnostic, saw the number, and want the systems built, trained, and maintained without hiring a full ops team.',
        notFor:
          "Businesses committed to keeping everything inside their existing stack, or teams unwilling to migrate a CRM. See Tier 3.",
        cta: { label: 'See Full Engagement →', href: 'mailto:senecacbenson@gmail.com?subject=Full Engagement Inquiry' },
      },
      {
        name: 'Custom Build',
        tier: 'TIER 3',
        price: 'Custom Pricing',
        blurb: 'Automation work built within your existing tech stack. For businesses that need specific workflows without full NILE infrastructure. Scoped and priced per project.',
        description: [
          "For businesses that already run on tools they trust and don't want to migrate. We build inside your stack (HubSpot, Salesforce, Pipedrive, Monday, or whatever you're on) and wire up the specific workflows you need.",
          "Scoped and priced per project after a working session. You own the build, the documentation, and the handoff. No retainer required, though we're available for ongoing work if it makes sense.",
        ],
        bullets: [
          'Works within your existing CRM and tools',
          'Custom automation workflows',
          'Integrations with current systems',
          'Custom or native platform automation',
          'Per-project scoping and pricing',
          'Documentation and handoff included',
        ],
        bestFor:
          "Established operators with a CRM they're keeping, who need specific automations built right rather than a full platform swap.",
        notFor:
          'Teams without an existing CRM, or anyone looking for ongoing managed operations. Tier 2 is the better fit.',
        cta: { label: 'Scope a Custom Build →', href: 'mailto:senecacbenson@gmail.com?subject=Custom Build Inquiry' },
      },
    ],
    comparison: {
      rows: [
        {
          label: 'Deliverable',
          values: [
            'Diagnostic session + written revenue leak report',
            'Ops stack, automations, lifecycle map, training',
            'Custom automation built inside your existing stack',
          ],
        },
        {
          label: 'Timeline',
          values: ['1 session + report in ~1 week', '4–6 weeks to launch', 'Scoped per project'],
        },
        {
          label: 'Investment',
          values: ['$500–$750 (credited to Tier 2)', '$5K setup + $2K/month', 'Custom'],
        },
        {
          label: 'Commitment',
          values: ['One-time engagement', 'Setup + monthly retainer', 'Project-based'],
        },
        {
          label: 'Best for',
          values: [
            'Operators who want the numbers before committing',
            'Teams ready to hand ops to built-in-house systems',
            'Businesses staying on their existing CRM',
          ],
        },
      ],
    },
  },

  approach: {
    eyebrow: 'THE APPROACH',
    title: 'Find the leak. Build the system.',
    titleAccent: 'Keep it running.',
    steps: [
      {
        number: '01',
        title: 'Find the Leak',
        body: "60–90 min diagnostic. Every manual handoff, every dropped thread, every dollar walking out the door. Mapped, priced, and prioritized.",
      },
      {
        number: '02',
        title: 'Build the System',
        body: "Automations wired to your workflow, lifecycle maps, team training. Your team focuses on serving customers. The systems handle the rest.",
      },
      {
        number: '03',
        title: 'Keep It Running',
        body: "Monthly retainer. Reporting. Optimization. Evolution. We don't hand you a tool and vanish. We stay.",
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
    title: 'How much revenue is leaking?',
    titleAccent: 'leaking',
    description: 'Adjust the sliders to match your business. No email required. The math speaks for itself.',
    cta: 'Get the full picture. Book a $500 diagnostic',
    presets: {
      'Property Management':     { avgTicket: 2700, missedPerWeek: 3, followUpHours: 48, repeatRate: 0.40 },
      'HVAC & Plumbing':         { avgTicket: 700,  missedPerWeek: 4, followUpHours: 24, repeatRate: 0.55 },
      'Med Spa':                 { avgTicket: 350,  missedPerWeek: 6, followUpHours: 36, repeatRate: 0.73 },
      'Other Service Business':  { avgTicket: 500,  missedPerWeek: 4, followUpHours: 24, repeatRate: 0.50 },
    },
  },

  about: {
    eyebrow: 'WHO WE ARE',
    title: 'Operators, not influencers.',
    story: "Next In Line Enterprises. San Diego. We've seen what actually breaks inside service businesses, because we've worked inside them.",
    founderQuote: 'Everyone willing to put in the work is next in line to break through. It is a matter of when, not if.',
    elevatorPitch: "NILE GrowthWorks helps service businesses doing $500K–$5M in revenue but losing money to manual processes and broken follow-up. We find where revenue is leaking, then build the automated systems (CRM, workflows, lifecycle management) that handle 80–90% of operational work. Your team focuses on serving customers. The systems handle the rest.",
    values: [
      { name: 'Humility Over Ego', description: 'Students first. Lead with questions, not answers.' },
      { name: 'Purpose Over Presence', description: 'Show up with intention, not just attendance.' },
      { name: 'Systems Over Heroics', description: "Build so teams can breathe. If it depends on one person, it's broken." },
      { name: 'Honesty Over Comfort', description: "Say what clients need to hear, not what they want to hear." },
      { name: 'Progress Over Perfection', description: 'Done and running beats planned and sitting.' },
    ],
    founderStory: {
      pullQuote: 'Early growth does not stall because the idea is wrong. It stalls because there is no system underneath it.',
      pullQuoteAttribution: 'Seneca Benson · Founder, NILE GrowthWorks',
      paragraphs: [
        'I\'ll be honest, I don\'t have all the answers. But I\'ve learned that the best solutions come from bringing the right people together and actually listening to what they have to say.',
        'Ten years, two different worlds. Seven years on the phone at Stericycle, listening to customers explain what wasn\'t working. Three more inside ChemPoint\'s PMO, working with teams to figure out how to fix it. The real progress, I learned, happens when someone can translate between those worlds.',
        'Then I co-founded The Capture Corner. Wearing the revenue-ops hat meant building the system myself: a lead qualification and booking flow that took our close rate from about 5% to 20% and scaled us from $5K to $100K ARR without adding headcount. That\'s when it clicked: most service businesses aren\'t losing because the idea is wrong. They\'re losing because there\'s no system underneath the idea.',
        'NILE GrowthWorks is that system, built for operators like the ones I worked for: service businesses doing $500K–$5M who know something is leaking but don\'t have the time or the stack to stop it. We don\'t generate leads. We make sure every lead, customer, and dollar already in the door gets handled, followed up on, and retained. Systematically.',
      ],
    },
    proof: {
      eyebrow: 'WHAT I\'VE BUILT BEFORE',
      title: 'Not theory. Numbers from real operating environments.',
      stats: [
        { value: '5% → 20%', label: 'Close rate', context: 'The Capture Corner: automated lead qualification and booking flow, same team size.' },
        { value: '$5K → $100K', label: 'ARR scaled', context: 'Lean team at The Capture Corner, entirely on automated revenue-ops systems I designed, shipped, and iterated in production.' },
        { value: '+28% / -94%', label: 'Efficiency / duplicates', context: 'Multi-department Dynamics 365 optimization program at ChemPoint.' },
        { value: '$95M', label: 'Revenue program supported', context: 'Great Plains ERP implementation, accurate financial reporting across the revenue cycle.' },
      ],
    },
    partnership: {
      eyebrow: 'HOW WE WORK WITH CLIENTS',
      title: 'Four principles, not a pitch deck.',
      paragraphs: [
        { lead: 'Grounded, not arrogant.', body: 'We know our craft, but we never talk down to anyone. The tone is "I\'ve seen this problem before, and here\'s what\'s worked." Not "let me tell you what you\'re doing wrong."' },
        { lead: 'Real, not polished.', body: 'We don\'t hide behind jargon. If something is broken, we say it\'s broken. If something is working, we celebrate it. You should read our materials and think "this is a real person," not "this was written by a committee."' },
        { lead: 'Direct, not cold.', body: 'We get to the point. We don\'t waste your time. But direct doesn\'t mean harsh. It means we respect you enough to be clear.' },
        { lead: 'Warm, not soft.', body: 'We care about the people we work with. We use humor where it fits. But warmth doesn\'t mean we avoid hard truths. It means we deliver them like someone who actually gives a damn about your outcome.' },
      ],
    },
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
