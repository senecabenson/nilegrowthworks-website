'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface MagneticButtonProps {
  variant?: 'primary' | 'ghost'
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const springConfig = { stiffness: 200, damping: 15, mass: 0.5 }

export default function MagneticButton({
  variant = 'primary',
  href,
  children,
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = e.clientX - centerX
    const offsetY = e.clientY - centerY
    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2)

    if (distance < 120) {
      x.set(Math.max(-10, Math.min(10, offsetX * 0.15)))
      y.set(Math.max(-10, Math.min(10, offsetY * 0.15)))
    }
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  const baseStyles =
    'inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-colors duration-300 px-6 py-3 rounded-sm group'

  const variantStyles =
    variant === 'primary'
      ? 'bg-ember text-ink font-semibold hover:bg-ember-soft'
      : 'border border-mist/20 text-mist hover:border-ember hover:text-ember'

  const content = (
    <>
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  )

  return (
    <div
      ref={ref}
      className="inline-block"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ x: springX, y: springY }}>
        {href ? (
          <a href={href} className={cn(baseStyles, variantStyles, className)}>
            {content}
          </a>
        ) : (
          <button onClick={onClick} className={cn(baseStyles, variantStyles, className)}>
            {content}
          </button>
        )}
      </motion.div>
    </div>
  )
}
