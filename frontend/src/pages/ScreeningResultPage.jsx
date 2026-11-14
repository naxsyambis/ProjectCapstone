import { useCallback } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CalendarDays, Printer } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ReferralCard from '../components/screening/ReferralCard'
import { ContinueCard, FindingCard, RiskBanner, SupportSteps } from '../components/screening/ResultSections'
import { useRequest } from '../hooks/useRequest'
import { getScreeningResult } from '../api/screening'
import { formatUsia } from '../utils/age'
import { formatTanggal } from '../utils/format'
import { screeningPath } from '../utils/paths'
import { ROUTES } from '../utils/constants'

function ResultView({ idBayi }) {
  const request = useCallback(() => getScreeningResult(idBayi), [idBayi])
  const { data, loading, error, retry } = useRequest(request)

  const berisiko = data?.status_risiko === 'at_risk'
  const adaWawasan = data && (data.wawasan?.kekuatan?.length > 0 || data.wawasan?.area_fokus?.length > 0)

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        {loading && <Loading text="Memuat hasil..." />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && !data && <Navigate to={screeningPath(idBayi)} replace />}

        {data && (
          <>
            <header className="text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-slate-600">
                <CalendarDays size={16} aria-hidden="true" />
                {formatTanggal(data.tanggal_screening)}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Hasil Screening</h1>
              <p className="mt-3 text-lg leading-relaxed text-slate-600">
                Tinjauan penilaian sosial-emosional {data.bayi.nama} ({formatUsia(data.bayi.usia_bulan)}).
              </p>
            </header>

            <div className="mt-6">
              <RiskBanner status={data.status_risiko} />
            </div>

            <div className="mt-5">{berisiko ? <ReferralCard /> : <ContinueCard idBayi={idBayi} />}</div>

            {adaWawasan && (
              <section className="mt-8" aria-labelledby="wawasan-utama">
                <h2 id="wawasan-utama" className="text-lg font-semibold text-slate-900">
                  Wawasan Utama
                </h2>
                <div className="mt-3 space-y-4">
                  {data.wawasan.kekuatan?.map((w) => (
                    <FindingCard key={w.judul} tone="success" judul={w.judul} isi={w.isi} />
                  ))}
                  {data.wawasan.area_fokus?.map((w) => (
                    <FindingCard key={w.judul} tone="focus" judul={w.judul} isi={w.isi} />
                  ))}
                </div>
              </section>
            )}

            <SupportSteps steps={data.langkah_awal} />

            {data.jadwal_screening_berikutnya && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Screening berikutnya disarankan sekitar {formatTanggal(data.jadwal_screening_berikutnya)}.
              </p>
            )}

            <Button variant="secondary" onClick={() => window.print()} className="mt-6 w-full print:hidden">
              <Printer size={18} aria-hidden="true" />
              Simpan sebagai PDF
            </Button>

            <p className="mt-6 text-xs leading-relaxed text-slate-400">
              Instrumen: {data.instrumen}. Hasil screening bukan diagnosis dan tidak menggantikan pemeriksaan oleh
              psikolog atau dokter.
            </p>

            <Link
              to={ROUTES.SCREENING}
              className="mt-4 block text-center text-sm font-semibold text-brand-600 hover:underline print:hidden"
            >
              Kembali ke daftar anak
            </Link>
          </>
        )}
      </main>

      <div className="print:hidden">
        <Footer tagline="Kejelasan yang Mendukung untuk Setiap Orang Tua." />
      </div>
    </div>
  )
}

export default function ScreeningResultPage() {
  const { idBayi } = useParams()
  return <ResultView key={idBayi} idBayi={idBayi} />
}