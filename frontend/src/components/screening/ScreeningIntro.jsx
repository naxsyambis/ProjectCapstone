import { Link } from 'react-router-dom'
import { ClipboardCheck } from 'lucide-react'
import Button from '../ui/Button'
import { formatUsia } from '../../utils/age'
import { hitungEstimasiMenit } from '../../utils/assessment'
import { ROUTES } from '../../utils/constants'

export default function ScreeningIntro({ nama, usiaBulan, total, onStart }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-600">
        <ClipboardCheck size={28} aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-2xl font-bold text-slate-900">Screening untuk {nama}</h2>
      <p className="mt-1 text-slate-500">
        {formatUsia(usiaBulan)} • {total} butir • sekitar {hitungEstimasiMenit(total)} menit
      </p>

      <ul className="mt-5 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-slate-700">
        <li>Jawab sesuai yang paling sering Anda amati pada anak.</li>
        <li>Tidak ada jawaban benar atau salah.</li>
        <li>Hasilnya bukan diagnosis. Hasil ini membantu menentukan langkah berikutnya.</li>
      </ul>

      <Button onClick={onStart} className="mt-7 w-full">
        Mulai
      </Button>
      <Link to={ROUTES.SCREENING} className="mt-4 block text-center text-sm font-semibold text-brand-600 hover:underline">
        Pilih anak lain
      </Link>
    </section>
  )
}