import { Link, useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import { ROUTES } from '../utils/constants'

export default function ComingSoonPage() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh bg-surface">
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
        <div className="grid size-16 place-items-center rounded-2xl bg-brand-100 text-brand-600">
          <Construction size={32} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Halaman sedang dibuat</h1>
        <p className="mt-2 text-slate-600">
          Halaman <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">{pathname}</code> belum tersedia.
        </p>
        <Link
          to={ROUTES.HOME}
          className="mt-8 rounded-full bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700"
        >
          Kembali ke Beranda
        </Link>
      </main>
    </div>
  )
}