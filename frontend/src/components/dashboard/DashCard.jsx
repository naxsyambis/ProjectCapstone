export default function DashCard({ icon: Icon, title, aside, children, className = '' }) {
  return (
    <section className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-medium text-brand-600">
          <Icon size={20} aria-hidden="true" />
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}