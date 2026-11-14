import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Bookmark, Check, ChevronLeft, Clock, Lightbulb } from 'lucide-react'
import AssessmentHeader from './AssessmentHeader'
import GroupTabs from './GroupTabs'
import LikertItem from './LikertItem'
import ReflectionNote from './ReflectionNote'
import Meter from '../ui/Meter'
import Button from '../ui/Button'
import Alert from '../feedback/Alert'
import { useAuth } from '../../hooks/useAuth'
import { submitAssessment } from '../../api/assessment'
import { loadDraft, saveDraft, clearDraft } from '../../utils/draft'
import { BUTIR_PER_HALAMAN, formatRentang, hitungEstimasiMenit, susunKelompok } from '../../utils/assessment'
import { ROUTES } from '../../utils/constants'

// Dipasang setelah soal selesai dimuat, jadi nilai awalnya bisa dihitung dari soal
export default function AssessmentForm({ pertanyaan, skala }) {
  const { user, markAssessmentDone } = useAuth()
  const navigate = useNavigate()

  const total = pertanyaan.length
  const jumlahHalaman = Math.ceil(total / BUTIR_PER_HALAMAN)
  const draftKey = `assessment_draft_${user.id_user}`
  const kelompok = susunKelompok(pertanyaan)

  const [answers, setAnswers] = useState(() => loadDraft(draftKey))
  const [page, setPage] = useState(() => {
    const saved = loadDraft(draftKey)
    const first = pertanyaan.findIndex((q) => saved[q.id_pertanyaan] === undefined)
    return Math.floor((first === -1 ? total - 1 : first) / BUTIR_PER_HALAMAN) // lanjut dari butir pertama yang kosong
  })
  const [showMissing, setShowMissing] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const mulai = page * BUTIR_PER_HALAMAN
  const butirHalaman = pertanyaan.slice(mulai, mulai + BUTIR_PER_HALAMAN)
  const akhir = mulai + butirHalaman.length
  const adaBerikut = page < jumlahHalaman - 1

  const terjawab = pertanyaan.filter((q) => answers[q.id_pertanyaan] !== undefined).length
  const kelompokAktif = butirHalaman[0].kelompok || 'Umum'
  const kelompokSelesai = Object.fromEntries(
    kelompok.map((g) => [g.nama, g.ids.every((id) => answers[id] !== undefined)]),
  )

  const choose = (id, nilai) => {
    const next = { ...answers, [id]: nilai }
    setAnswers(next)
    saveDraft(draftKey, next)
    setSaved(false)
  }

  const goToPage = (target) => {
    setPage(target)
    setShowMissing(false)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = () => {
    saveDraft(draftKey, answers)
    setSaved(true)
  }

  const handleNext = async () => {
    // 1. Semua butir di halaman ini harus terjawab
    const kosong = butirHalaman.find((q) => answers[q.id_pertanyaan] === undefined)
    if (kosong) {
      setShowMissing(true)
      setError('')
      document.getElementById(`butir-${kosong.id_pertanyaan}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // 2. Masih ada halaman berikutnya
    if (adaBerikut) {
      goToPage(page + 1)
      return
    }

    // 3. Halaman terakhir: pastikan tidak ada butir terlewat di halaman lain (mis. lewat tab)
    const indeksKosong = pertanyaan.findIndex((q) => answers[q.id_pertanyaan] === undefined)
    if (indeksKosong !== -1) {
      goToPage(Math.floor(indeksKosong / BUTIR_PER_HALAMAN))
      setShowMissing(true)
      setError('Masih ada butir yang belum dijawab. Lengkapi dulu sebelum menyelesaikan.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await submitAssessment(
        pertanyaan.map((q) => ({ id_pertanyaan: q.id_pertanyaan, skor_item: answers[q.id_pertanyaan] })),
      )
      clearDraft(draftKey)
      markAssessmentDone()
      navigate(ROUTES.ASSESSMENT_RESULT, { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal mengirim jawaban. Silakan coba lagi.')
      setSubmitting(false)
    }
  }

  const labelNext = adaBerikut
    ? `Lanjut ke Butir ${formatRentang(akhir + 1, Math.min(akhir + BUTIR_PER_HALAMAN, total))}`
    : 'Selesai & lihat hasil'

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto w-full max-w-2xl">
          <AssessmentHeader user={user} helpOpen={helpOpen} onToggleHelp={() => setHelpOpen((v) => !v)} />

          <div className="px-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
                <Clock size={16} aria-hidden="true" />
                Estimasi: {hitungEstimasiMenit(total)} menit
              </span>
              <p className="text-sm text-slate-500">
                Pertanyaan{' '}
                <span className="font-semibold text-brand-600">{formatRentang(mulai + 1, akhir)}</span> / {total}
              </p>
            </div>

            {kelompok.length > 1 && (
              <div className="mt-3">
                <GroupTabs
                  groups={kelompok}
                  activeName={kelompokAktif}
                  completed={kelompokSelesai}
                  onSelect={(g) => goToPage(Math.floor(g.mulai / BUTIR_PER_HALAMAN))}
                />
              </div>
            )}

            <div className="mt-2">
              <Meter value={terjawab} max={total} size="sm" label={`${terjawab} dari ${total} butir terjawab`} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 space-y-4 px-4 py-5">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-slate-700">
          <span className="flex items-center gap-2">
            <Lightbulb size={18} className="shrink-0 text-amber-600" aria-hidden="true" />
            Jawab spontan berdasarkan kebiasaan Anda
          </span>
          <span className="shrink-0 rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
            Skala 1 - 5
          </span>
        </div>

        {helpOpen && (
          <section aria-label="Arti skala" className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/70">
            <p>Pilih angka yang paling menggambarkan seberapa sering Anda melakukan hal tersebut.</p>
            <ul className="mt-3 space-y-1.5">
              {skala.map((s) => (
                <li key={s.nilai} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-md bg-brand-100 text-xs font-semibold text-brand-600">
                    {s.nilai}
                  </span>
                  {s.label}
                </li>
              ))}
            </ul>
          </section>
        )}

        {error && <Alert>{error}</Alert>}

        {butirHalaman.map((q, i) => (
          <LikertItem
            key={q.id_pertanyaan}
            butir={q}
            nomor={mulai + i + 1}
            skala={skala}
            value={answers[q.id_pertanyaan]}
            missing={showMissing && answers[q.id_pertanyaan] === undefined}
            onChange={(nilai) => choose(q.id_pertanyaan, nilai)}
          />
        ))}

        <ReflectionNote />
      </main>

      <footer className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto w-full max-w-2xl px-4 py-3">
          {saved && (
            <p role="status" className="pb-2 text-center text-xs font-medium text-emerald-700">
              Jawaban tersimpan di perangkat ini.
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              aria-label="Simpan jawaban"
              className="grid size-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Bookmark size={20} />
            </button>
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0 || submitting}
              aria-label="Halaman sebelumnya"
              className="grid size-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={22} />
            </button>
            <Button onClick={handleNext} loading={submitting} icon={adaBerikut ? ArrowRight : Check} className="flex-1">
              {labelNext}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}