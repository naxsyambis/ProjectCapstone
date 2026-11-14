export default function Avatar({ name = '', src, size = 40 }) {
  const style = { width: size, height: size }

  if (src) {
    return <img src={src} alt={name} style={style} className="rounded-full object-cover" />
  }

  const initial = name.trim().charAt(0).toUpperCase() || '?'
  return (
    <div
      style={style}
      aria-hidden="true"
      className="flex items-center justify-center rounded-full bg-brand-600 font-semibold text-white"
    >
      {initial}
    </div>
  )
}