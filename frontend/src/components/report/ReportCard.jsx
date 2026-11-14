export default function ReportCard({ title, icon: Icon, iconClass = 'text-brand-600', aside, children }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
          {Icon && <Icon size={26} className={iconClass} aria-hidden="true" />}
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}