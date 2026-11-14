const tones = {
  brand: 'bg-brand-600',
  accent: 'bg-accent',
  slate: 'bg-slate-500',
}

const sizes = {
  md: 'h-2.5',
  sm: 'h-1.5',
}

export default function Meter({ value, max = 100, tone = 'brand', size = 'md', label }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={`${sizes[size]} w-full overflow-hidden rounded-full bg-slate-200`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${tones[tone]}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}