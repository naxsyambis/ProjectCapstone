export default function Loading({ text = '' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-2 py-8 animate-pulse">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
      {text && <p className="text-xs text-slate-400 font-medium">{text}</p>}
    </div>
  )
}
