const variants = {
  primary: 'bg-brand-600 text-white shadow-md shadow-brand-600/25 hover:bg-brand-700',
  secondary: 'bg-white text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes = {
  md: 'h-12 px-6 text-[15px]',
  sm: 'h-10 px-5 text-sm',
}

export default function Button({
  as: Component = 'button',
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type,
  ...rest
}) {
  // type dan disabled hanya berlaku untuk <button>, tidak untuk <a>/<Link>
  const nativeProps =
    Component === 'button' ? { type: type ?? 'button', disabled: disabled || loading } : {}

  return (
    <Component
      {...nativeProps}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/30 disabled:cursor-not-allowed disabled:opacity-60 ${sizes[size]} ${
        pill ? 'rounded-full' : 'rounded-xl'
      } ${variants[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <>
          <span
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden="true"
          />
          Memproses...
        </>
      ) : (
        <>
          {children}
          {Icon && <Icon size={18} aria-hidden="true" />}
        </>
      )}
    </Component>
  )
}