import Navbar from '../components/layout/Navbar'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import AssessmentForm from '../components/assessment/AssessmentForm'
import { useRequest } from '../hooks/useRequest'
import { getQuestions } from '../api/assessment'

export default function AssessmentPage() {
  const { data, loading, error, retry } = useRequest(getQuestions)

  // Soal sudah ada: tampilkan formulir layar penuh (tanpa navbar biasa)
  if (data?.pertanyaan.length > 0) {
    return <AssessmentForm pertanyaan={data.pertanyaan} skala={data.skala} />
  }

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        {loading && <Loading text="Memuat pertanyaan..." />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && <p className="py-12 text-center text-slate-500">Belum ada pertanyaan assessment.</p>}
      </main>
    </div>
  )
}
