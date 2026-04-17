'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

// ─── Leak point positions along the pipe ─────────────────────────────────────
const LEAK_POINTS = [200, 400, 600] as const

// ─── Single animated droplet ──────────────────────────────────────────────────
function Droplet({
  cx,
  delay,
  isAccelerated,
}: {
  cx: number
  delay: number
  isAccelerated: boolean
}) {
  return (
    <motion.g
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, 80, 160],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: isAccelerated ? 0.9 : 1.8,
        repeat: Infinity,
        delay,
        ease: 'easeIn',
        times: [0, 0.3, 1],
      }}
    >
      {/* Drop body */}
      <ellipse cx={cx} cy={153} rx="8" ry="9" fill="#D6B53A" />
      {/* Drop tip */}
      <path
        d={`M ${cx - 4} 153 Q ${cx} 162 ${cx + 4} 153`}
        fill="#D6B53A"
      />
      {/* Dollar sign */}
      <text
        x={cx}
        y={156}
        textAnchor="middle"
        fontSize="10"
        fill="#121B30"
        fontWeight="800"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        $
      </text>
    </motion.g>
  )
}

// ─── Leak cluster — three staggered droplets at one x position ───────────────
function LeakCluster({
  cx,
  leakIndex,
  hoveredIndex,
}: {
  cx: number
  leakIndex: number
  hoveredIndex: number | null
}) {
  const isAccelerated = hoveredIndex === leakIndex
  const baseDelay = leakIndex * 0.4 // offset each cluster so they don't sync

  return (
    <g>
      <Droplet cx={cx} delay={baseDelay + 0} isAccelerated={isAccelerated} />
      <Droplet
        cx={cx}
        delay={baseDelay + (isAccelerated ? 0.3 : 0.6)}
        isAccelerated={isAccelerated}
      />
      <Droplet
        cx={cx}
        delay={baseDelay + (isAccelerated ? 0.6 : 1.2)}
        isAccelerated={isAccelerated}
      />
    </g>
  )
}

// ─── The SVG pipeline diagram ─────────────────────────────────────────────────
function PipeDiagram({ hoveredIndex }: { hoveredIndex: number | null }) {
  return (
    <svg
      viewBox="0 0 800 360"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Glow filter for hovered leak ── */}
      <defs>
        <filter id="leak-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle noise / depth fill for pipe interior */}
        <linearGradient id="pipe-fill" x1="0" y1="100" x2="0" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A2744" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#121B30" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* ── Pipe interior fill ── */}
      <rect x="40" y="100" width="720" height="40" fill="url(#pipe-fill)" />

      {/* ── Pipe top edge — full continuous line ── */}
      <line x1="40" y1="100" x2="760" y2="100" stroke="#D6B53A" strokeWidth="2" />

      {/* ── Pipe bottom edge — broken at leak points (gaps ±15px around each) ── */}
      <line x1="40"  y1="140" x2="185" y2="140" stroke="#D6B53A" strokeWidth="2" />
      <line x1="215" y1="140" x2="385" y2="140" stroke="#D6B53A" strokeWidth="2" />
      <line x1="415" y1="140" x2="585" y2="140" stroke="#D6B53A" strokeWidth="2" />
      <line x1="615" y1="140" x2="760" y2="140" stroke="#D6B53A" strokeWidth="2" />

      {/* ── End caps ── */}
      <line x1="40"  y1="100" x2="40"  y2="140" stroke="#D6B53A" strokeWidth="2" />
      <line x1="760" y1="100" x2="760" y2="140" stroke="#D6B53A" strokeWidth="2" />

      {/* ── Interior dashed center line — depth detail ── */}
      <line
        x1="40" y1="120" x2="760" y2="120"
        stroke="#D6B53A" strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.35"
      />

      {/* ── Leak point indicators & labels ── */}
      {LEAK_POINTS.map((cx, i) => {
        const isHovered = hoveredIndex === i
        const label = ['01', '02', '03'][i]

        return (
          <g key={cx} filter={isHovered ? 'url(#leak-glow)' : undefined}>
            {/* Vertical connector line from label down to pipe top */}
            <line
              x1={cx} y1="78"
              x2={cx} y2="100"
              stroke="#D6B53A"
              strokeWidth="1"
              opacity={isHovered ? 0.9 : 0.4}
            />

            {/* Eyebrow label */}
            <text
              x={cx}
              y="68"
              textAnchor="middle"
              fontSize="13"
              fill="#D6B53A"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fontWeight="400"
              opacity={isHovered ? 1 : 0.55}
            >
              {label}
            </text>

            {/* Gap highlight — small bracket at the gap */}
            <path
              d={`M ${cx - 15} 140 L ${cx} 148 L ${cx + 15} 140`}
              stroke="#D6B53A"
              strokeWidth={isHovered ? 2 : 1.5}
              opacity={isHovered ? 0.9 : 0.6}
              strokeLinejoin="round"
            />
          </g>
        )
      })}

      {/* ── Animated droplet clusters ── */}
      {LEAK_POINTS.map((cx, i) => (
        <LeakCluster key={cx} cx={cx} leakIndex={i} hoveredIndex={hoveredIndex} />
      ))}

      {/* ── Blueprint corner marks — subtle framing ── */}
      <g stroke="#D6B53A" strokeWidth="1" opacity="0.15">
        <line x1="10" y1="10" x2="30" y2="10" />
        <line x1="10" y1="10" x2="10" y2="30" />
        <line x1="790" y1="10" x2="770" y2="10" />
        <line x1="790" y1="10" x2="790" y2="30" />
        <line x1="10"  y1="350" x2="30"  y2="350" />
        <line x1="10"  y1="350" x2="10"  y2="330" />
        <line x1="790" y1="350" x2="770" y2="350" />
        <line x1="790" y1="350" x2="790" y2="330" />
      </g>

      {/* ── Flow arrows in pipe — left and right of center ── */}
      <g stroke="#D6B53A" strokeWidth="1.5" opacity="0.2" strokeLinecap="round">
        {/* Left section arrows */}
        <polyline points="80,120 96,115 80,110" />
        <polyline points="140,120 156,115 140,110" />
        {/* Right section arrows */}
        <polyline points="640,120 656,115 640,110" />
        <polyline points="700,120 716,115 700,110" />
      </g>
    </svg>
  )
}

