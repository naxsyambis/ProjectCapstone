import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { ROUTES } from '../../utils/constants'

export default function NextStepCard() {
  return (
    <section className="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70">
      <h2 className="text-2xl font-bold text-slate-900">Langkah Selanjutnya</h2>
      <p className="mt-3 text-[17px] leading-relaxed text-slate-600">
        Kami telah menyusun jalur pembelajaran yang dipersonalisasi untuk membantu Anda membangun kekuatan Anda dan
        mengatasi area fokus.
      </p>
      <Button as={Link} to={ROUTES.LEARNING_PATH} icon={ArrowRight} className="mt-6 w-full">
        Rekomendasi Jalur Belajar
      </Button>
    </section>
  )
}