import { Link } from 'react-router-dom'
import { BookOpen, Sparkles, Clock, ArrowRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import { useRequest } from '../hooks/useRequest'
import { getLearningPath } from '../api/learning'
import { materiPath } from '../utils/paths'
import { ROUTES } from '../utils/constants'

export default function MateriListPage() {
  const { data, loading, error, retry } = useRequest(getLearningPath)

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-600">
            <BookOpen size={24} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Materi Pembelajaran</h1>
            <p className="mt-1 text-slate-600">Pelajari modul edukasi pola asuh & perkembangan anak.</p>
          </div>
        </div>

        {loading && <Loading text="Memuat daftar materi..." />}

        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {data?.minggu && (
          <div className="mt-8 space-y-4">
            {data.minggu.map((materi) => {
              const isLocked = materi.status === 'terkunci'
              return (
                <div
                  key={materi.id_materi}
                  className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 transition sm:flex-row sm:items-center ${
                    isLocked
                      ? 'border-slate-200 bg-slate-50/70 opacity-60'
                      : 'border-slate-200 bg-white shadow-sm hover:border-brand-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                      Modul {materi.urutan}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900">{materi.judul}</h2>
                    {materi.subjudul && (
                      <p className="text-sm text-slate-600 line-clamp-2">{materi.subjudul}</p>
                    )}
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    {isLocked ? (
                      <span className="text-xs font-medium text-slate-400">Terkunci</span>
                    ) : (
                      <Button as={Link} to={materiPath(materi.id_materi)} icon={ArrowRight} size="sm">
                        Buka Materi
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {data?.minggu?.length === 0 && !loading && (
          <p className="mt-8 text-center text-slate-500">Belum ada materi pembelajaran yang tersedia.</p>
        )}
      </main>

      <Footer tagline="Dukungan yang Jelas untuk Setiap Orang Tua." />
    </div>
  )
}

