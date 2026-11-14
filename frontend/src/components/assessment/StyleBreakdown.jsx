import { Star } from 'lucide-react'
import Meter from '../ui/Meter'
import { GAYA_ASUH } from '../../utils/parentingStyles'

const BAR_TONE = { autoritatif: 'brand', permisif: 'accent', otoriter: 'slate' }

export default function StyleBreakdown({ rincian, dominan }) {
  const urut = [...rincian].sort((a, b) => b.persentase - a.persentase)

  return (
    <section className="mt-8" aria-labelledby="rincian-gaya">
      <h2 id="rincian-gaya" className="text-lg font-semibold text-slate-900">
        Rincian Gaya
      </h2>

      <ul className="mt-3 space-y-4">
        {urut.map(({ gaya, persentase }) => {
          const label = GAYA_ASUH[gaya]?.label ?? gaya
          const isDominan = gaya === dominan

          return (
            <li key={gaya} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{label}</span>
                {isDominan && (
                  <Star size={20} role="img" aria-label="Gaya dominan" className="fill-brand-600 text-brand-600" />
                )}
              </div>

              <p className={`mt-4 text-right text-4xl font-bold ${isDominan ? 'text-brand-600' : 'text-slate-600'}`}>
                {persentase}%
              </p>

              <div className="mt-3">
                <Meter value={persentase} tone={BAR_TONE[gaya]} label={`${label} ${persentase} persen`} />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}