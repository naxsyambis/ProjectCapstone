import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Brain, X } from 'lucide-react'
import Button from '../components/ui/Button'
import Meter from '../components/ui/Meter'
import OptionCard from '../components/ui/OptionCard'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import Alert from '../components/feedback/Alert'
import { useAuth } from '../hooks/useAuth'
import { useRequest } from '../hooks/useRequest'
import { getQuiz, submitQuiz } from '../api/quiz'
import { clearDraft, loadDraft, saveDraft } from '../utils/draft'
import { hasilKuisPath, materiPath } from '../utils/paths'

function TopBar({ idMateri }) {
  return (
    <header className="mx-auto grid h-16 w-full max-w-2xl grid-cols-[3rem_1fr_3rem] items-center px-3">
      <Link
        to={materiPath(idMateri)}
        aria-label="Keluar dari kuis"
        className="flex size-11 items-center justify-center rounded-full text-slate-900 hover:bg-white"
      >
        <X size={24} />
      </Link>
      <p className="text-center text-sm tracking-[0.2em] text-slate-600">QUIZ</p>
    </header>
  )
}

function QuizForm({ idMateri, kuis }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { pertanyaan } = kuis
  const total = pertanyaan.length
  const draftKey = `quiz_draft_${user.id_user}_${idMateri}`

  const [answers, setAnswers] = useState(() => loadDraft(draftKey))
  const [index, setIndex] = useState(() => {
    const saved = loadDraft(draftKey)
    const first = pertanyaan.findIndex((q) => saved[q.id_pertanyaan_quiz] === undefined)
    return first === -1 ? total - 1 : first // lanjut dari soal pertama yang belum dijawab
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const soal = pertanyaan[index]
  const dipilih = answers[soal.id_pertanyaan_quiz]
  const isLast = index === total - 1

  const choose = (kode) => {
    const next = { ...answers, [soal.id_pertanyaan_quiz]: kode }
    setAnswers(next)
    saveDraft(draftKey, next)
  }

  const goTo = (target) => {
    setIndex(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!dipilih || submitting) return
    if (!isLast) {
      goTo(index + 1)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await submitQuiz(
        idMateri,
        pertanyaan.map((q) => ({ id_pertanyaan_quiz: q.id_pertanyaan_quiz, jawaban: answers[q.id_pertanyaan_quiz] })),
      )
      clearDraft(draftKey)
      navigate(hasilKuisPath(idMateri), { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal mengirim jawaban. Silakan coba lagi.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex min-h-dvh flex-col bg-surface">
      <TopBar idMateri={idMateri} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-8">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-slate-600">
            Pertanyaan {index + 1} dari {total}
          </span>
          <span className="text-emerald-700">{Math.round(((index + 1) / total) * 100)}%</span>
        </div>
        <div className="mt-2">
          <Meter value={index + 1} max={total} tone="accent" label={`Pertanyaan ${index + 1} dari ${total}`} />
        </div>

        <section className="mt-6 rounded-3xl bg-white px-6 py-8 text-center shadow-sm">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-100 text-brand-600">
            <Brain size={30} aria-hidden="true" />
          </span>
          <h1 id="soal" className="mt-5 text-2xl font-bold leading-snug text-slate-900">
            {soal.teks}
          </h1>
          <p className="mt-3 text-slate-500">Pilih satu jawaban yang paling tepat.</p>
        </section>

        {error && (
          <div className="mt-4">
            <Alert>{error}</Alert>
          </div>
        )}

        <div role="radiogroup" aria-labelledby="soal" className="mt-6 space-y-4">
          {soal.opsi.map((o) => (
            <OptionCard
              key={o.kode}
              name={`kuis-${soal.id_pertanyaan_quiz}`}
              value={o.kode}
              checked={dipilih === o.kode}
              onChange={choose}
            >
              {o.label}
            </OptionCard>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl gap-3 px-4 py-3">
          {index > 0 && (
            <Button variant="secondary" onClick={() => goTo(index - 1)} disabled={submitting}>
              <ArrowLeft size={18} aria-hidden="true" />
              Sebelumnya
            </Button>
          )}
          <Button type="submit" loading={submitting} disabled={!dipilih} icon={ArrowRight} className="flex-1">
            {isLast ? 'Kirim Jawaban' : 'Selanjutnya'}
          </Button>
        </div>
      </footer>
    </form>
  )
}

function QuizView({ idMateri }) {
  const request = useCallback(() => getQuiz(idMateri), [idMateri])
  const { data, loading, error, retry } = useRequest(request)

  if (data?.pertanyaan.length > 0) return <QuizForm idMateri={idMateri} kuis={data} />

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <TopBar idMateri={idMateri} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4">
        {loading && <Loading text="Memuat kuis..." />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && <p className="py-12 text-center text-slate-500">Belum ada soal untuk kuis ini.</p>}
      </main>
    </div>
  )
}

export default function QuizPage() {
  const { idMateri } = useParams()
  return <QuizView key={idMateri} idMateri={idMateri} />
}