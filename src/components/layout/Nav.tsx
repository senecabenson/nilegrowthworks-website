'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import { siteContent } from '@/content/site'

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`sticky top-0 z-40 backdrop-blur-md bg-ink/70 border-b border-mist/5 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          {/* Left: wordmark */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/logos/nile-wordmark-white.png"
              alt="NILE GrowthWorks"
              width={140}
              height={28}
              priority
              className="h-7 w-auto"
            />
            <span className="font-sans font-extrabold text-mist text-[13px] sm:text-[15px] tracking-wide leading-tight">
              NILE<br /><span className="font-normal text-[11px] sm:text-[13px] tracking-[0.04em] text-fog">GrowthWorks</span>
            </span>
          </Link>

          {/* Center: nav links (desktop only) */}
          <ul className="hidden md:flex items-center gap-8">
            {siteContent.nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] font-sans uppercase tracking-[0.15em] text-slate hover:text-mist transition-colors border-b-[1.5px] border-transparent hover:border-ember transition-all duration-300 pb-0.5"
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: CTA (desktop only) + hamburger (mobile) */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <MagneticButton variant="primary" href={siteContent.nav.cta.href}>
                {siteContent.nav.cta.label}
              </MagneticButton>
            </div>
            <button
              className="md:hidden text-mist hover:text-ember transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-30 pt-[72px] bg-ink/95 backdrop-blur-md border-b border-mist/10"
          >
            <div className="container-x py-8 flex flex-col gap-6">
              {siteContent.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[13px] font-sans uppercase tracking-[0.15em] text-slate hover:text-mist transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <MagneticButton
                  variant="primary"
                  href={siteContent.nav.cta.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {siteContent.nav.cta.label}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
