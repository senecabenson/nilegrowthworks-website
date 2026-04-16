import { cn } from '@/lib/cn'

interface BlueprintGridProps {
  className?: string
}

export default function BlueprintGrid({ className }: BlueprintGridProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: [
          'linear-gradient(to right, rgba(214,181,58,0.04) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(214,181,58,0.04) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '48px 48px',
      }}
    />
  )
}
