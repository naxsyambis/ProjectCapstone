const TONES = {
  brand: 'bg-brand-100 text-brand-600',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
}

export default function StatCard({ label, nilai, icon: Icon, tone = 'brand' }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
      <span className={`grid size-11 place-items-center rounded-xl ${TONES[tone]}`}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <p className="mt-4 text-3xl font-bold text-slate-900">{nilai}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  )
}