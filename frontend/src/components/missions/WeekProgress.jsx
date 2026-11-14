import { Check } from 'lucide-react'
import Meter from '../ui/Meter'

export default function WeekProgress({ hari }) {
  const selesai = hari.filter((h) => h.selesai).length

  return (
    <section aria-label="Progres mingguan" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Progres Mingguan</h2>
        <p className="font-semibold text-brand-600">
          {selesai}/{hari.length} Hari
        </p>
      </div>

      <div className="mt-3">
        <Meter value={selesai} max={hari.length} tone="accent" label="Hari dengan misi selesai minggu ini" />
      </div>

      <ol className="mt-4 flex justify-between">
        {hari.map((h, i) => {
          const lingkaran = h.selesai
            ? 'bg-accent text-emerald-900'
            : h.hari_ini
              ? 'bg-white ring-2 ring-brand-600'
              : 'bg-white ring-2 ring-slate-200'

          return (
            <li key={i} className="flex flex-col items-center gap-1.5">
              <span className={`grid size-10 place-items-center rounded-full ${lingkaran}`}>
                {h.selesai && <Check size={18} aria-hidden="true" />}
                {h.selesai && <span className="sr-only">selesai</span>}
              </span>
              <span className={`text-sm ${h.hari_ini ? 'font-bold text-slate-900' : 'text-slate-500'}`}>{h.label}</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}