import { FileText, BadgeCheck } from 'lucide-react'
import { formatWaktuRelatif } from '../../utils/time'

const ACTIVITY_ICONS = { jurnal: FileText, modul: BadgeCheck }

export default function RecentActivity({ items }) {
  return (
    <section className="mt-8" aria-labelledby="aktivitas-terbaru">
      <h2 id="aktivitas-terbaru" className="text-lg font-semibold text-slate-900">
        Aktivitas Terbaru
      </h2>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">Belum ada aktivitas.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          {items.map((item) => {
            const Icon = ACTIVITY_ICONS[item.tipe] ?? FileText
            return (
              <li key={item.id} className="flex items-center gap-4 px-5 py-4">
                <Icon size={26} className="shrink-0 text-slate-500" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-[17px] text-slate-900">{item.judul}</p>
                  <p className="text-sm font-medium text-slate-600">{formatWaktuRelatif(item.waktu)}</p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}