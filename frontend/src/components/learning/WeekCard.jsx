import { Link } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'
import Button from '../ui/Button'
import { materiPath } from '../../utils/paths'

const NODE = {
  selesai: { icon: Check, box: 'bg-emerald-600 text-white' },
  berjalan: { icon: Play, box: 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 ring-4 ring-white' },
  terkunci: { icon: Lock, box: 'bg-slate-200 text-slate-500' },
}

export default function WeekCard({ item, terakhir }) {
  const { icon: Icon, box } = NODE[item.status]
  const selesai = item.status === 'selesai'
  const aktif = item.status === 'berjalan'
  const kunci = item.status === 'terkunci'

  return (
    <li className="relative pl-16">
      {/* garis penghubung ke minggu berikutnya */}
      {!terakhir && (
        <span
          aria-hidden="true"
          className={`absolute -bottom-5 left-[21px] top-12 w-0.5 ${selesai ? 'bg-emerald-300' : 'bg-slate-200'}`}
        />
      )}
      <span aria-hidden="true" className={`absolute left-0 top-0 grid size-11 place-items-center rounded-full ${box}`}>
        <Icon size={20} className={aktif ? 'ml-0.5 fill-current' : ''} />
      </span>

      <article
        className={`rounded-2xl border p-5 ${
          kunci ? 'border-slate-200 bg-white/60' : 'bg-white shadow-sm'
        } ${aktif ? 'border-brand-600/30 shadow-md' : 'border-slate-200'}`}
      >
        <p
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
            kunci ? 'text-slate-400' : 'text-brand-600'
          }`}
        >
          Minggu {item.urutan}
          {selesai && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] normal-case tracking-normal text-emerald-700">
              Selesai
            </span>
          )}
        </p>

        <h3 className={`mt-1 text-2xl font-bold ${kunci ? 'text-slate-400' : 'text-slate-900'}`}>{item.judul}</h3>
        <p
          className={`mt-1.5 text-[17px] leading-snug ${
            kunci ? 'text-slate-400' : aktif ? 'text-brand-700' : 'text-slate-600'
          }`}
        >
          {item.subjudul}
        </p>

        {aktif && (
          <Button as={Link} to={materiPath(item.id_materi)} className="mt-5 w-full">
            Lanjutkan
          </Button>
        )}
        {selesai && (
          <Button as={Link} to={materiPath(item.id_materi)} variant="secondary" className="mt-5 w-full">
            Tinjau Ulang
          </Button>
        )}
        {kunci && (
          <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-400">
            <Lock size={14} aria-hidden="true" />
            Terbuka setelah kuis Minggu {item.urutan - 1} lulus
          </p>
        )}
      </article>
    </li>
  )
}