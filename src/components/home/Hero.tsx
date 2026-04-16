'use client'

import { motion } from 'framer-motion'
import BlueprintGrid from '@/components/ui/BlueprintGrid'
import MagneticButton from '@/components/ui/MagneticButton'
import { siteContent } from '@/content/site'

// ─── Gear path helper ───────────────────────────────────────────────────────
function gearPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  teethCount: number
): string {
  const totalPoints = teethCount * 2
  const angleStep = (Math.PI * 2) / totalPoints
  const points: string[] = []
  for (let i = 0; i < totalPoints; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = i * angleStep - Math.PI / 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return points.join(' ') + ' Z'
}

// ─── Animation variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export function Hero() {
  const { hero } = siteContent

  return (
    <section className="min-h-[92vh] relative overflow-hidden flex items-center">
      {/* Blueprint grid */}
      <BlueprintGrid className="opacity-40" />

      {/* Radial glow — top right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(214,181,58,0.18), transparent 60%)',
        }}
      />

      {/* Content grid */}
      <div className="container-x w-full grid grid-cols-12 gap-8 items-center py-24">
        {/* Left column — text */}
        <motion.div
          className="col-span-12 lg:col-span-7"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Eyebrow */}
          <motion.p
            variants={childVariants}
            className="text-eyebrow font-sans uppercase text-ember tracking-[0.2em]"
          >
            {hero.eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={childVariants}
            className="font-display text-h1 text-mist mt-8 text-balance leading-[0.95]"
          >
            {hero.title}
            <br />
            <em className="italic font-light text-ember">{hero.titleAccent}</em>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={childVariants}
            className="mt-8 max-w-xl text-xl text-fog leading-relaxed"
          >
            {hero.subhead}
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={childVariants}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <MagneticButton variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </MagneticButton>
            <MagneticButton variant="ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>

          {/* Credibility line */}
          <motion.p
            variants={childVariants}
            className="mt-8 text-xs text-slate font-sans tracking-wide"
          >
            {hero.credibility}
          </motion.p>
        </motion.div>

        {/* Right column — gear motif */}
        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative aspect-square w-full max-w-[520px] ml-auto"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ── Large gear (client) — clockwise 60s ── */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '150px 200px' }}
              >
                {/* Teeth */}
                <path
                  d={gearPath(150, 200, 110, 85, 12)}
                  fill="none"
                  stroke="#D6B53A"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Outer ring */}
                <circle cx="150" cy="200" r="72" fill="none" stroke="#D6B53A" strokeWidth="1" strokeOpacity="0.4" />
                {/* Inner structural ring */}
                <circle cx="150" cy="200" r="45" fill="none" stroke="#D6B53A" strokeWidth="2" />
                {/* Hub dot */}
                <circle cx="150" cy="200" r="8" fill="#D6B53A" />
                {/* Spoke lines */}
                <line x1="150" y1="155" x2="150" y2="108" stroke="#D6B53A" strokeWidth="1.5" strokeOpacity="0.35" />
                <line x1="150" y1="245" x2="150" y2="292" stroke="#D6B53A" strokeWidth="1.5" strokeOpacity="0.35" />
                <line x1="105" y1="200" x2="58" y2="200" stroke="#D6B53A" strokeWidth="1.5" strokeOpacity="0.35" />
                <line x1="195" y1="200" x2="242" y2="200" stroke="#D6B53A" strokeWidth="1.5" strokeOpacity="0.35" />
              </motion.g>

              {/* ── Small gear (NILE) — counter-clockwise 45s ── */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '295px 248px' }}
              >
                {/* Teeth */}
                <path
                  d={gearPath(295, 248, 52, 38, 10)}
                  fill="none"
                  stroke="#1E93A3"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Inner structural ring */}
                <circle cx="295" cy="248" r="24" fill="none" stroke="#1E93A3" strokeWidth="2" />
                {/* Hub dot */}
                <circle cx="295" cy="248" r="6" fill="#1E93A3" />
                {/* Spoke lines */}
                <line x1="295" y1="224" x2="295" y2="204" stroke="#1E93A3" strokeWidth="1.5" strokeOpacity="0.35" />
                <line x1="295" y1="272" x2="295" y2="292" stroke="#1E93A3" strokeWidth="1.5" strokeOpacity="0.35" />
                <line x1="271" y1="248" x2="251" y2="248" stroke="#1E93A3" strokeWidth="1.5" strokeOpacity="0.35" />
                <line x1="319" y1="248" x2="339" y2="248" stroke="#1E93A3" strokeWidth="1.5" strokeOpacity="0.35" />
              </motion.g>

              {/* ── S-curve flow line ── */}
              <motion.path
                d="M 255 195 C 268 175, 275 155, 260 135 S 230 105, 245 185"
                fill="none"
                stroke="#D6B53A"
                strokeWidth="2.5"
                strokeDasharray="3 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />

              {/* ── Blueprint corner marks ── */}
              <g stroke="#D6B53A" strokeWidth="1" strokeOpacity="0.2">
                <line x1="20" y1="20" x2="44" y2="20" />
                <line x1="20" y1="20" x2="20" y2="44" />
                <line x1="380" y1="20" x2="356" y2="20" />
                <line x1="380" y1="20" x2="380" y2="44" />
                <line x1="20" y1="380" x2="44" y2="380" />
                <line x1="20" y1="380" x2="20" y2="356" />
                <line x1="380" y1="380" x2="356" y2="380" />
                <line x1="380" y1="380" x2="380" y2="356" />
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
