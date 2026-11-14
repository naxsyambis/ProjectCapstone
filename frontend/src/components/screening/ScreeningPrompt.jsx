import { Link } from 'react-router-dom'
import { ArrowRight, HeartPulse } from 'lucide-react'
import { useRequest } from '../../hooks/useRequest'
import { getChildren } from '../../api/children'
import { dalamRentang } from '../../utils/screening'
import { screeningPath } from '../../utils/paths'
import { ROUTES } from '../../utils/constants'

// Mengajak, bukan mengunci: tampil selama ada anak (usia sesuai) yang belum di-screening atau sudah jatuh tempo
export default function ScreeningPrompt() {
  const { data } = useRequest(getChildren)

  const perlu = (data ?? []).filter((a) => dalamRentang(a.usia_bulan) && a.screening.status !== 'selesai')
  if (perlu.length === 0) return null

  const tujuan = perlu.length === 1 ? screeningPath(perlu[0].id_bayi) : ROUTES.SCREENING
  const nama = perlu.map((a) => a.nama).join(' dan ')

  return (
    <section
      aria-label="Saran screening"
      className="mt-6 flex items-center gap-4 rounded-2xl border border-brand-600/20 bg-brand-50 p-4"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
        <HeartPulse size={22} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">Pantau juga si kecil</p>
        <p className="text-sm text-slate-600">Screening sosial-emosional untuk {nama} belum dilakukan.</p>
      </div>
      <Link
        to={tujuan}
        aria-label="Mulai screening"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
      >
        <ArrowRight size={20} />
      </Link>
    </section>
  )
}