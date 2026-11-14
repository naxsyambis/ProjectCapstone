import { Link, useNavigate } from 'react-router-dom'
import { Baby, Bell, ChevronRight, CircleUser, Lock, LogOut, Settings } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import AvatarUploader from '../components/ui/AvatarUploader'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ChildListItem from '../components/children/ChildListItem'
import { useAuth } from '../hooks/useAuth'
import { useRequest } from '../hooks/useRequest'
import { getProfile, uploadProfilePhoto } from '../api/profile'
import { getChildren } from '../api/children'
import { formatBulanTahun } from '../utils/format'
import { ROUTES } from '../utils/constants'

const PENGATURAN = [
  { to: ROUTES.SETTINGS_NOTIFICATIONS, label: 'Pengaturan Notifikasi', icon: Bell },
  { to: ROUTES.SETTINGS_ACCOUNT, label: 'Pengaturan Akun', icon: Settings },
  { to: ROUTES.SETTINGS_PRIVACY, label: 'Privasi & Keamanan', icon: Lock },
]

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-lg">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right text-slate-900">{value}</dd>
    </div>
  )
}

function Card({ icon: Icon, iconClass, title, action, children }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="flex items-center gap-3 text-xl text-slate-900">
          <Icon size={26} className={iconClass} aria-hidden="true" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const profil = useRequest(getProfile)
  const anak = useRequest(getChildren)

  if (!user) return null
  const nama = user.nama_lengkap

  const handlePhoto = async (file) => {
    const { foto_url: fotoUrl } = await uploadProfilePhoto(file)
    updateUser({ foto_url: fotoUrl })
  }

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <PageLayout>
      <section className="flex flex-col items-center text-center">
        <AvatarUploader name={nama} src={user.foto_url} onSelect={handlePhoto} />
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">{nama}</h1>
        <p className="mt-1 break-all text-lg text-slate-500">{user.email}</p>
      </section>

      <div className="mt-8 space-y-5">
        <Card
          icon={CircleUser}
          iconClass="text-brand-600"
          title="Detail Orang Tua"
          action={
            <Link to={ROUTES.PROFILE_EDIT} className="font-semibold text-brand-600 hover:underline">
              Ubah
            </Link>
          }
        >
          {profil.loading && <Loading text="Memuat..." />}
          {profil.error && (
            <div className="mt-4">
              <ErrorState message={profil.error} onRetry={profil.retry} />
            </div>
          )}
          {profil.data && (
            <dl className="mt-5 space-y-4">
              <InfoRow label="Telepon" value={profil.data.nomor_hp || '-'} />
              <InfoRow label="Usia" value={profil.data.usia_orang_tua ? `${profil.data.usia_orang_tua} tahun` : '-'} />
              <InfoRow label="Bergabung" value={formatBulanTahun(profil.data.tanggal_daftar)} />
            </dl>
          )}
        </Card>

        <Card
          icon={Baby}
          iconClass="text-emerald-700"
          title="Profil Anak"
          action={
            <Link to={ROUTES.CHILD_NEW} className="font-semibold text-brand-600 hover:underline">
              + Tambah
            </Link>
          }
        >
          {anak.loading && <Loading text="Memuat..." />}
          {anak.error && (
            <div className="mt-4">
              <ErrorState message={anak.error} onRetry={anak.retry} />
            </div>
          )}
          {anak.data?.length === 0 && (
            <p className="mt-5 leading-relaxed text-slate-500">Belum ada data anak. Tambahkan anak untuk memulai screening.</p>
          )}
          {anak.data?.length > 0 && (
            <ul className="mt-5 space-y-3">
              {anak.data.map((a, i) => (
                <ChildListItem key={a.id_bayi} anak={a} index={i} />
              ))}
            </ul>
          )}
        </Card>

        <ul className="divide-y divide-slate-200 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
          {PENGATURAN.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link to={to} className="flex items-center gap-4 px-6 py-5 text-lg text-slate-900 transition hover:bg-slate-50">
                <Icon size={24} className="text-slate-500" aria-hidden="true" />
                <span className="flex-1">{label}</span>
                <ChevronRight size={20} className="text-slate-400" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-red-100 text-lg font-semibold text-red-800 transition hover:bg-red-200"
        >
          <LogOut size={22} aria-hidden="true" />
          Keluar
        </button>
      </div>
    </PageLayout>
  )
}