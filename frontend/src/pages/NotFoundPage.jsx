import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import Button from '../components/ui/Button'
import { ROUTES } from '../utils/constants'

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center py-16 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-brand-100 text-brand-600">
          <Compass size={32} aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Error 404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Halaman tidak ditemukan</h1>
        <p className="mt-3 max-w-sm leading-relaxed text-slate-600">
          Alamat yang Anda buka tidak ada atau sudah dipindahkan.
        </p>
        <Button as={Link} to={ROUTES.HOME} className="mt-8 w-full sm:w-auto sm:px-10">
          Kembali ke Beranda
        </Button>
      </div>
    </PageLayout>
  )
}