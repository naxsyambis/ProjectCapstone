import { Link, Navigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ParentingStyleCard from '../components/dashboard/ParentingStyleCard'
import LearningProgressCard from '../components/dashboard/LearningProgressCard'
import ScreeningCard from '../components/dashboard/ScreeningCard'
import WeeklyMissionCard from '../components/dashboard/WeeklyMissionCard'
import UpcomingMissions from '../components/dashboard/UpcomingMissions'
import RecentActivity from '../components/dashboard/RecentActivity'
import { useAuth } from '../hooks/useAuth'
import { useDashboard } from '../hooks/useDashboard'
import { ROUTES } from '../utils/constants'

// Kartu ringkasan: dipakai kedua tampilan. Progres Belajar hanya muncul kalau datanya ada.
function SummaryGrid({ data }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <ParentingStyleCard gaya={data.gaya_dominan} />
      {data.progres_belajar && <LearningProgressCard progres={data.progres_belajar} />}
      <ScreeningCard screening={data.screening} />
      <WeeklyMissionCard misi={data.misi_mingguan} />
    </div>
  )
}

// Tampilan 1: belum pernah assessment
function NewUserDashboard({ data }) {
  return (
    <>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-slate-700">
          Langkah pertama Anda dimulai dari Assessment Parenting.
        </p>
        <Button as={Link} to={ROUTES.ASSESSMENT} pill icon={ArrowRight} className="mt-5 w-full sm:w-auto sm:px-10">
          Mulai Assessment
        </Button>
      </div>
      <SummaryGrid data={data} />
    </>
  )
}

// Tampilan 2: sudah assessment
function ActiveUserDashboard({ data }) {
  return (
    <>
      <SummaryGrid data={data} />
      <Button as={Link} to={ROUTES.LEARNING_PATH} pill icon={ArrowRight} className="mt-6 w-full">
        Lanjutkan Belajar
      </Button>
      <UpcomingMissions items={data.misi_mendatang} />
      <RecentActivity items={data.aktivitas_terbaru} />
    </>
  )
}

function DashboardContent({ user, hasAssessment }) {
  const { data, loading, error, retry } = useDashboard()
  const nama = user.nama_panggilan || (user.nama_lengkap ?? '').split(' ')[0]

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Selamat datang {nama}!
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        {hasAssessment
          ? 'Berikut adalah ringkasan perjalanan pengasuhan Anda hari ini.'
          : 'Terima kasih telah bergabung bersama ParentPath. Mulailah perjalanan parenting yang lebih terarah dengan memahami pola asuh Anda dan perkembangan sosial-emosional anak.'}
      </p>

      {loading && <Loading text="Memuat dasbor..." />}
      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}
      {data && (hasAssessment ? <ActiveUserDashboard data={data} /> : <NewUserDashboard data={data} />)}
    </>
  )
}

export default function DashboardPage() {
  const { user, hasAssessment } = useAuth()

  if (!user) return null
  if (!user.profil_lengkap) return <Navigate to={ROUTES.ONBOARDING} replace />

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8">
        <DashboardContent user={user} hasAssessment={hasAssessment} />
      </main>
      <Footer tagline="Kejelasan yang Mendukung untuk Setiap Orang Tua." />
    </div>
  )
}