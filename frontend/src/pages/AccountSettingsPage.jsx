import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Mail, Trash2 } from 'lucide-react'
import SettingsLayout from '../layouts/SettingsLayout'
import SettingsSection from '../components/account/SettingsSection'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'
import PasswordChecklist from '../components/ui/PasswordChecklist'
import Button from '../components/ui/Button'
import Alert from '../components/feedback/Alert'
import { useAuth } from '../hooks/useAuth'
import { changePasswordSchema, deleteAccountSchema } from '../utils/schemas'
import { ROUTES } from '../utils/constants'

function ChangePasswordForm() {
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password_lama: '', password_baru: '', konfirmasi_password: '' },
  })

  const onSubmit = async () => {
    // TODO (teman): panggil API ubah kata sandi (kirim password_lama dan password_baru).
    // Kalau server menolak (kata sandi lama salah), tampilkan lewat setError('password_lama', { message }).
    setDone(true)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {done && <Alert tone="success">Kata sandi berhasil diperbarui.</Alert>}

      <PasswordInput
        label="Kata Sandi Saat Ini"
        autoComplete="current-password"
        error={errors.password_lama?.message}
        {...register('password_lama')}
      />
      <div>
        <PasswordInput
          label="Kata Sandi Baru"
          autoComplete="new-password"
          error={errors.password_baru?.message}
          {...register('password_baru')}
        />
        <PasswordChecklist value={watch('password_baru')} />
      </div>
      <PasswordInput
        label="Konfirmasi Kata Sandi Baru"
        autoComplete="new-password"
        error={errors.konfirmasi_password?.message}
        {...register('konfirmasi_password')}
      />
      <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto sm:px-10">
        Simpan Kata Sandi
      </Button>
    </form>
  )
}

function DeleteAccountSection() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: '', konfirmasi: '' },
  })

  const onSubmit = async () => {
    // TODO (teman): panggil API hapus akun (kirim password untuk verifikasi).
    // Kalau server menolak (kata sandi salah), tampilkan lewat setError('password', { message }).
    await logout()
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <SettingsSection
      icon={Trash2}
      tone="danger"
      title="Hapus Akun"
      description="Menghapus akun akan menghapus data akun, data semua anak, hasil assessment dan screening, serta progres belajar dan misi. Tindakan ini tidak dapat dibatalkan."
    >
      {!open ? (
        <Button variant="danger" onClick={() => setOpen(true)} className="w-full sm:w-auto sm:px-10">
          Hapus Akun Saya
        </Button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <PasswordInput
            label="Kata Sandi"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Ketik HAPUS untuk mengonfirmasi"
            autoComplete="off"
            error={errors.konfirmasi?.message}
            {...register('konfirmasi')}
          />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setOpen(false)} className="flex-1">
              Batal
            </Button>
            <Button type="submit" variant="danger" loading={isSubmitting} className="flex-1">
              Hapus Permanen
            </Button>
          </div>
        </form>
      )}
    </SettingsSection>
  )
}

export default function AccountSettingsPage() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <SettingsLayout title="Pengaturan Akun" description="Kelola keamanan akun Anda.">
      <SettingsSection icon={Mail} title="Email">
        <Input value={user.email} readOnly disabled hint="Email tidak dapat diubah di sini." />
      </SettingsSection>

      <SettingsSection icon={KeyRound} title="Ubah Kata Sandi">
        <ChangePasswordForm />
      </SettingsSection>

      <DeleteAccountSection />
    </SettingsLayout>
  )
}