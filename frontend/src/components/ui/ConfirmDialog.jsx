import { useEffect } from 'react'
import Button from './Button'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Hapus',
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) onCancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, loading, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
      onClick={loading ? undefined : onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="konfirmasi-judul"
        aria-describedby="konfirmasi-isi"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
      >
        <h2 id="konfirmasi-judul" className="text-xl font-bold text-slate-900">
          {title}
        </h2>
        <p id="konfirmasi-isi" className="mt-2 leading-relaxed text-slate-600">
          {message}
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={loading} className="flex-1">
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading} className="flex-1">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}