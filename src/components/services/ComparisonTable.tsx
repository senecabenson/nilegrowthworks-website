import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteContent } from '@/content/site'

export default function ComparisonTable() {
  const { tiers, comparison } = siteContent.services

  return (
    <section className="py-32 bg-navy-deep relative">
      <div className="container-x">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="AT A GLANCE"
            title="Which tier fits."
            description="A flat comparison of what each engagement delivers, how long it takes, and what it costs. No upsell math."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-10 overflow-x-auto border border-mist/10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-mist/10 bg-navy">
                  <th
                    scope="col"
                    className="px-5 py-5 text-eyebrow font-sans uppercase tracking-[0.25em] text-teal w-[22%]"
                  >
                    Compare
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      scope="col"
                      className="px-5 py-5 align-bottom"
                    >
                      <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-ember">
                        {tier.tier}
                      </p>
                      <p className="mt-2 font-display italic text-xl text-mist leading-tight">
                        {tier.name}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-t border-mist/10 align-top">
                    <th
                      scope="row"
                      className="px-5 py-6 text-eyebrow font-sans uppercase tracking-[0.2em] text-slate font-normal"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={i} className="px-5 py-6 text-sm text-fog leading-relaxed">
                        {value ? (
                          <div className="flex items-start gap-3">
                            <span className="text-ember mt-[2px] flex-shrink-0" aria-hidden="true">
                              ✓
                            </span>
                            <span>{value}</span>
                          </div>
                        ) : (
                          <span className="text-iron" aria-label="not included">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate md:hidden">Scroll → to compare tiers</p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
