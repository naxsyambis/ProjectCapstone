import { Link } from 'react-router-dom'
import { Check, CircleAlert, Clock, Lock } from 'lucide-react'

const TAMPIL = {
  done: { node: 'bg-emerald-700 text-white', icon: Check, card: 'border-transparent bg-brand-50', chip: 'text-slate-500' },
  active: { node: 'bg-brand-600 text-white shadow-md', icon: Clock, card: 'border-brand-600/40 bg-white', chip: 'text-brand-600' },
  attention: { node: 'bg-amber-600 text-white', icon: CircleAlert, card: 'border-amber-200 bg-amber-50', chip: 'text-amber-800' },
  pending: { node: 'bg-slate-200 text-slate-500', icon: Lock, card: 'border-dashed border-slate-200 bg-slate-50', chip: 'text-slate-400' },
}

export default function TimelineItem({ item, terakhir }) {
  const t = TAMPIL[item.state]
  const Icon = t.icon

  return (
    <li className="relative pl-16">
      {!terakhir && <span aria-hidden="true" className="absolute -bottom-4 left-[23px] top-12 w-0.5 bg-slate-200" />}
      <span aria-hidden="true" className={`absolute left-0 top-0 grid size-12 place-items-center rounded-full ${t.node}`}>
        <Icon size={22} />
      </span>

      <div className={`rounded-xl border p-4 ${t.card}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{item.judul}</h3>
          <span className={`shrink-0 text-sm font-semibold ${t.chip}`}>{item.chip}</span>
        </div>
        <p className="mt-1 leading-relaxed text-slate-600">{item.deskripsi}</p>
        {item.tautan && (
          <Link to={item.tautan.to} className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:underline">
            {item.tautan.label}
          </Link>
        )}
      </div>
    </li>
  )
}