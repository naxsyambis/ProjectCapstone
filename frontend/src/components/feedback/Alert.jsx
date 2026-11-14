import { AlertCircle, CircleCheck, Info } from 'lucide-react'

const TONES = {
  error: { box: 'border-red-200 bg-red-50 text-red-700', icon: AlertCircle, role: 'alert' },
  success: { box: 'border-emerald-200 bg-emerald-50 text-emerald-800', icon: CircleCheck, role: 'status' },
  info: { box: 'border-brand-600/20 bg-brand-50 text-brand-700', icon: Info, role: 'status' },
}

export default function Alert({ tone = 'error', children }) {
  const t = TONES[tone]
  const Icon = t.icon

  return (
    <div role={t.role} className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${t.box}`}>
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}