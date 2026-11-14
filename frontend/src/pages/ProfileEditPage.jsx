import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Mail } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/feedback/Alert'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import { useAuth } from '../hooks/useAuth'
import { useRequest } from '../hooks/useRequest'
import { getProfile, updateProfile } from '../api/profile'
import { profileSchema } from '../utils/schemas'
import { ROUTES } from '../utils/constants'

function ProfileForm({ user, profil }) {
  const { updateUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nama_lengkap: user.nama_lengkap ?? '',
      nama_panggilan: user.nama_panggilan ?? '',
      nomor_hp: profil.nomor_hp ?? '',
      usia_orang_tua: profil.usia_orang_tua ? String(profil.usia_orang_tua) : '',
    },
  })

  const onSubmit = async (values) => {
    setServerError('')
    try {
      const hasil = await updateProfile({
        nama_lengkap: values.nama_lengkap,
        nama_panggilan: values.nama_panggilan,
        nomor_hp: values.nomor_hp || null,
        usia_orang_tua: Number(values.usia_orang_tua),
      })
      updateUser({ nama_lengkap: hasil.nama_lengkap, nama_panggilan: hasil.nama_panggilan })
      navigate(ROUTES.PROFILE, { replace: true })
    } catch (err) {
      setServerError(err.message || 'Gagal menyimpan. Silakan coba lagi.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      {serverError && <Alert>{serverError}</Alert>}

      <Input
        label="Alamat Email"
        icon={Mail}
        value={user.email}
        readOnly
        disabled
        hint="Email tidak dapat diubah di sini."
      />
      <Input label="Nama Lengkap" autoComplete="name" error={errors.nama_lengkap?.message} {...register('nama_lengkap')} />
      <Input label="Nama Panggilan" autoComplete="nickname" error={errors.nama_panggilan?.message} {...register('nama_panggilan')} />
      <Input
        label="Nomor HP (opsional)"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="081234567890"
        error={errors.nomor_hp?.message}
        {...register('nomor_hp')}
      />
      <Input
        label="Usia Anda"
        type="number"
        inputMode="numeric"
        placeholder="Tahun"
        error={errors.usia_orang_tua?.message}
        {...register('usia_orang_tua')}
      />

      <Button type="submit" loading={isSubmitting} className="w-full">
        Simpan Perubahan
      </Button>
    </form>
  )
}

export default function ProfileEditPage() {
  const { user } = useAuth()
  const { data, loading, error, retry } = useRequest(getProfile)

  return (
    <PageLayout>
      <Link to={ROUTES.PROFILE} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke profil
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Ubah Detail</h1>

      {loading && <Loading text="Memuat data..." />}
      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}
      {data && user && <ProfileForm user={user} profil={data} />}
    </PageLayout>
  )
}