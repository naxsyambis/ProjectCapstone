import { Fragment } from 'react'

export default function StepHint({ steps, current }) {
  return (
    <ol className="flex items-center justify-center gap-2 text-xs font-medium">
      {steps.map((label, index) => {
        const number = index + 1
        const active = number === current
        const done = number < current

        return (
          <Fragment key={label}>
            {index > 0 && <li aria-hidden="true" className="h-px w-5 bg-slate-300" />}
            <li
              aria-current={active ? 'step' : undefined}
              className={`flex items-center gap-1.5 ${active ? 'text-brand-600' : 'text-slate-400'}`}
            >
              <span
                className={`grid size-5 place-items-center rounded-full text-[11px] ${
                  active || done ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {number}
              </span>
              {active && <span>{label}</span>}
            </li>
          </Fragment>
        )
      })}
    </ol>
  )
}