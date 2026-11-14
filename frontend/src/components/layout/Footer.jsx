import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

export default function Footer({ tagline = 'Supportive Clarity for Every Parent.' }) {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center">
      <p className="font-semibold text-slate-800">VidyaParent</p>

      <nav
        aria-label="Tautan footer"
        className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600"
      >
        <Link to={ROUTES.PRIVACY} className="hover:text-brand-600">Kebijakan Privasi</Link>
        <Link to={ROUTES.TERMS} className="hover:text-brand-600">Ketentuan Layanan</Link>
        <Link to={ROUTES.SUPPORT} className="hover:text-brand-600">Dukungan</Link>
      </nav>

      <p className="mt-4 text-xs text-slate-500">
        © {new Date().getFullYear()} VidyaParent. {tagline}
      </p>
    </footer>
  )
}