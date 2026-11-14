import { BookOpen, Check, CircleCheck, Heart, Target, TreePine } from 'lucide-react'

const IKON = { buku: BookOpen, luar: TreePine, emosi: Heart }

const TAMPIL = {
  sedang_berjalan: { border: 'border-l-brand-600', ikon: 'bg-brand-600 text-white', poin: 'bg-brand-100 text-brand-700' },
  belum_mulai: { border: 'border-l-amber-700', ikon: 'bg-amber-700 text-white', poin: 'bg-amber-100 text-amber-800' },
  selesai: { border: 'border-l-emerald-500', ikon: 'bg-emerald-100 text-emerald-700', poin: '' },
}

export default function MissionCard({ misi, busy, onAction }) {
  const Icon = IKON[misi.ikon] ?? Target
  const t = TAMPIL[misi.status]
  const selesai = misi.status === 'selesai'

  return (
    <li className={`rounded-2xl border border-l-4 border-slate-200 bg-white p-5 shadow-sm ${t.border}`}>
      <div className="flex items-start justify-between gap-3">
        <span className={`grid size-12 place-items-center rounded-full ${t.ikon}`}>
          <Icon size={22} aria-hidden="true" />
        </span>
        {selesai ? (
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700">
            <Check size={14} aria-hidden="true" />
            Selesai
          </span>
        ) : (
          <span className={`rounded-lg px-2.5 py-1 text-sm font-semibold ${t.poin}`}>+{misi.poin} pt</span>
        )}
      </div>

      <h3 className={`mt-3 text-xl font-medium ${selesai ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{misi.judul}</h3>
      <p className={`mt-1 leading-relaxed ${selesai ? 'text-slate-400' : 'text-slate-600'}`}>{misi.deskripsi}</p>

      {misi.status === 'sedang_berjalan' && (
        <button
          type="button"
          onClick={() => onAction(misi, 'selesai')}
          disabled={busy}
          className="mt-4 h-12 w-full rounded-xl bg-brand-600 font-semibold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700 disabled:opacity-60"
        >
          {busy ? 'Memproses...' : 'Tandai Selesai'}
        </button>
      )}

      {misi.status === 'belum_mulai' && (
        <button
          type="button"
          onClick={() => onAction(misi, 'mulai')}
          disabled={busy}
          className="mt-4 h-12 w-full rounded-xl border-2 border-brand-600 bg-white font-semibold text-brand-600 transition hover:bg-brand-50 disabled:opacity-60"
        >
          {busy ? 'Memproses...' : 'Mulai'}
        </button>
      )}

      {selesai && (
        <div className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-100 font-medium text-slate-500">
          <CircleCheck size={20} aria-hidden="true" />
          Selesai
        </div>
      )}
    </li>
  )
}