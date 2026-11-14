import { ChartNoAxesCombined, FlaskConical, Headset } from 'lucide-react'
import FeatureCard from './FeatureCard'

const features = [
  {
    icon: ChartNoAxesCombined,
    iconClass: 'bg-teal-200 text-teal-800',
    title: 'Insight Parenting Personal',
    description: 'Panduan disesuaikan dengan kebutuhan unik keluarga Anda berdasarkan assessment mendalam.',
  },
  {
    icon: FlaskConical,
    iconClass: 'bg-amber-700 text-white',
    title: 'Pembelajaran Berbasis Bukti',
    description: 'Materi disusun oleh ahli dan berbasis penelitian ilmiah terkini.',
  },
  {
    icon: Headset,
    iconClass: 'bg-gray-200 text-gray-600',
    title: 'Dukungan & Pelacakan Anak',
    description: 'Pantau tumbuh kembang anak dengan Growth Dashboard dan dapatkan rekomendasi intervensi dini jika diperlukan.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto grid max-w-5xl gap-5 px-4 pb-10 md:grid-cols-3">
      {features.map((item) => (
        <FeatureCard key={item.title} {...item} />
      ))}
    </section>
  )
}