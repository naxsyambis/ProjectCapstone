import { ChevronDown } from 'lucide-react'

export default function FaqList({ items }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      {items.map((f) => (
        <details key={f.tanya} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[17px] font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
            {f.tanya}
            <ChevronDown
              size={20}
              className="shrink-0 text-slate-400 transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-slate-600">{f.jawab}</p>
        </details>
      ))}
    </div>
  )
}