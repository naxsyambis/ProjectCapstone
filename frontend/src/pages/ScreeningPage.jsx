import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ChildScreeningCard from '../components/screening/ChildScreeningCard'
import { useRequest } from '../hooks/useRequest'
import { getChildren } from '../api/children'
import { ROUTES } from '../utils/constants'

export default function ScreeningPage() {
  const { data, loading, error, retry } = useRequest(getChildren)

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">Screening Sosial-Emosional</h1>
        <p className="mt-3 text-lg text-slate-600">
          Kuesioner singkat untuk memantau perkembangan sosial-emosional si kecil. Satu kuesioner untuk satu anak.
        </p>

        {loading && <Loading text="Memuat data anak..." />}
        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {data && data.length === 0 && (
          <p className="mt-8 rounded-2xl bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200/70">
            Belum ada data anak. Tambahkan anak terlebih dahulu untuk memulai screening.
          </p>
        )}

        {data?.length > 0 && (
          <ul className="mt-6 space-y-4">
            {data.map((anak) => (
              <ChildScreeningCard key={anak.id_bayi} anak={anak} />
            ))}
          </ul>
        )}

        {data && (
          <Link
            to={ROUTES.CHILDREN}
            className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
          >
            <Plus size={16} aria-hidden="true" />
            Tambah data anak
          </Link>
        )}

        <p className="mt-8 text-xs leading-relaxed text-slate-400">
          Screening ini bukan alat diagnosis dan tidak menggantikan pemeriksaan oleh psikolog atau dokter.
        </p>
      </main>

      <Footer tagline="Supportive Clarity for Every Parent." />
    </div>
  )
}