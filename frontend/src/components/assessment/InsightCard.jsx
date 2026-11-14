const TONES = {
  success: { box: 'border-emerald-200 bg-emerald-50', icon: 'bg-emerald-700 text-white', title: 'text-emerald-800' },
  focus: { box: 'border-amber-200 bg-amber-50', icon: 'bg-amber-800 text-white', title: 'text-amber-800' },
}

export default function InsightCard({ icon: Icon, title, items, tone }) {
  if (!items?.length) return null
  const t = TONES[tone]

  return (
    <section className={`rounded-2xl border p-5 ${t.box}`}>
      <h3 className={`flex items-center gap-3 text-[17px] font-medium ${t.title}`}>
        <span className={`grid size-10 place-items-center rounded-full ${t.icon}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
        {title}
      </h3>

      <ul className="mt-4 list-disc space-y-3 pl-6 text-[17px] leading-relaxed text-slate-700 marker:text-slate-400">
        {items.map((teks) => (
          <li key={teks}>{teks}</li>
        ))}
      </ul>
    </section>
  )
}