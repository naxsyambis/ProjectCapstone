import { useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import Avatar from './Avatar'

const TIPE_BOLEH = ['image/jpeg', 'image/png', 'image/webp']
const EKSTENSI_BOLEH = /\.(jpe?g|png|webp)$/i
const MAKS_BYTE = 2 * 1024 * 1024

export default function AvatarUploader({ name, src, onSelect }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // supaya berkas yang sama bisa dipilih lagi
    if (!file) return

    if (!TIPE_BOLEH.includes(file.type) || !EKSTENSI_BOLEH.test(file.name)) {
      setError('Format foto harus JPG, PNG, atau WebP.')
      return
    }
    if (file.size > MAKS_BYTE) {
      setError('Ukuran foto maksimal 2 MB.')
      return
    }

    setError('')
    setBusy(true)
    try {
      await onSelect(file)
    } catch (err) {
      setError(err.message || 'Gagal mengunggah foto.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar name={name} src={src} size={144} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          aria-label="Ganti foto profil"
          className="absolute bottom-1 right-1 grid size-11 place-items-center rounded-full bg-brand-600 text-white shadow-lg ring-4 ring-surface transition hover:bg-brand-700 disabled:opacity-60"
        >
          {busy ? (
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Pencil size={18} aria-hidden="true" />
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}