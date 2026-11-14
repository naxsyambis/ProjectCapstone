import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '../utils/constants'

export default function AuthLayout({ children, backTo = ROUTES.HOME }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-brand-100/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 size-96 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-5">
        <Link
          to={backTo}
          aria-label="Kembali"
          className="inline-flex size-11 items-center justify-center rounded-full text-slate-900 hover:bg-white/70"
        >
          <ArrowLeft size={24} />
        </Link>

        <main className="flex flex-1 items-center py-6">{children}</main>
      </div>
    </div>
  )
}