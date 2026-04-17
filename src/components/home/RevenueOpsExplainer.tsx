import RevealOnScroll from '@/components/ui/RevealOnScroll'

export function RevenueOpsExplainer() {
  return (
    <section className="py-16 md:py-32 bg-navy">
      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Left: framing statement */}
            <div>
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
                REVENUE OPERATIONS
              </p>
              <h2 className="mt-6 font-display italic text-h2 text-mist leading-[1.1]">
                Most of your revenue problems aren&rsquo;t lead problems.
              </h2>
              <p className="mt-8 text-body text-fog leading-relaxed">
                Revenue operations is the system underneath your sales process. It&rsquo;s how a lead gets logged, followed up on, and moved toward a close. Whether a customer who went quiet gets a check-in. Whether a missed call becomes a booked job or a lost one. RevOps is what makes the difference between a business that grows reliably and one that sprints in bursts and wonders why things feel chaotic.
              </p>
            </div>

            {/* Right: why manual breaks + automation */}
            <div className="space-y-8 lg:pt-16">
              <div>
                <p className="font-sans font-semibold text-mist">Where the manual approach breaks down.</p>
                <p className="mt-3 text-body text-fog leading-relaxed">
                  Most service businesses run this on memory. An owner or a good admin holds the whole thing in their head. That works fine until it doesn&rsquo;t: volume picks up, a team member leaves, or the owner needs to step back. Then things slip quietly. A lead doesn&rsquo;t get called back. A customer doesn&rsquo;t hear from anyone for 90 days. Revenue that was already in the door walks back out.
                </p>
              </div>

              <div className="border-t border-mist/10 pt-8">
                <p className="font-sans font-semibold text-mist">Where automation comes in.</p>
                <p className="mt-3 text-body text-fog leading-relaxed">
                  Automation doesn&rsquo;t replace the relationship. It makes sure the relationship doesn&rsquo;t die because someone was busy. The follow-up goes out whether or not your best person is in the office. The missed call gets a text back in two minutes. The customer who goes quiet gets a check-in at day 30, not silence. Consistently. Every time. That consistency is what turns a good service business into a reliable one.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
