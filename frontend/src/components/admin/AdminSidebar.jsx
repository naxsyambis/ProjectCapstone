import { NavLink } from 'react-router-dom'
import { ADMIN_MENU } from '../../utils/adminNav'
import logo from '../../assets/logo.png'

export default function AdminSidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 pb-5 pr-16 pt-6 lg:pr-5">
        <img src={logo} alt="" className="size-10 rounded-xl object-contain" />
        <div className="leading-tight">
          <p className="font-bold text-slate-900">Vidya Parent</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Admin</p>
        </div>
      </div>

      <nav aria-label="Menu admin" className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-1">
          {ADMIN_MENU.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                    isActive ? 'bg-brand-100 text-brand-600' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon size={20} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}