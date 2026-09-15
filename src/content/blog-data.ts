export interface BlogSection {
  heading: string
  paragraphs: string[]
}

export interface BlogFaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  publishedAt: string
  updatedAt: string
  excerpt: string
  sections: BlogSection[]
  faq?: BlogFaqItem[]
  relatedService?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-san-diego-service-businesses-leak-revenue',
    title: 'How San Diego Service Businesses Leak Revenue',
    metaTitle: 'How San Diego Service Businesses Leak Revenue · NILE',
    metaDescription:
      'Revenue leak San Diego service business owners rarely see: missed calls, slow follow-up, and no retention system. Here is where the money actually goes.',
    publishedAt: '2026-09-13T09:00:00-07:00',
    updatedAt: '2026-09-13T09:00:00-07:00',
    excerpt:
      "A revenue leak in a San Diego service business almost never shows up on the P&L. It hides in the gap between a call and a callback. Here's where the money actually goes, with real numbers from three verticals.",
    sections: [
      {
        heading: 'The revenue leak nobody puts on a spreadsheet',
        paragraphs: [
          "Every service business owner in San Diego I've talked to says the same thing when I ask how business is going: \"Busy. Good, actually.\" Then I ask how many calls went unanswered last week, and the room goes quiet. That gap between busy and profitable is the revenue leak San Diego service business owners carry every month without a name for it.",
          "A leak is not a bad month. It is a small, repeated loss that never lands on a P&L because nobody tracks it. A missed call. A follow-up that happens two days late instead of two hours late. A client who finishes one job and never hears from you again. None of that shows up as a line item. It shows up as slower growth than the work you're actually doing deserves.",
          "I've run this diagnostic across property management, HVAC and plumbing, and med spa businesses doing $500K to $5M a year in San Diego. The leak looks different in each one, but the shape is always the same: revenue that already walked in the door, then walked back out because no system caught it.",
        ],
      },
      {
        heading: 'Property management: the $8,100 a month leak at first contact',
        paragraphs: [
          "Property management companies lose revenue at the first unreturned email. A property owner shopping for a new management company usually reaches out to two or three firms in the same week. The one that replies first tends to win, regardless of who actually runs a tighter operation.",
          "Across the property management businesses I've diagnosed, three missed owner placements a month at an average management value of $2,700 works out to roughly $8,100 a month in recoverable revenue. That number does not include tenant renewals that slip because nobody sent a reminder before the lease-end date. Both leaks come from the same root cause: no system watching the clock on a conversation that matters.",
        ],
      },
      {
        heading: 'HVAC and plumbing: $11,200 a month, one ring at a time',
        paragraphs: [
          "HVAC and plumbing shops leak the fastest of the three verticals, because the customer is usually standing in water or sitting in a hot house when they call. If nobody answers, they call the next name on the search results page. There is no loyalty in an emergency.",
          "Four missed calls a week at a $700 average ticket puts the number at $11,200 a month, and that is before counting the jobs that never get rebooked because nobody asked for a review or a maintenance follow-up. Most shops I've walked through have zero automated touch after the invoice is paid. The job ends, and so does the relationship, until the next emergency sends the customer searching all over again.",
        ],
      },
      {
        heading: 'Med spas: 73% of repeat revenue never gets asked for',
        paragraphs: [
          "Med spa and aesthetics clients return at a higher rate than almost any other service business, but only if someone reaches out at the right interval after a treatment. Without that follow-up, the average repeat potential I've measured across med spa clients sits at 73%, mostly uncaptured.",
          "A single Botox or filler visit should turn into a client relationship that runs for years. Instead, most spas treat a client once, hope she rebooks on her own, and move to the next appointment. The retention math is sitting right there in the calendar. Nobody is reading it.",
        ],
      },
      {
        heading: 'What actually stops the leak',
        paragraphs: [
          "None of these fixes require new leads. Every dollar above is already inside the business, sitting in a call log, a lease-end date, or a treatment history. The fix is a system that watches for the moment and acts on it, without waiting on someone to remember.",
          "I learned this the expensive way at The Capture Corner, the photo booth company I co-own. We were sitting on the same leak: inbound inquiries that got a reply whenever someone had a free minute, not the moment they came in. Once we built a real lead qualification and booking flow, our close rate went from about 5% to 20%, on the same team, without adding a single person. The leads were already showing up. We just stopped losing them on the way in.",
          "That is the whole premise behind the Revenue Leak Diagnostic. In a 60 to 90 minute session, we map where your calls, follow-ups, and rebookings actually go, and price every gap in real dollars, not a guess. You leave with a written report and a prioritized fix list. The session runs $500 to $750, and if you move into a full build afterward, the fee gets credited toward setup. It is a paid audit, not a sales pitch, because guessing at a number this large is worse than not knowing it at all.",
        ],
      },
    ],
    faq: [
      {
        question: 'What is a revenue leak in a San Diego service business?',
        answer:
          "It's a repeated, small loss of revenue that never shows up on a P&L because no one tracks it: a missed call, a slow follow-up, a client who never hears from you again after a job. Individually each one looks minor. Added up over a month, they usually total thousands of dollars in business that already walked in the door and walked back out.",
      },
      {
        question: 'How do I know if my business has a revenue leak?',
        answer:
          "If you can't say exactly how many calls went unanswered last week, how fast a new lead gets a reply, or what percentage of past clients rebook, you have a leak. Most owners running a busy calendar assume busy means no leak. The two are unrelated. A Revenue Leak Diagnostic puts real numbers on it in one session.",
      },
      {
        question: 'How much does a Revenue Leak Diagnostic cost?',
        answer:
          'The diagnostic runs $500 to $750 depending on how many systems we need to review, and takes a single 60 to 90 minute session plus a written report about a week later. If you move forward into a full build after seeing the numbers, the diagnostic fee is credited toward setup.',
      },
    ],
    relatedService: 'revenue-leak-diagnostic-hvac-plumbing',
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
