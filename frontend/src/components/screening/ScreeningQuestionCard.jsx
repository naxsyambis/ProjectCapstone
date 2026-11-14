import { Brain } from 'lucide-react'
import OptionCard from '../ui/OptionCard'

export default function ScreeningQuestionCard({ butir, skala, value, onChange }) {
  const teksId = `soal-${butir.id_pertanyaan_screening}`

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-accent/30 blur-2xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-10 size-40 rounded-full bg-brand-100 blur-2xl" />

      <div className="relative">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-600">
          <Brain size={22} aria-hidden="true" />
          {butir.subscale_label}
        </p>

        <h2 id={teksId} className="mt-4 text-center text-2xl font-bold leading-snug text-slate-900">
          {butir.teks}
        </h2>

        <div role="radiogroup" aria-labelledby={teksId} className="mt-7 space-y-3">
          {skala.map((s) => (
            <OptionCard
              key={s.nilai}
              name={`screening-${butir.id_pertanyaan_screening}`}
              value={s.nilai}
              checked={value === s.nilai}
              onChange={onChange}
            >
              {s.label}
            </OptionCard>
          ))}
        </div>
      </div>
    </section>
  )
}