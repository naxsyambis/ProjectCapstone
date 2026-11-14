import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, User } from 'lucide-react'
import NavDrawer from './NavDrawer'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../utils/constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const closeDrawer = useCallback(() => setOpen(false), [])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        {/* grid 3 kolom: judul selalu tepat di tengah */}
        <nav className="mx-auto grid h-16 max-w-5xl grid-cols-[3rem_1fr_3rem] items-center px-4">
          <button
            type="button"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex size-11 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>

          <Link to={ROUTES.HOME} className="text-center text-lg font-semibold text-brand-600">
            Vidya Parent
          </Link>

          {user ? (
            <Link to={ROUTES.PROFILE} aria-label="Profil" className="justify-self-end">
              <Avatar name={user.nama_panggilan || user.nama_lengkap} src={user.foto_url} />
            </Link>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              aria-label="Masuk"
              className="flex size-10 items-center justify-center justify-self-end rounded-full bg-slate-200 text-slate-500"
            >
              <User size={20} />
            </Link>
          )}
        </nav>
      </header>

      {/* Di LUAR <header>: backdrop-blur membuat elemen fixed di dalamnya terpotong */}
      <NavDrawer open={open} onClose={closeDrawer} />
    </>
  )
}