import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { FinalCTA } from '@/components/home/FinalCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/schema'
import { blogPosts } from '@/content/blog-data'

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
])

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-40 md:pb-28 bg-navy relative">
        <div className="container-x">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
                BLOG
              </p>
              <h1 className="mt-6 font-display text-h1 text-mist leading-[1.02] text-balance">
                Where revenue{' '}
                <em className="italic font-light text-ember">actually leaks.</em>
              </h1>
              <p className="mt-8 text-body text-fog max-w-2xl leading-relaxed">
                Notes from real diagnostics: where San Diego service businesses lose revenue, and what fixing it is worth.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Post list */}
      <section className="py-16 md:py-32 bg-ink">
        <div className="container-x">
          <RevealOnScroll>
            <SectionHeading eyebrow="LATEST" title="Recent posts." titleAccent="posts." />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {blogPosts.map((post, i) => (
              <RevealOnScroll key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block border border-mist/10 bg-navy-deep/60 p-6 sm:p-8 h-full hover:border-ember/40 transition-colors"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-slate">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="mt-4 font-display text-2xl text-mist">{post.title}</h2>
                  <p className="mt-4 text-sm text-fog leading-relaxed">{post.excerpt}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
