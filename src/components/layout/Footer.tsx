import Link from 'next/link'
import { Mail } from 'lucide-react'
import { siteContent } from '@/content/site'

export function Footer() {
  return (
    <footer className="border-t border-mist/10 bg-ink">
      <div className="container-x pt-16 md:pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Column 1: tagline + copyright */}
          <div>
            <p className="font-display text-h2 italic text-ember leading-tight">
              {siteContent.footer.tagline}
            </p>
            <p className="text-xs text-slate mt-8">{siteContent.footer.copyright}</p>
          </div>

          {/* Column 2: contact */}
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${siteContent.footer.email}`}
              className="text-[14px] text-fog hover:text-teal transition-colors"
            >
              {siteContent.footer.email}
            </a>
            <span className="text-[14px] text-slate">{siteContent.footer.location}</span>
          </div>

          {/* Column 3: nav links + email icon */}
          <div className="flex flex-col gap-4">
            {siteContent.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans uppercase tracking-[0.15em] text-slate hover:text-mist transition-colors border-b-[1.5px] border-transparent hover:border-ember transition-all duration-300 pb-0.5 w-fit"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4">
              <a
                href={`mailto:${siteContent.footer.email}`}
                aria-label="Email NILE GrowthWorks"
                className="text-slate hover:text-ember transition-colors"
              >
                <Mail size={20} />
              </a>
              <div className="mt-6 h-px w-12 bg-gradient-to-r from-teal/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

