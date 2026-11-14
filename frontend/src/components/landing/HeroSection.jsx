import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { getHomePath } from '../../utils/navigation'
import { ROUTES } from '../../utils/constants'
import logo from '../../assets/logo.png'

export default function HeroSection() {
  const { user } = useAuth()
  const target = user ? getHomePath(user) : ROUTES.REGISTER

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-10 text-center">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-md">
        <img src={logo} alt="Logo Vidya Parent" className="h-20 w-20 object-contain" />
      </div>

      <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900">
        Menjadi Orang Tua yang Lebih Percaya Diri
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Supportive Clarity for Every Parent. Dapatkan panduan parenting yang
        terstruktur dan berbasis data.
      </p>

      <Link
        to={target}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 font-medium text-white transition hover:bg-brand-700 sm:w-auto"
      >
        Mulai Assessment
        <ArrowRight size={18} />
      </Link>
    </section>
  )
}