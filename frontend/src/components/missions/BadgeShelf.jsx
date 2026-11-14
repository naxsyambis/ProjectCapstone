import { Link } from 'react-router-dom'
import { Lock, Trophy } from 'lucide-react'
import Meter from '../ui/Meter'
import { IKON_LENCANA as IKON, WARNA_LENCANA as WARNA } from '../../utils/badges'
import { ROUTES } from '../../utils/constants'

export default function BadgeShelf({ lencana }) {
  if (!lencana?.length) return null

  return (
    <section className="mt-8" aria-labelledby="lencana-anda">
      <div className="flex items-center justify-between">
        <h2 id="lencana-anda" className="text-lg font-semibold text-slate-900">
          Lencana Anda
        </h2>
        <Link to={ROUTES.REPORT} className="text-sm font-semibold text-brand-600 hover:underline">
          Lihat Semua
        </Link>
      </div>

      <ul className="-mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {lencana.map((l) => {
          const Icon = IKON[l.ikon] ?? Trophy
          const terkunci = l.status === 'terkunci'

          return (
            <li key={l.id} className="w-36 shrink-0 rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200/70">
              <span
                className={`mx-auto grid size-16 place-items-center rounded-full ${
                  terkunci ? 'bg-slate-100 text-slate-400' : WARNA[l.ikon] ?? WARNA.trofi
                }`}
              >
                {terkunci ? <Lock size={26} aria-hidden="true" /> : <Icon size={28} aria-hidden="true" />}
              </span>
              <p className={`mt-3 font-semibold leading-tight ${terkunci ? 'text-slate-400' : 'text-slate-900'}`}>{l.nama}</p>
              <p className="mt-1 text-xs text-slate-500">{l.info}</p>
              {l.status === 'berjalan' && l.progres && (
                <div className="mt-2">
                  <Meter value={l.progres.saat_ini} max={l.progres.target} tone="slate" label={`${l.nama}: ${l.info}`} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}