import { useCallback } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import Button from '../components/ui/Button'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ScoreRing from '../components/quiz/ScoreRing'
import ReviewItem from '../components/quiz/ReviewItem'
import { useAuth } from '../hooks/useAuth'
import { useRequest } from '../hooks/useRequest'
import { getQuizResult } from '../api/quiz'
import { kuisPath } from '../utils/paths'
import { namaSapaan } from '../utils/user'
import { ROUTES } from '../utils/constants'

function ResultView({ idMateri }) {
  const { user } = useAuth()
  const request = useCallback(() => getQuizResult(idMateri), [idMateri])
  const { data, loading, error, retry } = useRequest(request)

  const nama = namaSapaan(user)
  const sapaan = nama ? `, ${nama}` : ''

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header className="mx-auto grid h-16 w-full max-w-2xl grid-cols-[3rem_1fr_3rem] items-center px-3">
        <Link
          to={ROUTES.LEARNING_PATH}
          aria-label="Tutup hasil kuis"
          className="flex size-11 items-center justify-center rounded-full bg-slate-200/70 text-slate-900 hover:bg-slate-200"
        >
          <X size={22} />
        </Link>
        <h1 className="text-center text-slate-800">Hasil Kuis</h1>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-8">
        {loading && <Loading text="Memuat hasil..." />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && !data && <Navigate to={kuisPath(idMateri)} replace />}

        {data && (
          <>
            <section className="flex flex-col items-center pt-4 text-center">
              <ScoreRing nilai={data.skor} lulus={data.lulus} />
              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                {data.lulus ? `Usaha yang bagus${sapaan}!` : `Hampir berhasil${sapaan}!`}
              </h2>
              <p className="mt-2 max-w-sm leading-relaxed text-slate-600">
                {data.lulus
                  ? 'Anda menunjukkan pemahaman yang kuat tentang materi ini. Tinjau wawasan di bawah ini untuk memperkuat pengetahuan Anda.'
                  : `Skor minimal untuk lulus adalah ${data.min_skor_lulus}%. Pelajari kembali materinya, lalu coba lagi.`}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Benar {data.benar} dari {data.total} soal.
              </p>
            </section>

            <section className="mt-8" aria-labelledby="tinjau">
              <h2 id="tinjau" className="text-lg font-semibold text-slate-900">
                Tinjau Jawaban
              </h2>
              <ol className="mt-3 space-y-4">
                {data.tinjauan.map((item) => (
                  <ReviewItem key={item.id_pertanyaan_quiz} item={item} />
                ))}
              </ol>
            </section>
          </>
        )}
      </main>

      {data && (
        <footer className="sticky bottom-0 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
          <div className="mx-auto flex w-full max-w-2xl gap-3 px-4 py-3">
            {data.lulus ? (
              <Button as={Link} to={ROUTES.LEARNING_PATH} className="w-full">
                Lanjutkan Jalur
              </Button>
            ) : (
              <>
                <Button as={Link} to={ROUTES.LEARNING_PATH} variant="secondary" className="flex-1">
                  Kembali ke Jalur
                </Button>
                <Button as={Link} to={kuisPath(idMateri)} className="flex-1">
                  Ulangi Kuis
                </Button>
              </>
            )}
          </div>
        </footer>
      )}
    </div>
  )
}

export default function QuizResultPage() {
  const { idMateri } = useParams()
  return <ResultView key={idMateri} idMateri={idMateri} />
}