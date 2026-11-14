import { ClipboardList, BookOpen, Smile, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Assessment',
    description: 'Mulai dengan penilaian awal untuk memahami kondisi terkini.',
  },
  {
    icon: BookOpen,
    title: 'Learning Path & Quiz',
    description: 'Ikuti modul pembelajaran yang disesuaikan dan uji pemahaman Anda.',
  },
  {
    icon: Smile,
    title: 'Screening Anak',
    description: 'Evaluasi perkembangan anak berdasarkan standar medis.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Dashboard',
    description: 'Pantau progres dan kelola Misi Parenting Anda secara berkelanjutan.',
  },
]

export default function JourneySection() {
  return (
    <section className="bg-indigo-50/60 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Perjalanan Anda Bersama Vidya Parent
        </h2>

        <ol className="ml-4 mt-8 space-y-5 border-l-2 border-blue-200">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pl-8">
              <span className="absolute -left-4 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-200 bg-white text-sm font-semibold text-gray-700">
                {index + 1}
              </span>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700">
                  <step.icon size={20} />
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                </div>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}