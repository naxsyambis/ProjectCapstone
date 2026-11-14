import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  { label, labelRight, error, hint, icon: Icon, rightSlot, className = '', id, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-msg`

  return (
    <div className="w-full">
      {(label || labelRight) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-slate-800">
              {label}
            </label>
          )}
          {labelRight}
        </div>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error || hint ? messageId : undefined}
          className={`h-12 w-full rounded-xl border bg-white/70 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15 ${
            Icon ? 'pl-11' : 'pl-4'
          } ${rightSlot ? 'pr-12' : 'pr-4'} ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
          {...rest}
        />
        {rightSlot && <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>

      {error ? (
        <p id={messageId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

export default Input