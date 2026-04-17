import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { siteContent } from '@/content/site'

// Highlight specific phrases in the quote with italic ember styling
function HighlightedQuote({ text }: { text: string }) {
  const phrases = ['generate', 'handled', 'followed up on', 'retained', 'systematically']

  // We'll manually split the known quote to apply highlights
  // Quote: "We don't generate leads. We make sure every lead, customer, and dollar already in the door
  //         gets handled, followed up on, and retained — systematically."
  const result: React.ReactNode[] = []
  let remaining = text
  const used = new Set<string>()

  // Process the text character by character looking for phrases
  while (remaining.length > 0) {
    let matched = false
    for (const phrase of phrases) {
      if (!used.has(phrase) && remaining.startsWith(phrase)) {
        result.push(
          <em key={phrase} className="italic text-ember not-italic">
            {phrase}
          </em>
        )
        remaining = remaining.slice(phrase.length)
        used.add(phrase)
        matched = true
        break
      }
    }
    if (!matched) {
      // Add single character as text
      const lastNode = result[result.length - 1]
      if (typeof lastNode === 'string') {
        result[result.length - 1] = lastNode + remaining[0]
      } else {
        result.push(remaining[0])
      }
      remaining = remaining.slice(1)
    }
  }

  return <>{result}</>
}

export function ProblemStatement() {
  return (
    <section className="py-20 md:py-40 bg-ink relative">
      <div className="container-x max-w-6xl">
        <RevealOnScroll>
          <p className="font-display text-h1 italic text-mist leading-[1.1] text-balance">
            &ldquo;<HighlightedQuote text={siteContent.problem.quote} />&rdquo;
          </p>
          <p className="mt-12 text-eyebrow uppercase tracking-[0.3em] text-slate">
            &mdash; {siteContent.problem.attribution}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
