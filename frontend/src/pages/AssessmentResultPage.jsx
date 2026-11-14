import { Navigate } from 'react-router-dom'
import { ThumbsUp, TrendingUp } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import StyleHero from '../components/assessment/StyleHero'
import StyleBreakdown from '../components/assessment/StyleBreakdown'
import InsightCard from '../components/assessment/InsightCard'
import NextStepCard from '../components/assessment/NextStepCard'
import { useRequest } from '../hooks/useRequest'
import { getLatestResult } from '../api/assessment'
import { ROUTES } from '../utils/constants'

export default function AssessmentResultPage() {
  const { data, loading, error, retry } = useRequest(getLatestResult)

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        {loading && <Loading text="Memuat hasil..." />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && !data && <Navigate to={ROUTES.ASSESSMENT} replace />}

        {data && (
          <>
            <header className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-brand-600">Asesmen Selesai</h1>
              <p className="mt-2 text-[17px] text-slate-600">
                Berikut adalah profil gaya pengasuhan Anda berdasarkan tanggapan Anda.
              </p>
            </header>

            <div className="mt-6">
              <StyleHero gaya={data.gaya_dominan} />
            </div>

            <StyleBreakdown rincian={data.rincian} dominan={data.gaya_dominan} />

            <section className="mt-8 space-y-4" aria-labelledby="wawasan">
              <h2 id="wawasan" className="text-lg font-semibold text-slate-900">
                Wawasan
              </h2>
              <InsightCard icon={ThumbsUp} title="Kekuatan" items={data.wawasan?.kekuatan} tone="success" />
              <InsightCard icon={TrendingUp} title="Area Fokus" items={data.wawasan?.area_fokus} tone="focus" />
            </section>

            <NextStepCard />
          </>
        )}
      </main>

      <Footer tagline="Kejelasan yang Mendukung untuk Setiap Orang Tua." />
    </div>
  )
}