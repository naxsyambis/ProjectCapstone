import { BadgeCheck, BookOpen, Clock, Download, FileText, Lightbulb } from 'lucide-react'
import { formatUkuran } from '../../utils/format'

function KeyPoints({ items }) {
  return (
    <section className="mt-8" aria-labelledby="poin-penting">
      <h2 id="poin-penting" className="flex items-center gap-2 text-xl font-bold text-slate-900">
        <Lightbulb size={22} className="text-brand-600" aria-hidden="true" />
        Poin Penting
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((p, i) => (
          <li key={p.judul} className="relative overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-slate-200/70">
            <span
              aria-hidden="true"
              className={`absolute -right-8 -top-8 size-24 rounded-full ${i % 2 === 0 ? 'bg-accent/25' : 'bg-brand-100'}`}
            />
            <h3 className="relative font-semibold text-slate-900">{p.judul}</h3>
            <p className="relative mt-1.5 leading-relaxed text-slate-600">{p.isi}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Resource({ pdf }) {
  const ukuran = formatUkuran(pdf.ukuran_byte)

  return (
    <section className="mt-8" aria-labelledby="sumber-daya">
      <h2 id="sumber-daya" className="flex items-center gap-2 text-xl font-bold text-slate-900">
        <BookOpen size={22} className="text-brand-600" aria-hidden="true" />
        Sumber Daya
      </h2>
      {/* NANTI: pdf.url menunjuk ke controller backend yang memeriksa akses, bukan file langsung */}
      <a
        href={pdf.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="mt-4 flex items-center gap-4 rounded-2xl bg-slate-100 p-4 transition hover:bg-slate-200/70"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
          <FileText size={22} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug text-slate-900">{pdf.nama}</span>
          <span className="block text-sm text-slate-500">PDF{ukuran && ` • ${ukuran}`}</span>
        </span>
        <Download size={22} className="shrink-0 text-slate-600" aria-label="Unduh" />
      </a>
    </section>
  )
}

export default function SummaryTab({ materi }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {materi.durasi_menit > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm font-medium text-slate-700">
            <Clock size={15} aria-hidden="true" />
            {materi.durasi_menit} menit
          </span>
        )}
        {materi.diverifikasi_oleh && (
          <span
            title={`Diverifikasi oleh ${materi.diverifikasi_oleh}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700"
          >
            <BadgeCheck size={18} aria-hidden="true" />
            Diverifikasi Ahli
            <span className="sr-only">oleh {materi.diverifikasi_oleh}</span>
          </span>
        )}
      </div>

      {materi.ringkasan && <p className="mt-5 text-[17px] leading-relaxed text-slate-700">{materi.ringkasan}</p>}
      {materi.poin_penting?.length > 0 && <KeyPoints items={materi.poin_penting} />}
      {materi.pdf && <Resource pdf={materi.pdf} />}
    </div>
  )
}