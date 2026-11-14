import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ScreeningForm from '../components/screening/ScreeningForm'
import { useRequest } from '../hooks/useRequest'
import { getScreeningQuestions } from '../api/screening'
import { ROUTES } from '../utils/constants'

function FormLoader({ idBayi }) {
  const request = useCallback(() => getScreeningQuestions(idBayi), [idBayi])
  const { data, loading, error, retry } = useRequest(request)

  if (data?.pertanyaan.length > 0) return <ScreeningForm idBayi={idBayi} data={data} />

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 space-y-4 px-5 py-8">
        {loading && <Loading text="Memuat kuesioner..." />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && <p className="py-8 text-center text-slate-500">Belum ada pertanyaan untuk usia ini.</p>}
        {!loading && (
          <Link to={ROUTES.SCREENING} className="block text-center text-sm font-semibold text-brand-600 hover:underline">
            Kembali ke daftar anak
          </Link>
        )}
      </main>
    </div>
  )
}

export default function ScreeningFormPage() {
  const { idBayi } = useParams()
  return <FormLoader key={idBayi} idBayi={idBayi} />
}