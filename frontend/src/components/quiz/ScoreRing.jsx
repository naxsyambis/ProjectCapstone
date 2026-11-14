export default function ScoreRing({ nilai, lulus }) {
  const r = 70
  const keliling = 2 * Math.PI * r
  const persen = Math.min(100, Math.max(0, nilai))
  const offset = keliling * (1 - persen / 100)

  return (
    <div className="relative size-44">
      <svg viewBox="0 0 180 180" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="90" cy="90" r={r} fill="none" strokeWidth="12" className="stroke-slate-200" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={keliling}
          strokeDashoffset={offset}
          className={lulus ? 'stroke-emerald-700' : 'stroke-amber-600'}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-4xl font-extrabold text-slate-900">{Math.round(nilai)}%</span>
        <span className="text-sm text-slate-500">Skor</span>
      </div>
    </div>
  )
}