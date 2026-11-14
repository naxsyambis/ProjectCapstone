import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Button from '../ui/Button'
import Alert from '../feedback/Alert'
import { ROUTES } from '../../utils/constants'
import { hasilKuisPath, kuisPath } from '../../utils/paths'

export default function ActionBar({ idMateri, selesai, kuis, saving, error, onComplete }) {
  return (
    <footer className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto w-full max-w-2xl space-y-2 px-5 py-3">
        {error && <Alert>{error}</Alert>}

        {!selesai && (
          <>
            <Button onClick={onComplete} loading={saving} className="w-full">
              <Check size={18} aria-hidden="true" />
              Tandai Selesai
            </Button>
            {kuis && (
              <p className="text-center text-xs text-slate-500">
                Setelah selesai, Anda bisa mengerjakan kuis materi ini.
              </p>
            )}
          </>
        )}

        {selesai && (
          <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-emerald-700">
            <Check size={16} aria-hidden="true" />
            Materi selesai
          </p>
        )}

        {selesai && kuis && kuis.lulus === true && (
          <div className="flex gap-3">
            <Button as={Link} to={hasilKuisPath(idMateri)} variant="secondary" className="flex-1">
              Lihat Hasil Kuis
            </Button>
            <Button as={Link} to={ROUTES.LEARNING_PATH} className="flex-1">
              Kembali ke Jalur
            </Button>
          </div>
        )}

        {selesai && kuis && kuis.lulus !== true && (
          <Button as={Link} to={kuisPath(idMateri)} icon={ArrowRight} className="w-full">
            {kuis.lulus === false ? 'Ulangi Kuis' : 'Kerjakan Kuis'}
          </Button>
        )}

        {selesai && !kuis && (
          <Button as={Link} to={ROUTES.LEARNING_PATH} className="w-full">
            Kembali ke Jalur Belajar
          </Button>
        )}
      </div>
    </footer>
  )
}