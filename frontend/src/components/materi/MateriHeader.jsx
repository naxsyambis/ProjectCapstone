import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '../../utils/constants'

export default function MateriHeader({ minggu, judul }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-2xl items-center gap-2 px-3">
        <Link
          to={ROUTES.LEARNING_PATH}
          aria-label="Kembali ke jalur belajar"
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
            {minggu ? `Minggu ${minggu}` : 'Materi'}
          </p>
          <h1 className="truncate text-xl font-bold leading-tight text-slate-900">{judul}</h1>
        </div>
      </div>
    </header>
  )
}