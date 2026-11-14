import { Brain } from 'lucide-react'
import DashCard from './DashCard'
import { GAYA_ASUH } from '../../utils/parentingStyles'

export default function ParentingStyleCard({ gaya }) {
  const info = GAYA_ASUH[gaya] ?? null

  return (
    <DashCard icon={Brain} title="Gaya Parenting">
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-2xl font-bold text-slate-900">{info ? info.label : 'Belum ada'}</p>
        {info && <p className={`mt-1 text-sm font-medium ${info.tone}`}>{info.ringkas}</p>}
      </div>
    </DashCard>
  )
}