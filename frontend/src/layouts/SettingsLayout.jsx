import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageLayout from './PageLayout'
import { ROUTES } from '../utils/constants'

export default function SettingsLayout({ title, description, children }) {
  return (
    <PageLayout>
      <Link
        to={ROUTES.PROFILE}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke profil
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
      {description && <p className="mt-3 text-lg leading-relaxed text-slate-600">{description}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </PageLayout>
  )
}