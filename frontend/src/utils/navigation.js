import {
  Home, LogIn, UserPlus, LayoutDashboard, ClipboardList, Route as RouteIcon,
  BookOpen, Smile, ClipboardCheck, TrendingUp, User,
} from 'lucide-react'
import { NAV_STATE, ROLES, ROUTES } from './constants'

export function getHomePath(user) {
  if (!user) return ROUTES.HOME
  if (user.role === ROLES.ADMIN) return ROUTES.ADMIN
  return user.profil_lengkap ? ROUTES.DASHBOARD : ROUTES.ONBOARDING
}

export function getNavState(user, hasAssessment) {
  if (!user) return NAV_STATE.GUEST
  if (!hasAssessment) return NAV_STATE.NEW_USER
  return NAV_STATE.ACTIVE_USER
}

export const MENUS = {
  [NAV_STATE.GUEST]: [
    { to: ROUTES.HOME, label: 'Beranda', icon: Home },
    { to: ROUTES.LOGIN, label: 'Masuk', icon: LogIn },
    { to: ROUTES.REGISTER, label: 'Daftar', icon: UserPlus },
  ],
  [NAV_STATE.NEW_USER]: [
    { to: ROUTES.DASHBOARD, label: 'Dasbor', icon: LayoutDashboard },
    { to: ROUTES.ASSESSMENT, label: 'Mulai Penilaian', icon: ClipboardList, highlight: true },
    { to: ROUTES.PROFILE, label: 'Profil', icon: User },
  ],
  [NAV_STATE.ACTIVE_USER]: [
    { to: ROUTES.DASHBOARD, label: 'Dasbor', icon: LayoutDashboard },
    { to: ROUTES.ASSESSMENT, label: 'Penilaian', icon: ClipboardList },
    { to: ROUTES.LEARNING_PATH, label: 'Learning Path', icon: RouteIcon },
    { to: ROUTES.MATERI, label: 'Materi', icon: BookOpen },
    { to: ROUTES.SCREENING, label: 'Screening Anak', icon: Smile },
    { to: ROUTES.MISSION, label: 'Parenting Mission', icon: ClipboardCheck },
    { to: ROUTES.REPORT, label: 'Laporan Perkembangan', icon: TrendingUp },
    { to: ROUTES.PROFILE, label: 'Profil', icon: User },
  ],
}