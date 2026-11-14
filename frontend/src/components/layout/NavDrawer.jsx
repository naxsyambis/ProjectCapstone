import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Drawer from './Drawer'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../hooks/useAuth'
import { getNavState, MENUS } from '../../utils/navigation'
import { ROUTES } from '../../utils/constants'
import logo from '../../assets/logo.png'

export default function NavDrawer({ open, onClose }) {
  const { user, hasAssessment, logout } = useAuth()
  const navigate = useNavigate()

  const items = MENUS[getNavState(user, hasAssessment)]
  const nama = user?.nama_panggilan || user?.nama_lengkap

  const handleLogout = async () => {
    await logout()
    onClose()
    navigate(ROUTES.HOME)
  }

  return (
    <Drawer open={open} onClose={onClose} label="Menu utama">
      {/* Kepala drawer: beda untuk tamu dan yang sudah login */}
      <div className="flex items-center gap-3 px-5 pb-6 pr-16 pt-6">
        {user ? (
          <Avatar name={nama} src={user.foto_url} size={48} />
        ) : (
          <img src={logo} alt="" className="size-12 rounded-xl object-contain" />
        )}
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">
            {user ? `Selamat Datang, ${nama}` : 'Vidya Parent'}
          </p>
          <p className="text-sm text-slate-500">
            {user ? 'Perjalanan Parenting Anda' : 'Supportive Clarity for Every Parent'}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-6">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon, highlight }) => (
            <li key={to + label}>
              <NavLink
                to={to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] transition ${
                    highlight
                      ? 'bg-brand-600 font-medium text-white hover:bg-brand-700'
                      : isActive
                        ? 'bg-brand-100 font-semibold text-brand-600'
                        : 'text-slate-700 hover:bg-white'
                  }`
                }
              >
                <Icon size={22} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {user && (
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium text-red-700 transition hover:bg-red-50"
          >
            <LogOut size={22} aria-hidden="true" />
            Logout
          </button>
        )}
      </nav>
    </Drawer>
  )
}