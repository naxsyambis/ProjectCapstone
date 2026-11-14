import { Link } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { formatUsia } from '../../utils/age'
import { formatTanggal } from '../../utils/format'
import { dalamRentang, RENTANG_USIA } from '../../utils/screening'
import { hasilScreeningPath, screeningPath } from '../../utils/paths'

function StatusChip({ berisiko }) {
  return berisiko ? (
    <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">Perlu perhatian</span>
  ) : (
    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Aman</span>
  )
}

export default function ChildScreeningCard({ anak }) {
  const { id_bayi: id, nama, usia_bulan: usia, screening } = anak
  const pernah = screening.status !== 'belum_pernah'

  return (
    <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-center gap-4">
        <Avatar name={nama} size={48} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-900">{nama}</h2>
          <p className="text-sm text-slate-500">{formatUsia(usia)}</p>
        </div>
        {pernah && <StatusChip berisiko={screening.status_risiko === 'at_risk'} />}
      </div>

      {!dalamRentang(usia) ? (
        <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
          Di luar rentang usia screening ({RENTANG_USIA.min}-{RENTANG_USIA.maks} bulan).
        </p>
      ) : !pernah ? (
        <Button as={Link} to={screeningPath(id)} className="mt-4 w-full">
          Mulai Screening
        </Button>
      ) : (
        <>
          <p className="mt-4 text-sm text-slate-600">
            Terakhir: {formatTanggal(screening.terakhir)}
            {screening.jadwal_berikutnya && ` • disarankan ulang ${formatTanggal(screening.jadwal_berikutnya)}`}
          </p>
          {screening.status === 'jatuh_tempo' && (
            <p className="mt-2 rounded-xl bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
              Sudah waktunya screening ulang.
            </p>
          )}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button as={Link} to={hasilScreeningPath(id)} size="sm">
              Lihat Hasil
            </Button>
            <Button as={Link} to={screeningPath(id)} variant="secondary" size="sm">
              Ulangi
            </Button>
          </div>
        </>
      )}
    </li>
  )
}