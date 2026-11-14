import { Link } from 'react-router-dom'
import { ChevronRight, ClipboardList, CircleAlert, HeartPulse, Users } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import StatCard from '../../components/admin/StatCard'
import Loading from '../../components/feedback/Loading'
import ErrorState from '../../components/feedback/ErrorState'
import { useAuth } from '../../hooks/useAuth'
import { useRequest } from '../../hooks/useRequest'
import { getAdminStats } from '../../api/admin'
import { ADMIN_MENU } from '../../utils/adminNav'
import { ROUTES } from '../../utils/constants'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const { data: stats, loading, error, retry } = useRequest(getAdminStats, 'admin-stats')

  const statCards = [
    { label: 'Pengguna terdaftar', nilai: stats?.pengguna_terdaftar ?? 0, icon: Users, tone: 'brand' },
    { label: 'Assessment selesai', nilai: stats?.assessment_selesai ?? 0, icon: ClipboardList, tone: 'green' },
    { label: 'Screening selesai', nilai: stats?.screening_selesai ?? 0, icon: HeartPulse, tone: 'amber' },
    { label: 'Perlu perhatian', nilai: stats?.perlu_perhatian ?? 0, icon: CircleAlert, tone: 'red' },
  ]

  const reviewItems = [
    {
      teks: `${stats?.perlu_perhatian ?? 0} screening berstatus perlu perhatian (at-risk).`,
      to: `${ROUTES.ADMIN}/hasil-screening`,
    },
    { teks: 'Kelola materi belajar dan kuis pemahaman.', to: `${ROUTES.ADMIN}/materi` },
    { teks: 'Kelola daftar pengguna terdaftar.', to: `${ROUTES.ADMIN}/pengguna` },
  ]

  return (
    <AdminLayout title="Dasbor">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900">Halo, {user?.nama_panggilan || user?.nama_lengkap || 'Admin'}</h2>
        <p className="mt-1 text-slate-600">Ringkasan operasional dan layanan Vidya Parent.</p>

        {loading && <Loading text="Memuat statistik..." />}
        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="perlu-ditinjau">
            <h3 id="perlu-ditinjau" className="text-lg font-semibold text-slate-900">
              Perlu ditinjau
            </h3>
            <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
              {reviewItems.map((r) => (
                <li key={r.teks}>
                  <Link to={r.to} className="flex items-center justify-between gap-4 px-5 py-4 text-slate-700 hover:bg-slate-50">
                    {r.teks}
                    <ChevronRight size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="kelola">
            <h3 id="kelola" className="text-lg font-semibold text-slate-900">
              Kelola
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {ADMIN_MENU.slice(1).map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/70 transition hover:ring-brand-600/40"
                  >
                    <Icon size={20} className="shrink-0 text-brand-600" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AdminLayout>
  )
}
