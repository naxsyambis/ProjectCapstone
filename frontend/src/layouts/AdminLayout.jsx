import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu } from 'lucide-react'
import Drawer from '../components/layout/Drawer'
import AdminSidebar from '../components/admin/AdminSidebar'
import Avatar from '../components/ui/Avatar'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'

export default function AdminLayout({ title, children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const closeMenu = useCallback(() => setOpen(false), [])

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <div className="min-h-dvh bg-slate-50 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="hidden border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:block lg:h-dvh">
        <AdminSidebar />
      </aside>

      {/* Menu geser untuk layar kecil */}
      <Drawer open={open} onClose={closeMenu} label="Menu admin">
        <AdminSidebar onNavigate={closeMenu} />
      </Drawer>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu admin"
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <h1 className="truncate text-lg font-bold text-slate-900">{title}</h1>

          <div className="ml-auto flex items-center gap-3">
            <Avatar name={user?.nama_lengkap ?? 'Admin'} src={user?.foto_url} size={36} />
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
            >
              <LogOut size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Keluar</span>
              <span className="sr-only sm:hidden">Keluar</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}