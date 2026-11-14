const TONES = {
  brand: 'bg-brand-100 text-brand-600',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
}

export default function AuthCard({ icon: Icon, tone = 'brand', title, subtitle, children }) {
  return (
    <section className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
      <div className="flex flex-col items-center text-center">
        <span className={`grid size-16 place-items-center rounded-2xl ${TONES[tone]}`}>
          <Icon size={30} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-2 leading-relaxed text-slate-600">{subtitle}</p>}
      </div>
      <div className="mt-7">{children}</div>
    </section>
  )
}