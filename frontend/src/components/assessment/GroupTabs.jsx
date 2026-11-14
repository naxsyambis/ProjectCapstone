import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

export default function GroupTabs({ groups, activeName, completed, onSelect }) {
  const refs = useRef({})

  // Tab aktif selalu digulirkan ke tengah
  useEffect(() => {
    refs.current[activeName]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [activeName])

  return (
    <nav
      aria-label="Bagian asesmen"
      className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex w-max gap-2 py-1">
        {groups.map((g, i) => {
          const active = g.nama === activeName
          const done = completed[g.nama]

          return (
            <li key={g.nama}>
              <button
                type="button"
                ref={(el) => {
                  refs.current[g.nama] = el
                }}
                onClick={() => onSelect(g)}
                aria-current={active ? 'step' : undefined}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {i + 1}. {g.nama}
                {active && <span aria-hidden="true" className="size-2 rounded-full bg-white" />}
                {!active && done && <Check size={14} className="text-emerald-600" aria-label="Selesai" />}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}