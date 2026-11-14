import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, LinkIcon, ShieldCheck } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import AuthCard from '../components/ui/AuthCard'
import PasswordInput from '../components/ui/PasswordInput'
import PasswordChecklist from '../components/ui/PasswordChecklist'
import Button from '../components/ui/Button'
import { resetPasswordSchema } from '../utils/schemas'
import { ROUTES } from '../utils/constants'

function ResetForm() {
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', konfirmasi_password: '' },
  })

  const onSubmit = async () => {
    // TODO (teman): panggil API atur ulang kata sandi. Kirim token dan email dari alamat halaman
    // (useSearchParams: params.get('token'), params.get('email')) beserta kata sandi baru.
    // Kalau server menolak (tautan kedaluwarsa atau sudah dipakai), tampilkan pesannya (mis. lewat setError).
    setDone(true)
  }

  if (done) {
    return (
      <AuthCard
        icon={CircleCheck}
        tone="success"
        title="Kata sandi berhasil diubah"
        subtitle="Silakan masuk dengan kata sandi baru Anda."
      >
        <Button as={Link} to={ROUTES.LOGIN} className="w-full">
          Masuk
        </Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard icon={ShieldCheck} title="Atur Ulang Kata Sandi" subtitle="Buat kata sandi baru untuk akun Anda.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <PasswordInput
            label="Kata Sandi Baru"
            placeholder="Buat kata sandi baru"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordChecklist value={watch('password')} />
        </div>
        <PasswordInput
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi baru"
          autoComplete="new-password"
          error={errors.konfirmasi_password?.message}
          {...register('konfirmasi_password')}
        />
        <Button type="submit" loading={isSubmitting} className="w-full">
          Simpan Kata Sandi
        </Button>
      </form>
    </AuthCard>
  )
}

function InvalidLink() {
  return (
    <AuthCard
      icon={LinkIcon}
      tone="warning"
      title="Tautan tidak valid"
      subtitle="Tautan atur ulang kata sandi tidak lengkap, sudah dipakai, atau sudah kedaluwarsa."
    >
      <Button as={Link} to={ROUTES.FORGOT_PASSWORD} className="w-full">
        Minta Tautan Baru
      </Button>
    </AuthCard>
  )
}

export default function ResetPasswordPage() {
  const [params] = useSearchParams()
  // Di tampilan ini keberadaan token cukup untuk menentukan formulir. Server yang menilai keabsahannya.
  const adaToken = Boolean(params.get('token'))

  return <AuthLayout backTo={ROUTES.LOGIN}>{adaToken ? <ResetForm /> : <InvalidLink />}</AuthLayout>
}