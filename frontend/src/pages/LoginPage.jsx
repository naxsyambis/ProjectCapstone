import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, ArrowRight } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'
import Button from '../components/ui/Button'
import Alert from '../components/feedback/Alert'
import { useAuth } from '../hooks/useAuth'
import { loginSchema } from '../utils/schemas'
import { getHomePath } from '../utils/navigation'
import { ROUTES } from '../utils/constants'
import logo from '../assets/logo.png'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values) => {
    setServerError('')
    try {
      const { user } = await login(values)
      navigate(getHomePath(user), { replace: true })
    } catch (err) {
      setServerError(err.message || 'Terjadi kesalahan. Silakan coba lagi.')
    }
  }

  return (
    <AuthLayout>
      <section className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-surface shadow-md">
            <img src={logo} alt="" className="size-14 object-contain" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-600">Vidya Parent</h1>
          <p className="mt-1 text-slate-600">Supportive Clarity for Every Parent.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
          {serverError && <Alert>{serverError}</Alert>}

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

          <PasswordInput
            label="Kata Sandi"
            labelRight={
              <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-brand-600 hover:underline">
                Lupa Kata Sandi?
              </Link>
            }
            placeholder="Masukkan kata sandi Anda"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button type="submit" loading={isSubmitting} icon={ArrowRight} className="w-full">
            Masuk
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Baru di ParentPath?{' '}
          <Link to={ROUTES.REGISTER} className="font-semibold text-brand-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}