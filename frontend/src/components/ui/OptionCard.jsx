export default function OptionCard({ name, value, checked, onChange, children }) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        className={`flex items-start gap-4 rounded-2xl border-2 px-5 py-5 text-lg leading-snug transition peer-focus-visible:ring-4 peer-focus-visible:ring-brand-600/25 ${
          checked
            ? 'border-brand-600 bg-brand-100/70 text-slate-900'
            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 ${
            checked ? 'border-brand-600' : 'border-slate-300'
          }`}
        >
          {checked && <span className="size-3.5 rounded-full bg-brand-600" />}
        </span>
        <span>{children}</span>
      </span>
    </label>
  )
}