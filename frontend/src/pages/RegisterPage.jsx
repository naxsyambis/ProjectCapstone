import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Phone, ArrowRight } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'
import PasswordChecklist from '../components/ui/PasswordChecklist'
import StepHint from '../components/ui/StepHint'
import Button from '../components/ui/Button'
import Alert from '../components/feedback/Alert'
import { useAuth } from '../hooks/useAuth'
import { registerSchema } from '../utils/schemas'
import { ROUTES, ONBOARDING_STEPS } from '../utils/constants'
import logo from '../assets/logo.png'

export default function RegisterPage() {
  const { register: signUp } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nama_lengkap: '',
      email: '',
      nomor_hp: '',
      password: '',
      konfirmasi_password: '',
      setuju: false,
    },
  })

  const passwordValue = watch('password')

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await signUp({
        nama_lengkap: values.nama_lengkap,
        email: values.email,
        nomor_hp: values.nomor_hp || null,
        password: values.password,
        password_confirmation: values.konfirmasi_password,
      })
      navigate(ROUTES.ONBOARDING, { replace: true })
    } catch (err) {
      if (err.fieldErrors) {
        // Error per kolom dari server (mis. email sudah dipakai) ditempel ke kolomnya
        Object.entries(err.fieldErrors).forEach(([field, message]) => setError(field, { message }))
      } else {
        setServerError(err.message || 'Terjadi kesalahan. Silakan coba lagi.')
      }
    }
  }

  return (
    <AuthLayout>
      <section className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-surface shadow-md">
            <img src={logo} alt="" className="size-11 object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">Buat Akun Baru</h1>
          <p className="mt-1 text-sm text-slate-600">Mulai perjalanan parenting Anda bersama Vidya Parent.</p>
          <div className="mt-4">
            <StepHint steps={ONBOARDING_STEPS} current={1} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
          {serverError && <Alert>{serverError}</Alert>}

          <Input
            label="Nama Lengkap"
            icon={User}
            placeholder="Masukkan nama lengkap Anda"
            autoComplete="name"
            error={errors.nama_lengkap?.message}
            {...register('nama_lengkap')}
          />

          <Input
            label="Alamat Email"
            type="email"
            icon={Mail}
            placeholder="Masukkan email Anda"
            autoComplete="email"
            inputMode="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Nomor HP (opsional)"
            type="tel"
            icon={Phone}
            placeholder="081234567890"
            autoComplete="tel"
            inputMode="tel"
            error={errors.nomor_hp?.message}
            {...register('nomor_hp')}
          />

          <div>
            <PasswordInput
              label="Kata Sandi"
              placeholder="Buat kata sandi"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <PasswordChecklist value={passwordValue} />
          </div>

          <PasswordInput
            label="Konfirmasi Kata Sandi"
            placeholder="Ulangi kata sandi"
            autoComplete="new-password"
            error={errors.konfirmasi_password?.message}
            {...register('konfirmasi_password')}
          />

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-0.5 size-5 shrink-0 rounded border-slate-300 accent-brand-600"
                {...register('setuju')}
              />
              <span>
                Saya menyetujui{' '}
                <Link to={ROUTES.TERMS} className="font-medium text-brand-600 hover:underline">
                  Ketentuan Layanan
                </Link>{' '}
                dan{' '}
                <Link to={ROUTES.PRIVACY} className="font-medium text-brand-600 hover:underline">
                  Kebijakan Privasi
                </Link>
                .
              </span>
            </label>
            {errors.setuju && (
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.setuju.message}
              </p>
            )}
          </div>

          <Button type="submit" loading={isSubmitting} icon={ArrowRight} className="w-full">
            Daftar
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-600">
          Sudah punya akun?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-brand-600 hover:underline">
            Masuk di sini
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}