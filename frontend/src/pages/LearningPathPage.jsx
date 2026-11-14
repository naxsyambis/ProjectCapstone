import { Link } from 'react-router-dom'
import { ClipboardList, Sparkles } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Meter from '../components/ui/Meter'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import WeekCard from '../components/learning/WeekCard'
import { useAuth } from '../hooks/useAuth'
import { useRequest } from '../hooks/useRequest'
import { getLearningPath } from '../api/learning'
import { ROUTES } from '../utils/constants'
import ScreeningPrompt from '../components/screening/ScreeningPrompt'

function NeedAssessment() {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-600">
        <ClipboardList size={28} aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-slate-900">Jalur belajar Anda belum tersedia</h2>
      <p className="mt-2 text-slate-600">
        Jalur belajar disusun dari hasil assessment pola asuh. Selesaikan assessment untuk mendapatkannya.
      </p>
      <Button as={Link} to={ROUTES.ASSESSMENT} className="mt-5 w-full sm:w-auto sm:px-10">
        Mulai Assessment
      </Button>
    </section>
  )
}

export default function LearningPathPage() {
  const { hasAssessment } = useAuth()
  const { data, loading, error, retry } = useRequest(getLearningPath)

  const punyaJalur = hasAssessment && data?.jalur

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Jalur Belajar</h1>
        <p className="mt-3 text-lg text-slate-600">Kuasai keterampilan parenting inti langkah demi langkah.<ScreeningPrompt />
</p>

        {loading && <Loading text="Memuat jalur belajar..." />}
        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}
        {!loading && !error && !punyaJalur && <NeedAssessment />}

        {punyaJalur && (
          <>
            <section className="mt-6 rounded-2xl bg-slate-100/80 p-5" aria-label="Progres keseluruhan">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-600">
                <Sparkles size={16} aria-hidden="true" />
                {data.jalur.judul}
              </p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-800">Progres Keseluruhan</p>
                <p className="text-2xl font-bold text-brand-600">{data.progres.persen}%</p>
              </div>
              <div className="mt-3">
                <Meter value={data.progres.persen} label="Progres keseluruhan" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {data.progres.selesai} dari {data.progres.total} minggu selesai
              </p>
            </section>

            <ol className="mt-8 space-y-5">
              {data.minggu.map((item, i) => (
                <WeekCard key={item.id_materi} item={item} terakhir={i === data.minggu.length - 1} />
              ))}
            </ol>
          </>
        )}
      </main>

      <Footer tagline="Dukungan yang Jelas untuk Setiap Orang Tua." />
    </div>
  )
}