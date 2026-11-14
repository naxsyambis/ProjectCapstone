import { BookOpen, ClipboardCheck, ClipboardList, HeartPulse, LayoutDashboard, ListChecks, Target, TrendingUp, Users } from 'lucide-react'
import { ROUTES } from './constants'

export const ADMIN_MENU = [
  { to: ROUTES.ADMIN, label: 'Dasbor', icon: LayoutDashboard, end: true },
  { to: `${ROUTES.ADMIN}/pengguna`, label: 'Pengguna', icon: Users },
  { to: `${ROUTES.ADMIN}/materi`, label: 'Materi', icon: BookOpen },
  { to: `${ROUTES.ADMIN}/kuis`, label: 'Kuis', icon: ListChecks },
  { to: `${ROUTES.ADMIN}/misi`, label: 'Misi Parenting', icon: Target },
  { to: `${ROUTES.ADMIN}/soal-assessment`, label: 'Soal Assessment', icon: ClipboardList },
  { to: `${ROUTES.ADMIN}/soal-screening`, label: 'Soal Screening', icon: HeartPulse },
  { to: `${ROUTES.ADMIN}/hasil-assessment`, label: 'Hasil Assessment', icon: TrendingUp },
  { to: `${ROUTES.ADMIN}/hasil-screening`, label: 'Hasil Screening', icon: ClipboardCheck },
]