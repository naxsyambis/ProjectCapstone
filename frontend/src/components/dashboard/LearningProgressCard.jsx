import { GraduationCap } from 'lucide-react'
import DashCard from './DashCard'
import Meter from '../ui/Meter'

export default function LearningProgressCard({ progres }) {
  return (
    <DashCard
      icon={GraduationCap}
      title="Progres Belajar"
      aside={<span className="text-sm font-semibold text-emerald-700">{progres.persen}%</span>}
    >
      <p className="mt-4 text-lg text-slate-900">{progres.modul_terakhir}</p>
      <div className="mt-3">
        <Meter value={progres.persen} tone="accent" label="Progres belajar" />
      </div>
    </DashCard>
  )
}