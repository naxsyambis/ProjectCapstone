import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Users, ArrowRight } from 'lucide-react'
import Input from '../components/ui/Input'
import ChoiceGroup from '../components/ui/ChoiceGroup'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import Alert from '../components/feedback/Alert'
import { useAuth } from '../hooks/useAuth'
import { onboardingSchema } from '../utils/schemas'
import { formatUsia, hitungUsiaBulan, tanggalHariIni } from '../utils/age'
import { ROUTES, ONBOARDING_STEPS } from '../utils/constants'

const GENDER_OPTIONS = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' },
]

export default function OnboardingPage() {
  const { user, completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      nama_panggilan: user?.nama_lengkap?.split(' ')[0] ?? '',
      usia_orang_tua: '',
      nama_anak: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
    },
  })

  const usiaAnak = formatUsia(hitungUsiaBulan(watch('tanggal_lahir')))

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await completeOnboarding({
        nama_panggilan: values.nama_panggilan,
        usia_orang_tua: Number(values.usia_orang_tua),
        bayi: {
          nama: values.nama_anak,
          tanggal_lahir: values.tanggal_lahir,
          jenis_kelamin: values.jenis_kelamin,
        },
      })
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      setServerError(err.message || 'Gagal menyimpan data. Silakan coba lagi.')
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <ProgressBar current={2} total={ONBOARDING_STEPS.length} />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-8">
        <div className="grid size-16 place-items-center rounded-2xl bg-brand-100 text-brand-600">
          <Users size={32} aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Mari lengkapi profil Anda</h1>
        <p className="mt-3 text-slate-600">
          Kami menggunakan detail ini untuk menyesuaikan pengalaman Supportive Clarity dan jalur pembelajaran Anda.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-1 flex-col">
          <div className="space-y-5">
            {serverError && <Alert>{serverError}</Alert>}

            <Input
              label="Nama Panggilan Anda"
              placeholder="cth. Sarah"
              autoComplete="nickname"
              error={errors.nama_panggilan?.message}
              {...register('nama_panggilan')}
            />

            <Input
              label="Usia Anda"
              type="number"
              inputMode="numeric"
              placeholder="Tahun"
              error={errors.usia_orang_tua?.message}
              {...register('usia_orang_tua')}
            />

            <h2 className="pt-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Tentang si kecil</h2>

            <Input
              label="Nama Anak"
              placeholder="cth. Aksa"
              error={errors.nama_anak?.message}
              {...register('nama_anak')}
            />

            <Input
              label="Tanggal Lahir Anak"
              type="date"
              max={tanggalHariIni()}
              hint={usiaAnak ? `Usia anak saat ini: ${usiaAnak}` : undefined}
              error={errors.tanggal_lahir?.message}
              {...register('tanggal_lahir')}
            />

            <ChoiceGroup
              legend="Jenis Kelamin Anak"
              options={GENDER_OPTIONS}
              registration={register('jenis_kelamin')}
              error={errors.jenis_kelamin?.message}
            />
          </div>

          <div className="mt-auto pt-10">
            <Button type="submit" pill loading={isSubmitting} icon={ArrowRight} className="w-full">
              Lanjutkan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}