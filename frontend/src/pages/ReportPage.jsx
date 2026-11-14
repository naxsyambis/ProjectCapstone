import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Smile, TrendingUp } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import Meter from '../components/ui/Meter'
import ChildTabs from '../components/children/ChildTabs'
import ReportCard from '../components/report/ReportCard'
import StyleBubble from '../components/report/StyleBubble'
import MissionChecklist from '../components/report/MissionChecklist'
import ChildTimeline from '../components/report/ChildTimeline'
import BadgeRow from '../components/report/BadgeRow'
import { useAuth } from '../hooks/useAuth'
import { useRequest } from '../hooks/useRequest'
import { getReport } from '../api/report'
import { ROUTES } from '../utils/constants'

function ReportBody({ data }) {
  const [aktifId, setAktifId] = useState(null)
  const aktif = data.anak.find((a) => a.id_bayi === aktifId) ?? data.anak[0]

  return (
    <div className="mt-6 space-y-5">
      {data.progres_belajar && (
        <ReportCard title="Progres Belajar" icon={TrendingUp} aside={null}>
          <div className="mt-5 flex items-center justify-between gap-3 text-slate-600">
            <p>Fase Saat Ini: {data.progres_belajar.fase}</p>
            <p className="font-semibold">{data.progres_belajar.persen}%</p>
          </div>
          <div className="mt-3">
            <Meter value={data.progres_belajar.persen} tone="accent" label="Progres jalur belajar" />
          </div>
          <Link to={ROUTES.LEARNING_PATH} className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline">
            Buka Jalur Belajar
          </Link>
        </ReportCard>
      )}

      <ReportCard title="Profil Gaya" icon={Brain} iconClass="text-amber-500">
        <StyleBubble gaya={data.gaya_dominan} />
      </ReportCard>

      <ReportCard
        title="Misi"
        aside={
          data.misi.total > 0 && (
            <span className="text-sm font-semibold text-emerald-700">
              {data.misi.selesai}/{data.misi.total} Selesai
            </span>
          )
        }
      >
        <MissionChecklist items={data.misi.item} tampilkanAnak={data.anak.length > 1} />
      </ReportCard>

      <ReportCard title="Perkembangan Anak" icon={Smile} iconClass="text-emerald-700">
        {data.anak.length === 0 ? (
          <p className="mt-4 leading-relaxed text-slate-500">
            Belum ada data anak.{' '}
            <Link to={ROUTES.CHILD_NEW} className="font-semibold text-brand-600 hover:underline">
              Tambah anak
            </Link>
          </p>
        ) : (
          <>
            <ChildTabs anak={data.anak} activeId={aktif.id_bayi} onSelect={setAktifId} />
            <ChildTimeline key={aktif.id_bayi} anak={aktif} />
          </>
        )}
      </ReportCard>

      <ReportCard title="Lencana Terbaru">
        <BadgeRow lencana={data.lencana} />
      </ReportCard>
    </div>
  )
}

export default function ReportPage() {
  const { hasAssessment } = useAuth()
  const request = useCallback(() => getReport({ hasAssessment }), [hasAssessment])
  const { data, loading, error, retry } = useRequest(request)

  return (
    <PageLayout>
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-600">Laporan Perkembangan</h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        Lacak perjalanan pengasuhan Anda, hasil penilaian, dan tonggak perkembangan anak Anda.
      </p>

      {loading && <Loading text="Memuat laporan..." />}
      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}
      {data && <ReportBody data={data} />}
    </PageLayout>
  )
}