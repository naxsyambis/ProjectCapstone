export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div
      role="progressbar"
      aria-label={`Langkah ${current} dari ${total}`}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      className="h-1.5 w-full bg-slate-200"
    >
      <div className="h-full bg-accent transition-all duration-500" style={{ width: `${percent}%` }} />
    </div>
  )
}