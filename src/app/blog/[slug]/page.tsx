import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import FaqBlock from '@/components/services/FaqBlock'
import { FinalCTA } from '@/components/home/FinalCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildBlogPostingSchema } from '@/lib/schema'
import { blogPosts, getBlogPost } from '@/content/blog-data'
import { getServicePage } from '@/content/services-data'

const SITE_URL = 'https://nilegrowthworks.com'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url,
      siteName: 'NILE GrowthWorks',
      publishedTime: post.publishedAt,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const relatedService = post.relatedService ? getServicePage(post.relatedService) : undefined

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ])
  const blogPosting = buildBlogPostingSchema(post)

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={blogPosting} />

      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-40 md:pb-28 bg-navy relative">
        <div className="container-x">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <p className="text-eyebrow font-sans uppercase tracking-[0.3em] text-teal">
                BLOG
              </p>
              <h1 className="mt-6 font-display text-h1 text-mist leading-[1.02] text-balance">
                {post.title}
              </h1>
              <p className="mt-6 text-xs uppercase tracking-[0.15em] text-slate">
                {formatDate(post.publishedAt)}
              </p>
              <p className="mt-8 text-body text-fog max-w-2xl leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-32 bg-ink">
        <div className="container-x">
          <div className="max-w-3xl space-y-16">
            {post.sections.map((section, i) => (
              <RevealOnScroll key={section.heading} delay={i * 0.05}>
                <h2 className="font-display text-2xl md:text-3xl text-mist">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j} className="text-body text-fog leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </RevealOnScroll>
            ))}

            {relatedService && (
              <RevealOnScroll>
                <div className="border border-mist/10 bg-navy-deep/60 p-6 sm:p-8">
                  <p className="text-eyebrow font-sans uppercase tracking-[0.25em] text-ember">
                    See it priced for your business
                  </p>
                  <p className="mt-4 text-body text-fog leading-relaxed">
                    Read the {relatedService.vertical} Revenue Leak Diagnostic to see these numbers run against your own business.
                  </p>
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="mt-6 inline-block text-sm font-sans uppercase tracking-[0.15em] text-teal hover:text-mist transition-colors border-b-[1.5px] border-teal/40 hover:border-mist pb-0.5"
                  >
                    {relatedService.vertical} Diagnostic
                  </Link>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {post.faq && post.faq.length > 0 && <FaqBlock faq={post.faq} />}

      <FinalCTA />
    </>
  )
}
