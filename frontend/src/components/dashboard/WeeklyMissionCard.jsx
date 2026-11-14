import { Flag } from 'lucide-react'
import DashCard from './DashCard'
import Meter from '../ui/Meter'

export default function WeeklyMissionCard({ misi }) {
  return (
    <DashCard
      icon={Flag}
      title="Misi Mingguan"
      aside={
        <span className="text-sm font-semibold text-emerald-700">
          {misi.selesai}/{misi.total} Selesai
        </span>
      }
    >
      <div className="mt-5">
        <Meter value={misi.selesai} max={misi.total} label="Misi mingguan yang selesai" />
      </div>
    </DashCard>
  )
}