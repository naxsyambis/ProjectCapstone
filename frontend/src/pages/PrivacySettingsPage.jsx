import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Database, FileText, LogOut, ShieldCheck } from 'lucide-react'
import SettingsLayout from '../layouts/SettingsLayout'
import SettingsSection from '../components/account/SettingsSection'
import Button from '../components/ui/Button'
import Alert from '../components/feedback/Alert'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'

const DATA_TERSIMPAN = [
  { judul: 'Akun', isi: 'Nama, email, nomor HP, usia, dan foto profil.' },
  { judul: 'Anak', isi: 'Nama, tanggal lahir, jenis kelamin, dan catatan.' },
  { judul: 'Assessment dan screening', isi: 'Jawaban dan hasilnya.' },
  { judul: 'Belajar dan misi', isi: 'Progres materi, hasil kuis, dan progres misi.' },
]

const DOKUMEN = [
  { to: ROUTES.PRIVACY, label: 'Kebijakan Privasi' },
  { to: ROUTES.TERMS, label: 'Ketentuan Layanan' },
  { to: ROUTES.SUPPORT, label: 'Dukungan' },
]

function LinkRow({ to, children }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-xl px-1 py-3 text-[17px] text-slate-900 transition hover:text-brand-600"
    >
      {children}
      <ChevronRight size={20} className="text-slate-400" aria-hidden="true" />
    </Link>
  )
}

export default function PrivacySettingsPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [requested, setRequested] = useState(false)

  const handleRequestCopy = () => {
    // TODO (teman): panggil API permintaan salinan data (unduhan langsung atau dikirim ke email),
    // lalu sesuaikan teks pemberitahuan di bawah.
    setRequested(true)
  }

  const handleLogoutAll = async () => {
    // TODO (teman): panggil API "keluar dari semua perangkat" sebelum logout lokal.
    await logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <SettingsLayout
      title="Privasi & Keamanan"
      description="Lihat data apa yang kami simpan dan kelola keamanan akun Anda."
    >
      <SettingsSection icon={Database} title="Data Anda" description="Data yang tersimpan di akun Anda:">
        <ul className="space-y-3">
          {DATA_TERSIMPAN.map((d) => (
            <li key={d.judul} className="text-[17px] leading-snug">
              <span className="font-semibold text-slate-900">{d.judul}.</span>{' '}
              <span className="text-slate-600">{d.isi}</span>
            </li>
          ))}
        </ul>
        {requested && (
          <div className="mt-5">
            <Alert tone="info">Permintaan salinan data Anda sudah dicatat.</Alert>
          </div>
        )}
        <Button variant="secondary" onClick={handleRequestCopy} className="mt-5 w-full sm:w-auto sm:px-10">
          Minta Salinan Data
        </Button>
      </SettingsSection>

      <SettingsSection icon={ShieldCheck} title="Keamanan Akun">
        <div className="divide-y divide-slate-100">
          <LinkRow to={ROUTES.SETTINGS_ACCOUNT}>Ubah kata sandi</LinkRow>
          <LinkRow to={ROUTES.SETTINGS_ACCOUNT}>Hapus akun dan data</LinkRow>
        </div>
        <button
          type="button"
          onClick={handleLogoutAll}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-100 font-semibold text-red-800 transition hover:bg-red-200"
        >
          <LogOut size={18} aria-hidden="true" />
          Keluar dari Semua Perangkat
        </button>
      </SettingsSection>

      <SettingsSection icon={FileText} title="Dokumen">
        <div className="divide-y divide-slate-100">
          {DOKUMEN.map((d) => (
            <LinkRow key={d.to} to={d.to}>
              {d.label}
            </LinkRow>
          ))}
        </div>
      </SettingsSection>
    </SettingsLayout>
  )
}