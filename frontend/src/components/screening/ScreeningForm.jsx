import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Button from '../ui/Button'
import Meter from '../ui/Meter'
import Alert from '../feedback/Alert'
import ScreeningIntro from './ScreeningIntro'
import ScreeningQuestionCard from './ScreeningQuestionCard'
import { useAuth } from '../../hooks/useAuth'
import { submitScreening } from '../../api/screening'
import { clearDraft, loadDraft, saveDraft } from '../../utils/draft'
import { formatUsia } from '../../utils/age'
import { hasilScreeningPath } from '../../utils/paths'

export default function ScreeningForm({ idBayi, data }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { bayi, usia_bulan: usiaBulan, skala, pertanyaan } = data
  const total = pertanyaan.length
  const draftKey = `screening_draft_${user.id_user}_${idBayi}`

  const [answers, setAnswers] = useState(() => loadDraft(draftKey))
  const [started, setStarted] = useState(() => Object.keys(loadDraft(draftKey)).length > 0)
  const [index, setIndex] = useState(() => {
    const saved = loadDraft(draftKey)
    const first = pertanyaan.findIndex((q) => saved[q.id_pertanyaan_screening] === undefined)
    return first === -1 ? total - 1 : first // lanjut dari butir pertama yang belum dijawab
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const butir = pertanyaan[index]
  const selected = answers[butir.id_pertanyaan_screening] // bisa bernilai 0, jadi selalu bandingkan dengan undefined
  const isLast = index === total - 1
  const terjawab = pertanyaan.filter((q) => answers[q.id_pertanyaan_screening] !== undefined).length

  const choose = (nilai) => {
    const next = { ...answers, [butir.id_pertanyaan_screening]: nilai }
    setAnswers(next)
    saveDraft(draftKey, next)
  }

  const goTo = (target) => {
    setIndex(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selected === undefined || submitting) return
    if (!isLast) {
      goTo(index + 1)
      return
    }

    const kosong = pertanyaan.findIndex((q) => answers[q.id_pertanyaan_screening] === undefined)
    if (kosong !== -1) {
      goTo(kosong)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await submitScreening(
        idBayi,
        pertanyaan.map((q) => ({
          id_pertanyaan_screening: q.id_pertanyaan_screening,
          skor_item: answers[q.id_pertanyaan_screening],
        })),
      )
      clearDraft(draftKey)
      navigate(hasilScreeningPath(idBayi), { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal mengirim jawaban. Silakan coba lagi.')
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">Screening Sosial-Emosional</h1>
        <p className="mt-2 text-slate-500">
          {bayi.nama} • {formatUsia(usiaBulan)}
        </p>

        {!started ? (
          <div className="mt-6">
            <ScreeningIntro nama={bayi.nama} usiaBulan={usiaBulan} total={total} onStart={() => setStarted(true)} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6">
            <div className="flex items-center justify-between text-slate-600">
              <span>
                Pertanyaan {index + 1} dari {total}
              </span>
              <span className="text-sm font-semibold text-emerald-700">{Math.round((terjawab / total) * 100)}%</span>
            </div>
            <div className="mt-3">
              <Meter value={terjawab} max={total} tone="accent" label={`${terjawab} dari ${total} butir terjawab`} />
            </div>

            <div className="mt-6">
              <ScreeningQuestionCard
                key={butir.id_pertanyaan_screening}
                butir={butir}
                skala={skala}
                value={selected}
                onChange={choose}
              />
            </div>

            {error && (
              <div className="mt-4">
                <Alert>{error}</Alert>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {index > 0 && (
                <Button variant="secondary" onClick={() => goTo(index - 1)} disabled={submitting}>
                  <ArrowLeft size={18} aria-hidden="true" />
                  Sebelumnya
                </Button>
              )}
              <Button
                type="submit"
                loading={submitting}
                disabled={selected === undefined}
                icon={isLast ? Check : ArrowRight}
                className="flex-1 sm:flex-none sm:px-10"
              >
                {isLast ? 'Lihat Hasil' : 'Selanjutnya'}
              </Button>
            </div>
          </form>
        )}
      </main>

      <Footer tagline="Supportive Clarity for Every Parent." />
    </div>
  )
}