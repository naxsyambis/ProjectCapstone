import { formatUsia } from '../../utils/age'

export default function ChildTabs({ anak, activeId, onSelect }) {
  if (anak.length < 2) return null

  return (
    <div
      role="tablist"
      aria-label="Pilih anak"
      className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {anak.map((a) => {
        const aktif = a.id_bayi === activeId
        return (
          <button
            key={a.id_bayi}
            type="button"
            role="tab"
            aria-selected={aktif}
            onClick={() => onSelect(a.id_bayi)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              aktif
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {a.nama} <span className={aktif ? 'text-white/80' : 'text-slate-400'}>• {formatUsia(a.usia_bulan)}</span>
          </button>
        )
      })}
    </div>
  )
}