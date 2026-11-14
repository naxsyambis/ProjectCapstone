export default function ChoiceGroup({ legend, options, registration, error }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-slate-800">{legend}</legend>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input type="radio" value={option.value} className="peer sr-only" {...registration} />
            <span className="flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/70 text-[15px] font-medium text-slate-700 transition peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-600/20">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  )
}