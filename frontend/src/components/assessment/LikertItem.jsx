export default function LikertItem({ butir, nomor, skala, value, missing, onChange }) {
  const textId = `butir-teks-${butir.id_pertanyaan}`

  return (
    <article
      id={`butir-${butir.id_pertanyaan}`}
      className={`rounded-3xl bg-white p-5 shadow-sm transition ${
        missing ? 'ring-2 ring-red-300' : 'ring-1 ring-slate-200/70'
      }`}
    >
      <div className="flex gap-3">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-600"
        >
          {nomor}
        </span>
        <div className="min-w-0">
          <p id={textId} className="text-[17px] font-medium leading-snug text-slate-900">
            {butir.teks}
          </p>
          {butir.sublabel && <p className="mt-1 text-sm text-slate-400">{butir.sublabel}</p>}
        </div>
      </div>

      <div
        role="radiogroup"
        aria-labelledby={textId}
        className="mt-4 grid grid-cols-5 gap-1 rounded-2xl border border-slate-200 bg-slate-50/60 p-1"
      >
        {skala.map((s) => {
          const dipilih = value === s.nilai

          return (
            <label key={s.nilai} className="cursor-pointer">
              <input
                type="radio"
                name={`butir-${butir.id_pertanyaan}`}
                value={s.nilai}
                checked={dipilih}
                onChange={() => onChange(s.nilai)}
                className="peer sr-only"
              />
              <span
                className={`flex h-14 flex-col items-center justify-center rounded-xl text-center transition peer-focus-visible:ring-4 peer-focus-visible:ring-brand-600/30 ${
                  dipilih ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <span className="text-base font-semibold leading-none">{s.nilai}</span>
                <span className={`mt-1 text-[10px] leading-none ${dipilih ? 'text-white/85' : 'text-slate-400'}`}>
                  {s.singkat ?? s.label}
                </span>
              </span>
            </label>
          )
        })}
      </div>

      {missing && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          Butir ini belum dijawab.
        </p>
      )}
    </article>
  )
}