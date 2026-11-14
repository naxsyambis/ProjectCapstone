import { Link } from 'react-router-dom'
import { ClipboardCheck } from 'lucide-react'
import DashCard from './DashCard'
import Button from '../ui/Button'
import { ROUTES } from '../../utils/constants'

function formatSisaHari(hari) {
  if (hari === null || hari === undefined) return null
  if (hari > 0) return `Jatuh tempo dalam ${hari} hari`
  if (hari === 0) return 'Jatuh tempo hari ini'
  return `Terlambat ${Math.abs(hari)} hari`
}

export default function ScreeningCard({ screening }) {
  const belumPernah = screening.status === 'belum_pernah'
  const judul = belumPernah ? 'Laksanakan Screening' : screening.judul ?? 'Pemeriksaan Perkembangan'
  const catatan = belumPernah ? null : formatSisaHari(screening.sisa_hari)

  return (
    <DashCard icon={ClipboardCheck} title="Status Screening">
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-lg text-slate-900">{judul}</p>
          {catatan && <p className="mt-0.5 text-sm font-medium text-slate-600">{catatan}</p>}
        </div>
        <Button as={Link} to={ROUTES.SCREENING} size="sm" className="shrink-0">
          Mulai
        </Button>
      </div>
    </DashCard>
  )
}