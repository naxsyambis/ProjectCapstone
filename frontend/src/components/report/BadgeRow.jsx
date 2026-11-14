import { Lock, Trophy } from 'lucide-react'
import { IKON_LENCANA, WARNA_LENCANA } from '../../utils/badges'

export default function BadgeRow({ lencana }) {
  if (lencana.length === 0) {
    return <p className="mt-4 leading-relaxed text-slate-500">Belum ada lencana. Selesaikan misi untuk mendapatkannya.</p>
  }

  return (
    <ul className="mt-5 grid grid-cols-3 gap-3">
      {lencana.map((l) => {
        const diraih = l.status === 'diraih'
        const Icon = IKON_LENCANA[l.ikon] ?? Trophy

        return (
          <li key={l.id} className="flex flex-col items-center text-center">
            <span
              className={`grid size-20 place-items-center rounded-full ${
                diraih ? (WARNA_LENCANA[l.ikon] ?? WARNA_LENCANA.trofi) : 'bg-slate-100 text-slate-400'
              }`}
            >
              {diraih ? <Icon size={32} aria-hidden="true" /> : <Lock size={30} aria-hidden="true" />}
            </span>
            <span className={`mt-2 text-sm font-semibold leading-tight ${diraih ? 'text-slate-900' : 'text-slate-400'}`}>
              {diraih ? l.nama : 'Terkunci'}
            </span>
            {!diraih && <span className="sr-only">{l.nama}</span>}
          </li>
        )
      })}
    </ul>
  )
}