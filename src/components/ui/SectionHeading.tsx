import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  titleAccent?: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

function renderTitle(title: string, titleAccent?: string): React.ReactNode {
  if (!titleAccent) return title

  const idx = title.indexOf(titleAccent)
  if (idx === -1) return title

  const before = title.slice(0, idx)
  const after = title.slice(idx + titleAccent.length)

  return (
    <>
      {before}
      <em className="italic font-light text-ember">{titleAccent}</em>
      {after}
    </>
  )
}

export default function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-16 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <p className="text-eyebrow font-sans uppercase text-ember tracking-[0.2em]">
        {eyebrow}
      </p>
      <h2 className="font-display text-h2 text-mist mt-4">
        {renderTitle(title, titleAccent)}
      </h2>
      {description && (
        <p className="mt-4 text-body text-fog max-w-2xl">{description}</p>
      )}
    </div>
  )
}
