import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { GAYA_ASUH } from '../../utils/parentingStyles'
import { ROUTES } from '../../utils/constants'

export default function StyleBubble({ gaya }) {
  const info = GAYA_ASUH[gaya]

  if (!info) {
    return (
      <div className="py-6 text-center">
        <p className="text-xl font-semibold text-slate-900">Belum ada</p>
        <p className="mt-1 text-slate-600">Selesaikan assessment untuk mengetahui gaya parenting dominan Anda.</p>
        <Button as={Link} to={ROUTES.ASSESSMENT} className="mt-5 w-full sm:w-auto sm:px-10">
          Mulai Assessment
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center py-4">
      <div className="grid size-52 place-items-center rounded-full bg-white ring-4 ring-brand-100">
        <div className="grid size-40 place-content-center rounded-full bg-brand-100 text-center">
          <span className="text-2xl font-bold text-brand-600">{info.label}</span>
          <span className="mt-1 text-sm font-semibold text-slate-700">Dominan</span>
        </div>
      </div>
      <p className="mt-4 text-slate-600">{info.ringkas}</p>
      <Link to={ROUTES.ASSESSMENT_RESULT} className="mt-2 text-sm font-semibold text-brand-600 hover:underline">
        Lihat rincian hasil
      </Link>
    </div>
  )
}