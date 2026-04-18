import { cn } from '@/lib/cn'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const points = [
  {
    number: '01',
    heading: 'The system underneath.',
    body: "Revenue operations is everything that happens after the first conversation. How a lead gets tracked. Whether a missed call gets a text back. Whether a new customer gets a follow-up. RevOps is what makes the difference between a business that grows reliably and one that sprints in bursts and wonders why things feel chaotic.",
  },
  {
    number: '02',
    heading: 'Where the manual approach breaks.',
    body: "Most service businesses run this on memory. An owner or a good admin holds the whole thing in their head. That works fine until volume picks up, a team member leaves, or the owner needs to step back. Then things slip quietly. A lead doesn't get called back. Revenue that was already in the door walks back out.",
  },
  {
    number: '03',
    heading: 'Where automation fits.',
    body: "Automation doesn't replace the relationship. It makes sure the relationship doesn't die because someone was busy. The follow-up goes out whether or not your best person is in the office. The missed call gets a text back in two minutes. Consistently. Every time.",
  },
]

export function RevenueOpsExplainer() {
  return (
    <section className="py-16 md:py-32 bg-navy-deep">
      <div className="container-x">
        <RevealOnScroll>
          <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
            REVENUE OPERATIONS & AUTOMATION
          </p>
          <h2 className="mt-6 font-display italic text-h2 text-mist leading-[1.1] max-w-3xl text-balance">
            Most of your revenue problems aren&rsquo;t lead problems.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {points.map((point, i) => (
              <div key={point.number} className="flex flex-col">
                <p className={cn(
                  'font-display italic text-5xl leading-none',
                  i % 2 === 0 ? 'text-ember' : 'text-teal'
                )}>
                  {point.number}
                </p>
                <p className="mt-4 font-sans font-bold text-lg text-mist">
                  {point.heading}
                </p>
                <p className="mt-3 text-body text-fog leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
