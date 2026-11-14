import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Drawer({ open, onClose, label, children }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${
        open ? 'visible' : 'invisible'
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup menu"
          className="absolute right-4 top-5 z-10 rounded-xl p-2 text-slate-700 hover:bg-white"
        >
          <X size={22} />
        </button>

        {children}
      </aside>
    </div>
  )
}