const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

export function UpdatedDate({ date }: { date: string }) {
  return (
    <p className="mt-4 text-xs text-slate font-sans tracking-wide">
      <time dateTime={date}>Updated {formatDate(date)}</time>
    </p>
  )
}
