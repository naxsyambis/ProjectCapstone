import { Check, CircleCheck, CircleX, Lightbulb, X } from 'lucide-react'

export default function ReviewItem({ item }) {
  const { nomor, teks, benar, opsi, jawaban_dipilih: dipilih, kunci, penjelasan } = item
  const label = (kode) => opsi.find((o) => o.kode === kode)?.label ?? 'Tidak dijawab'

  return (
    <li className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Pertanyaan {nomor}</p>
        {benar ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <CircleCheck size={16} aria-hidden="true" />
            Benar
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
            <CircleX size={16} aria-hidden="true" />
            Salah
          </span>
        )}
      </div>

      <p className="mt-3 text-lg font-medium leading-snug text-slate-900">{teks}</p>

      <div className="mt-4 space-y-3">
        {benar ? (
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-slate-800">
            <span className="sr-only">Jawaban Anda (benar): </span>
            {label(kunci)}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-slate-600">
              <span className="line-through">
                <span className="sr-only">Jawaban Anda (salah): </span>
                {label(dipilih)}
              </span>
              <X size={20} className="shrink-0 text-red-500" aria-hidden="true" />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-slate-800">
              <span>
                <span className="sr-only">Jawaban yang benar: </span>
                {label(kunci)}
              </span>
              <Check size={20} className="shrink-0 text-emerald-700" aria-hidden="true" />
            </div>
          </>
        )}
      </div>

      {penjelasan && (
        <div className="mt-4 rounded-r-xl border-l-4 border-brand-600 bg-brand-50 px-4 py-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
            <Lightbulb size={16} aria-hidden="true" />
            Insight
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{penjelasan}</p>
        </div>
      )}
    </li>
  )
}