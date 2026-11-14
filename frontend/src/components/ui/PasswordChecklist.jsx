import { Check, Circle } from 'lucide-react'
import { passwordRules } from '../../utils/schemas'

export default function PasswordChecklist({ value = '' }) {
  return (
    <ul className="mt-2 space-y-1" aria-label="Syarat kata sandi">
      {passwordRules.map((rule) => {
        const ok = rule.test(value)
        return (
          <li
            key={rule.id}
            className={`flex items-center gap-2 text-xs ${ok ? 'text-emerald-700' : 'text-slate-500'}`}
          >
            {ok ? <Check size={14} /> : <Circle size={14} />}
            {rule.label}
          </li>
        )
      })}
    </ul>
  )
}