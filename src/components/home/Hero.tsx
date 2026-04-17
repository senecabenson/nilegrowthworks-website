'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import BlueprintGrid from '@/components/ui/BlueprintGrid'
import MagneticButton from '@/components/ui/MagneticButton'
import { siteContent } from '@/content/site'

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

          {/* Calculator teaser */}
          <motion.a
            variants={childVariants}
            href="#calculator"
            className="mt-6 inline-flex items-center gap-2 text-sm text-teal hover:text-ember transition-colors group"
          >
            <span className="border-b border-teal/40 group-hover:border-ember/60 transition-colors pb-0.5">
              Use our revenue loss calculator to see how much you may be leaving on the table
            </span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>

        {/* Right column — animated logo */}
        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative w-full max-w-[480px] ml-auto flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Ember glow behind logo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(214,181,58,0.12) 0%, rgba(30,147,163,0.06) 40%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Subtle teal ring pulse */}
            <motion.div
              className="absolute inset-[15%] rounded-full border border-teal/10"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            {/* The actual logo */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10"
            >
              <Image
                src="/logos/nile-wordmark-white.png"
                alt=""
                width={420}
                height={420}
                priority
                className="w-full h-auto drop-shadow-[0_0_40px_rgba(214,181,58,0.15)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