// ─── Stage card ───────────────────────────────────────────────────────────────
function StageCard({
  stage,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  stage: (typeof siteContent.leak.stages)[number]
  index: number
  hoveredIndex: number | null
  onHover: () => void
  onLeave: () => void
}) {
  const isHovered = hoveredIndex === index

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        'group relative p-8 border border-mist/10 bg-ink/40 backdrop-blur-sm transition-all duration-500 cursor-default',
        isHovered && 'border-ember/40 bg-navy/50'
      )}
    >
      {/* Ember left accent bar — visible on hover */}
      <div
        className={cn(
          'absolute left-0 top-8 bottom-8 w-[2px] bg-ember transition-all duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />

      <p className="font-display italic text-5xl text-ember leading-none">
        {stage.number}
      </p>
      <h3 className="mt-6 font-sans font-bold text-lg text-mist">
        {stage.label}
      </h3>
      <p className="mt-3 text-sm text-fog leading-relaxed">
        {stage.description}
      </p>
      <p className="mt-8 text-[11px] uppercase tracking-[0.15em] text-ember font-semibold">
        {stage.stat}
      </p>
    </div>
  )
}

// ─── LeakVisualization ────────────────────────────────────────────────────────
export function LeakVisualization() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { leak } = siteContent

  return (
    <section className="relative overflow-hidden bg-navy-deep py-32">
      {/* Subtle radial glow — bottom center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom center, rgba(30,147,163,0.06), transparent 65%)',
        }}
      />

      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-12 gap-12 items-start">
            {/* Left column — heading */}
            <div className="col-span-12 lg:col-span-5">
              <SectionHeading
                eyebrow={leak.eyebrow}
                title={leak.title}
                titleAccent={leak.titleAccent}
                description={leak.description}
              />
            </div>

            {/* Right column — pipe diagram */}
            <div className="col-span-12 lg:col-span-7 flex items-center pt-4 lg:pt-0">
              <PipeDiagram hoveredIndex={hoveredIndex} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Stage cards */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {leak.stages.map((stage, index) => (
              <StageCard
                key={stage.number}
                stage={stage}
                index={index}
                hoveredIndex={hoveredIndex}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
