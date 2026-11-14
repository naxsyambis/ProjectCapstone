import { Link } from 'react-router-dom'
import { Utensils, Moon, Target, ChevronRight } from 'lucide-react'
import { ROUTES } from '../../utils/constants'

const MISSION_ICONS = { makan: Utensils, tidur: Moon }

export default function UpcomingMissions({ items }) {
  return (
    <section className="mt-8" aria-labelledby="misi-mendatang">
      <h2 id="misi-mendatang" className="text-lg font-semibold text-slate-900">
        Misi Mendatang
      </h2>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">Belum ada misi mendatang.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((misi) => {
            const Icon = MISSION_ICONS[misi.ikon] ?? Target
            return (
              <li key={misi.id}>
                <Link
                  to={ROUTES.MISSION}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition hover:ring-brand-600/40"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-medium text-slate-900">{misi.judul}</span>
                    <span className="block text-sm text-slate-600">{misi.deskripsi}</span>
                  </span>
                  <ChevronRight size={22} className="shrink-0 text-brand-600" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}