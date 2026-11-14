import { Circle, CircleCheck } from 'lucide-react'

export default function MissionChecklist({ items, tampilkanAnak }) {
  if (items.length === 0) {
    return (
      <p className="mt-4 leading-relaxed text-slate-500">
        Belum ada misi. Misi muncul setelah screening anak berstatus aman.
      </p>
    )
  }

  return (
    <ul className="mt-5 space-y-3">
      {items.map((m) => (
        <li key={m.id} className="flex items-center gap-3 text-lg">
          {m.selesai ? (
            <CircleCheck size={26} className="shrink-0 text-emerald-700" aria-label="Selesai" />
          ) : (
            <Circle size={26} className="shrink-0 text-slate-400" aria-label="Belum selesai" />
          )}
          <span className={m.selesai ? 'text-slate-900' : 'text-slate-500'}>
            {m.judul}
            {tampilkanAnak && <span className="text-sm text-slate-400"> • {m.anak}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}