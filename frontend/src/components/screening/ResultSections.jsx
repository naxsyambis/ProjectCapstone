import { Link } from 'react-router-dom'
import { ArrowRight, Brain, CircleAlert, CircleCheck, Lightbulb, Target } from 'lucide-react'
import Button from '../ui/Button'
import { misiPath } from '../../utils/paths'

const VARIAN = {
  at_risk: {
    box: 'border-red-200 bg-linear-to-br from-red-100 via-red-50 to-rose-100',
    icon: CircleAlert,
    iconClass: 'text-red-700',
    teks: 'text-red-700',
    judul: 'Perlu Perhatian',
    isi: 'Berdasarkan tanggapan Anda, beberapa area sosial-emosional berada di atas ambang perhatian dan sebaiknya diamati lebih cermat oleh profesional. Ini bukan diagnosis.',
  },
  aman: {
    box: 'border-emerald-200 bg-linear-to-br from-emerald-100 via-emerald-50 to-teal-100',
    icon: CircleCheck,
    iconClass: 'text-emerald-700',
    teks: 'text-emerald-800',
    judul: 'Aman',
    isi: 'Berdasarkan tanggapan Anda, tidak ada area yang melewati ambang perhatian saat ini. Tetap dampingi si kecil dengan stimulasi dan kedekatan sehari-hari.',
  },
}

export function RiskBanner({ status }) {
  const v = VARIAN[status] ?? VARIAN.aman
  const Icon = v.icon

  return (
    <section aria-label="Tingkat risiko" className={`rounded-3xl border p-6 text-center ${v.box}`}>
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-white shadow-sm">
        <Icon size={32} className={v.iconClass} aria-hidden="true" />
      </span>
      <p className={`mt-4 text-sm font-medium uppercase tracking-[0.2em] ${v.teks}`}>Tingkat Risiko</p>
      <h2 className={`mt-1 text-4xl font-extrabold tracking-tight ${v.teks}`}>{v.judul}</h2>
      <p className={`mx-auto mt-3 max-w-md text-[17px] leading-relaxed ${v.teks}`}>{v.isi}</p>
    </section>
  )
}

export function ContinueCard({ idBayi }) {
  return (
    <section className="rounded-2xl border border-l-4 border-emerald-100 border-l-emerald-600 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
        <Target size={22} className="text-emerald-700" aria-hidden="true" />
        Lanjut ke Misi Parenting
      </h2>
      <p className="mt-2 text-[17px] leading-relaxed text-slate-600">
        Misi harian yang singkat membantu menjaga kestabilan emosi dan sosial anak lewat kegiatan bersama Anda.
      </p>
      <Button as={Link} to={misiPath(idBayi)} pill icon={ArrowRight} className="mt-5 w-full">
        Mulai Misi Parenting
      </Button>
    </section>
  )
}

const TONES = {
  success: { top: 'border-t-emerald-700', label: 'text-emerald-800', nama: 'Kekuatan', icon: CircleCheck, iconClass: 'text-emerald-700' },
  focus: { top: 'border-t-amber-700', label: 'text-amber-800', nama: 'Area Fokus', icon: Brain, iconClass: 'text-amber-700' },
}

export function FindingCard({ tone, judul, isi }) {
  const t = TONES[tone]
  const Icon = t.icon

  return (
    <article className={`rounded-2xl border-t-4 bg-white p-5 shadow-sm ring-1 ring-slate-200/70 ${t.top}`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-bold uppercase tracking-wider ${t.label}`}>{t.nama}</p>
        <Icon size={22} className={t.iconClass} aria-hidden="true" />
      </div>
      <h3 className="mt-2 text-xl font-semibold text-slate-900">{judul}</h3>
      <p className="mt-1 text-[17px] leading-relaxed text-slate-600">{isi}</p>
    </article>
  )
}

export function SupportSteps({ steps }) {
  if (!steps?.length) return null

  return (
    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70" aria-labelledby="langkah-awal">
      <h2 id="langkah-awal" className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-semibold text-slate-900">
        <Lightbulb size={20} className="text-brand-600" aria-hidden="true" />
        Langkah Awal Suportif
      </h2>
      <ol className="mt-5 space-y-6">
        {steps.map((s, i) => (
          <li key={s.judul} className="relative flex gap-4">
            {i < steps.length - 1 && <span aria-hidden="true" className="absolute left-5 top-12 -bottom-6 w-0.5 bg-slate-200" />}
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-600 font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">{s.judul}</h3>
              <p className="mt-1 leading-relaxed text-slate-600">{s.isi}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}