import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { formatUsiaRingkas, tahapUsia } from '../../utils/age'
import { anakPath } from '../../utils/paths'

const PALET = ['bg-accent text-emerald-900', 'bg-amber-700 text-white', 'bg-brand-600 text-white']

export default function ChildListItem({ anak, index }) {
  return (
    <li>
      <Link
        to={anakPath(anak.id_bayi)}
        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-surface p-4 transition hover:border-brand-600/40"
      >
        <span
          aria-hidden="true"
          className={`grid size-14 shrink-0 place-items-center rounded-full text-xl font-medium ${PALET[index % PALET.length]}`}
        >
          {anak.nama.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xl text-slate-900">{anak.nama}</span>
          <span className="block text-sm font-semibold text-slate-500">
            {formatUsiaRingkas(anak.usia_bulan)} • {tahapUsia(anak.usia_bulan)}
          </span>
        </span>
        <ChevronRight size={22} className="shrink-0 text-slate-400" aria-hidden="true" />
      </Link>
    </li>
  )
}