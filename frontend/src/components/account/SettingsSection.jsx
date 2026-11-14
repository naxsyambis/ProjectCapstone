const TONES = { default: 'ring-slate-200/70', danger: 'ring-red-200' }

export default function SettingsSection({ icon: Icon, title, description, tone = 'default', children }) {
  return (
    <section className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ${TONES[tone]}`}>
      <h2
        className={`flex items-center gap-3 text-xl font-semibold ${tone === 'danger' ? 'text-red-800' : 'text-slate-900'}`}
      >
        {Icon && <Icon size={24} aria-hidden="true" />}
        {title}
      </h2>
      {description && <p className="mt-2 leading-relaxed text-slate-600">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}