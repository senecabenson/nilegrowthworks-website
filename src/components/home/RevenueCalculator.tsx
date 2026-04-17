'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import BlueprintGrid from '@/components/ui/BlueprintGrid'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteContent } from '@/content/site'
import { cn } from '@/lib/cn'

// ─── Types & presets ──────────────────────────────────────────────────────────
type PresetKey = keyof typeof siteContent.calculator.presets
type Preset = (typeof siteContent.calculator.presets)[PresetKey]

const PRESET_KEYS = Object.keys(siteContent.calculator.presets) as PresetKey[]
const DEFAULT_PRESET: PresetKey = 'HVAC & Plumbing'

// ─── Currency formatter ──────────────────────────────────────────────────────
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const formatCurrency = (v: number) => currency.format(Math.max(0, Math.round(v)))

// ─── Slider primitive ─────────────────────────────────────────────────────────
interface SliderProps {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  display: string
  warning?: string | null
  valuePercent: number
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  display,
  warning,
  valuePercent,
}: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[11px] uppercase tracking-[0.2em] text-slate font-semibold">
          {label}
        </label>
        <span className="font-display italic text-ember text-2xl md:text-3xl leading-none">
          {display}
        </span>
      </div>
      <div className="relative py-3">
        {/* Track background */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-mist/10"
        />
        {/* Filled portion — teal → ember gradient */}
        <div
          aria-hidden
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full"
          style={{
            width: `${valuePercent}%`,
            background: 'linear-gradient(90deg, #1E93A3 0%, #D6B53A 100%)',
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="revcalc-slider relative w-full cursor-pointer appearance-none bg-transparent"
          style={{ minHeight: 44 }}
        />
      </div>
      {warning && (
        <p className="inline-flex items-center gap-2 rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-red-300">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-400" />
          {warning}
        </p>
      )}
    </div>
  )
}

// ─── Animated currency display ───────────────────────────────────────────────
function AnimatedCurrency({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { stiffness: 100, damping: 20 })
  const display = useTransform(spring, (v) => formatCurrency(v))

  useEffect(() => {
    mv.set(value)
  }, [value, mv])

  return <motion.span className={className}>{display}</motion.span>
}

// ─── Breakdown row ───────────────────────────────────────────────────────────
function BreakdownRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="relative border-l-2 border-ember/60 pl-5 py-3 flex items-baseline justify-between gap-4">
      <span className="text-sm text-fog">{label}</span>
      <span className="font-display italic text-ember text-xl tabular-nums">
        <AnimatedCurrency value={amount} />
        <span className="ml-1 text-xs not-italic text-slate font-sans">/mo</span>
      </span>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export function RevenueCalculator() {
  const { calculator } = siteContent
  const [presetKey, setPresetKey] = useState<PresetKey>(DEFAULT_PRESET)
  const initial: Preset = siteContent.calculator.presets[DEFAULT_PRESET]
  const [avgTicket, setAvgTicket] = useState<number>(initial.avgTicket)
  const [missedPerWeek, setMissedPerWeek] = useState<number>(initial.missedPerWeek)
  const [followUpHours, setFollowUpHours] = useState<number>(initial.followUpHours)
  const [repeatRate, setRepeatRate] = useState<number>(initial.repeatRate)

  // Flag to prevent preset-repopulate from triggering manual-change resets
  const applyingPreset = useRef(false)

  function applyPreset(key: PresetKey) {
    const p = siteContent.calculator.presets[key]
    applyingPreset.current = true
    setPresetKey(key)
    setAvgTicket(p.avgTicket)
    setMissedPerWeek(p.missedPerWeek)
    setFollowUpHours(p.followUpHours)
    setRepeatRate(p.repeatRate)
    // Clear flag next tick — state updates are batched
    queueMicrotask(() => {
      applyingPreset.current = false
    })
  }

  // ─── Calculations ──────────────────────────────────────────────────────
  const weeksPerMonth = 4.33
  const missedRevenue = avgTicket * missedPerWeek * weeksPerMonth
  const followUpLoss =
    missedRevenue * Math.min(followUpHours / 48, 1) * 0.78
  const nurtureGap =
    avgTicket * repeatRate * missedPerWeek * weeksPerMonth * 0.6
  const totalMonthly = missedRevenue + followUpLoss + nurtureGap
  const totalAnnual = totalMonthly * 12

  // Dynamic mailto body
  const mailtoHref = `mailto:senecacbenson@gmail.com?subject=${encodeURIComponent(
    'Revenue Leak Diagnostic'
  )}&body=${encodeURIComponent(
    `Calculator showed ${formatCurrency(totalMonthly)}/mo in leakage.`
  )}`

  // ─── Percent calculators for slider fills ──────────────────────────────
  const pct = (val: number, min: number, max: number) =>
    ((val - min) / (max - min)) * 100

  const followUpWarning =
    followUpHours > 1 ? '78% of leads go to whoever responds first' : null

  return (
    <section id="calculator" className="relative overflow-hidden bg-ink py-16 md:py-32 scroll-mt-24">
      <BlueprintGrid />
      {/* Radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(214,181,58,0.06), transparent 60%)',
        }}
      />

      <div className="container-x relative">
        <RevealOnScroll>
          <SectionHeading
            eyebrow={calculator.eyebrow}
            title={calculator.title}
            titleAccent={calculator.titleAccent}
            description={calculator.description}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ── LEFT: Inputs ──────────────────────────────────────── */}
            <div className="space-y-8 p-5 sm:p-8 md:p-10 border border-mist/10 bg-navy-deep/60 backdrop-blur-sm">
              <div className="space-y-3">
                <label
                  htmlFor="revcalc-business-type"
                  className="text-[11px] uppercase tracking-[0.2em] text-slate font-semibold"
                >
                  Business Type
                </label>
                <div className="relative">
                  <select
                    id="revcalc-business-type"
                    value={presetKey}
                    onChange={(e) => applyPreset(e.target.value as PresetKey)}
                    className={cn(
                      'w-full appearance-none bg-navy-deep border border-mist/15 text-mist',
                      'px-4 py-3 pr-10 text-sm font-sans',
                      'focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember',
                      'transition-colors duration-200 cursor-pointer'
                    )}
                  >
                    {PRESET_KEYS.map((k) => (
                      <option key={k} value={k} className="bg-navy-deep text-mist">
                        {k}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ember text-xs"
                  >
                    ▾
                  </span>
                </div>
              </div>

              <Slider
                label="Average Ticket Value"
                min={100}
                max={10000}
                step={50}
                value={avgTicket}
                onChange={setAvgTicket}
                display={formatCurrency(avgTicket)}
                valuePercent={pct(avgTicket, 100, 10000)}
              />

              <Slider
                label="Missed Calls / Leads Per Week"
                min={1}
                max={20}
                step={1}
                value={missedPerWeek}
                onChange={setMissedPerWeek}
                display={`${missedPerWeek}`}
                valuePercent={pct(missedPerWeek, 1, 20)}
              />

              <Slider
                label="Avg Follow-Up Response Time"
                min={1}
                max={96}
                step={1}
                value={followUpHours}
                onChange={setFollowUpHours}
                display={`${followUpHours} hr`}
                valuePercent={pct(followUpHours, 1, 96)}
                warning={followUpWarning}
              />

              <Slider
                label="Repeat Customer Rate"
                min={0}
                max={90}
                step={5}
                value={Math.round(repeatRate * 100)}
                onChange={(v) => setRepeatRate(v / 100)}
                display={`${Math.round(repeatRate * 100)}%`}
                valuePercent={pct(Math.round(repeatRate * 100), 0, 90)}
              />
            </div>

            {/* ── RIGHT: Live output dashboard ──────────────────────── */}
            <div className="space-y-8">
              {/* Big number */}
              <div className="relative p-5 sm:p-8 md:p-10 border border-ember/30 bg-navy-deep/70 overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-30 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #D6B53A, transparent 70%)' }}
                />
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate font-semibold">
                  Monthly Revenue Leak
                </p>
                <p className="mt-4 font-display italic text-ember leading-[0.95] text-h2 md:text-h1 tabular-nums">
                  <AnimatedCurrency value={totalMonthly} />
                  <span className="ml-2 text-2xl md:text-3xl not-italic font-sans text-ember/70">
                    /mo
                  </span>
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 px-1">
                <BreakdownRow label="Missed Calls" amount={missedRevenue} />
                <BreakdownRow label="Slow Follow-Up" amount={followUpLoss} />
                <BreakdownRow label="No Repeat Nurture" amount={nurtureGap} />
              </div>

              {/* Annual callout */}
              <div className="p-6 md:p-7 border border-ember/40 bg-ember/5">
                <p className="text-sm md:text-base text-fog leading-relaxed">
                  That&apos;s{' '}
                  <span className="font-display italic font-bold text-ember text-2xl md:text-3xl tabular-nums">
                    <AnimatedCurrency value={totalAnnual} />
                  </span>{' '}
                  per year walking out the door.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <MagneticButton variant="primary" href={mailtoHref}>
                  {calculator.cta}
                </MagneticButton>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* ── Slider thumb & track styles ─────────────────────────────── */}
      <style jsx global>{`
        .revcalc-slider {
          accent-color: #d6b53a;
          height: 44px;
        }
        .revcalc-slider::-webkit-slider-runnable-track {
          height: 3px;
          background: transparent;
        }
        .revcalc-slider::-moz-range-track {
          height: 3px;
          background: transparent;
        }
        .revcalc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: #d6b53a;
          border: 2px solid #121b30;
          box-shadow: 0 0 12px rgba(214, 181, 58, 0.4);
          cursor: pointer;
          margin-top: -8.5px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .revcalc-slider::-webkit-slider-thumb:hover,
        .revcalc-slider::-webkit-slider-thumb:active {
          transform: scale(1.12);
          box-shadow: 0 0 18px rgba(214, 181, 58, 0.65);
        }
        .revcalc-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: #d6b53a;
          border: 2px solid #121b30;
          box-shadow: 0 0 12px rgba(214, 181, 58, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .revcalc-slider::-moz-range-thumb:hover,
        .revcalc-slider::-moz-range-thumb:active {
          transform: scale(1.12);
          box-shadow: 0 0 18px rgba(214, 181, 58, 0.65);
        }
        .revcalc-slider:focus {
          outline: none;
        }
        .revcalc-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(214, 181, 58, 0.25),
            0 0 12px rgba(214, 181, 58, 0.55);
        }
        .revcalc-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(214, 181, 58, 0.25),
            0 0 12px rgba(214, 181, 58, 0.55);
        }
      `}</style>
    </section>
  )
}
