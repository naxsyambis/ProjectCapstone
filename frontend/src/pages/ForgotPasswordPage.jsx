import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, KeyRound, Mail, MailCheck } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import AuthCard from '../components/ui/AuthCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useCountdown } from '../hooks/useCountdown'
import { forgotPasswordSchema } from '../utils/schemas'
import { ROUTES } from '../utils/constants'

const JEDA_KIRIM_ULANG = 60 // detik

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState('')
  const [sisaDetik, mulaiJeda] = useCountdown(JEDA_KIRIM_ULANG)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' } })

  const onSubmit = async (values) => {
    // TODO (teman): panggil API "kirim tautan atur ulang kata sandi" di sini.
    // PENTING: tampilan setelahnya HARUS sama, entah emailnya terdaftar atau tidak
    // (supaya orang tidak bisa menebak email mana yang terdaftar).
    setSentTo(values.email)
    mulaiJeda()
  }

  const kirimUlang = () => {
    // TODO (teman): panggil API yang sama seperti di onSubmit, dengan email = sentTo.
    mulaiJeda()
  }

  if (sentTo) {
    return (
      <AuthLayout backTo={ROUTES.LOGIN}>
        <AuthCard
          icon={MailCheck}
          tone="success"
          title="Periksa email Anda"
          subtitle={`Jika ${sentTo} terdaftar, kami telah mengirim tautan untuk mengatur ulang kata sandi.`}
        >
          <p className="text-center text-sm leading-relaxed text-slate-500">
            Belum menerima? Periksa folder spam atau promosi. Tautan hanya berlaku untuk waktu terbatas.
          </p>
          <Button variant="secondary" onClick={kirimUlang} disabled={sisaDetik > 0} className="mt-5 w-full">
            {sisaDetik > 0 ? `Kirim ulang dalam ${sisaDetik} detik` : 'Kirim ulang tautan'}
          </Button>
          <button
            type="button"
            onClick={() => setSentTo('')}
            className="mt-4 block w-full text-center text-sm font-semibold text-brand-600 hover:underline"
          >
            Gunakan email lain
          </button>
        </AuthCard>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout backTo={ROUTES.LOGIN}>
      <AuthCard
        icon={KeyRound}
        title="Lupa Kata Sandi?"
        subtitle="Masukkan email akun Anda. Kami akan mengirim tautan untuk mengatur ulang kata sandi."
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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
          <Button type="submit" loading={isSubmitting} icon={ArrowRight} className="w-full">
            Kirim Tautan
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Ingat kata sandi Anda?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-brand-600 hover:underline">
            Masuk
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}