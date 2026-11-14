import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Trash2 } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import Input from '../components/ui/Input'
import ChoiceGroup from '../components/ui/ChoiceGroup'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Alert from '../components/feedback/Alert'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import { useRequest } from '../hooks/useRequest'
import { createChild, deleteChild, getChild, updateChild } from '../api/children'
import { childSchema } from '../utils/schemas'
import { formatUsia, hitungUsiaBulan, tanggalHariIni } from '../utils/age'
import { RENTANG_USIA } from '../utils/screening'
import { OPSI_JENIS_KELAMIN, ROUTES } from '../utils/constants'

function ChildForm({ initial }) {
  const navigate = useNavigate()
  const edit = Boolean(initial)
  const [serverError, setServerError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const closeConfirm = useCallback(() => setConfirmOpen(false), [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(childSchema),
    defaultValues: {
      nama: initial?.nama ?? '',
      tanggal_lahir: initial?.tanggal_lahir ?? '',
      jenis_kelamin: initial?.jenis_kelamin ?? '',
      catatan: initial?.catatan ?? '',
    },
  })

  const usiaBulan = hitungUsiaBulan(watch('tanggal_lahir'))
  const usiaTeks = formatUsia(usiaBulan)
  const hint = usiaTeks
    ? `Usia anak saat ini: ${usiaTeks}${
        usiaBulan > RENTANG_USIA.maks ? ` (di luar rentang screening ${RENTANG_USIA.min}-${RENTANG_USIA.maks} bulan)` : ''
      }`
    : undefined

  const onSubmit = async (values) => {
    setServerError('')
    try {
      const payload = {
        nama: values.nama,
        tanggal_lahir: values.tanggal_lahir,
        jenis_kelamin: values.jenis_kelamin,
        catatan: values.catatan || null,
      }
      if (edit) await updateChild(initial.id_bayi, payload)
      else await createChild(payload)
      navigate(ROUTES.CHILDREN, { replace: true })
    } catch (err) {
      setServerError(err.message || 'Gagal menyimpan. Silakan coba lagi.')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteChild(initial.id_bayi)
      navigate(ROUTES.CHILDREN, { replace: true })
    } catch (err) {
      setServerError(err.message || 'Gagal menghapus. Silakan coba lagi.')
      setConfirmOpen(false)
      setDeleting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
        {serverError && <Alert>{serverError}</Alert>}

        <Input label="Nama Anak" placeholder="cth. Aksa" error={errors.nama?.message} {...register('nama')} />
        <Input
          label="Tanggal Lahir"
          type="date"
          max={tanggalHariIni()}
          hint={hint}
          error={errors.tanggal_lahir?.message}
          {...register('tanggal_lahir')}
        />
        <ChoiceGroup
          legend="Jenis Kelamin"
          options={OPSI_JENIS_KELAMIN}
          registration={register('jenis_kelamin')}
          error={errors.jenis_kelamin?.message}
        />
        <Input
          label="Catatan (opsional)"
          placeholder="cth. lahir prematur"
          error={errors.catatan?.message}
          {...register('catatan')}
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          {edit ? 'Simpan Perubahan' : 'Tambah Anak'}
        </Button>

        {edit && (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >
            <Trash2 size={18} aria-hidden="true" />
            Hapus Data Anak
          </button>
        )}
      </form>

      {edit && (
        <ConfirmDialog
          open={confirmOpen}
          title={`Hapus data ${initial.nama}?`}
          message="Semua riwayat screening dan misi anak ini juga akan dihapus. Tindakan ini tidak dapat dibatalkan."
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={closeConfirm}
        />
      )}
    </>
  )
}

function BackLink() {
  return (
    <Link to={ROUTES.CHILDREN} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">
      <ArrowLeft size={16} aria-hidden="true" />
      Kembali
    </Link>
  )
}

function EditLoader({ idBayi }) {
  const request = useCallback(() => getChild(idBayi), [idBayi])
  const { data, loading, error, retry } = useRequest(request)

  return (
    <PageLayout>
      <BackLink />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Ubah Data Anak</h1>
      {loading && <Loading text="Memuat data anak..." />}
      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}
      {data && <ChildForm initial={data} />}
    </PageLayout>
  )
}

export default function ChildFormPage() {
  const { idBayi } = useParams()

  if (idBayi) return <EditLoader key={idBayi} idBayi={idBayi} />

  return (
    <PageLayout>
      <BackLink />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Tambah Anak</h1>
      <ChildForm />
    </PageLayout>
  )
}