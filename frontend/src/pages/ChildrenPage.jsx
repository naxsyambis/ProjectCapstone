import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import Button from '../components/ui/Button'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ChildListItem from '../components/children/ChildListItem'
import { useRequest } from '../hooks/useRequest'
import { getChildren } from '../api/children'
import { ROUTES } from '../utils/constants'

export default function ChildrenPage() {
  const { data, loading, error, retry } = useRequest(getChildren)

  return (
    <PageLayout>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Data Anak</h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        Tambahkan setiap anak Anda. Screening dan misi parenting dibuat per anak.
      </p>

      {loading && <Loading text="Memuat data anak..." />}
      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}

      {data?.length === 0 && (
        <p className="mt-6 rounded-2xl bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200/70">
          Belum ada data anak.
        </p>
      )}
      {data?.length > 0 && (
        <ul className="mt-6 space-y-3">
          {data.map((a, i) => (
            <ChildListItem key={a.id_bayi} anak={a} index={i} />
          ))}
        </ul>
      )}

      {data && (
        <Button as={Link} to={ROUTES.CHILD_NEW} className="mt-6 w-full">
          <Plus size={18} aria-hidden="true" />
          Tambah Anak
        </Button>
      )}
    </PageLayout>
  )
}