import { Link } from 'react-router-dom'
import { ArrowLeft, CircleHelp } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { ROUTES } from '../../utils/constants'

export default function AssessmentHeader({ user, helpOpen, onToggleHelp }) {
  const nama = user.nama_panggilan || user.nama_lengkap

  return (
    // Dua sisi sama lebar supaya judul tetap tepat di tengah
    <div className="grid h-16 grid-cols-[5.5rem_1fr_5.5rem] items-center px-3">
      <Link
        to={ROUTES.DASHBOARD}
        aria-label="Kembali ke dasbor"
        className="flex size-11 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100"
      >
        <ArrowLeft size={24} />
      </Link>

      <div className="text-center leading-tight">
        <p className="flex items-center justify-center gap-2 text-[15px] font-bold uppercase tracking-wider text-slate-900">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-600" />
          Vidya Parent
        </p>
        <p className="mt-0.5 text-xs text-slate-500">Asesmen Parenting PSDQ</p>
      </div>

      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={onToggleHelp}
          aria-expanded={helpOpen}
          aria-label="Bantuan pengisian"
          className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
        >
          <CircleHelp size={22} />
        </button>
        <Link to={ROUTES.PROFILE} aria-label="Profil" className="shrink-0">
          <Avatar name={nama} src={user.foto_url} size={36} />
        </Link>
      </div>
    </div>
  )
}