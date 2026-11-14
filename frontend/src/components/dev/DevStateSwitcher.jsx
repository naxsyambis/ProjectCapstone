import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { NAV_STATE, ROUTES } from '../../utils/constants'

const options = [
  { label: '1. Belum login', value: NAV_STATE.GUEST, to: ROUTES.HOME },
  { label: '2. Login, belum assessment', value: NAV_STATE.NEW_USER, to: ROUTES.DASHBOARD },
  { label: '3. Login, sudah assessment', value: NAV_STATE.ACTIVE_USER, to: ROUTES.DASHBOARD },
  { label: '4. Admin', value: NAV_STATE.ADMIN, to: ROUTES.ADMIN },
]

export default function DevStateSwitcher() {
  const [open, setOpen] = useState(false)
  const { setMockState } = useAuth()
  const navigate = useNavigate()

  const pilih = (o) => {
    setMockState(o.value)
    navigate(o.to)
  }

  return (
    <div className="fixed bottom-3 right-3 z-30 text-xs">
      {open && (
        <div className="mb-2 space-y-1 rounded-xl bg-slate-900/95 p-3 text-white shadow-lg">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => pilih(o)}
              className="block w-full rounded bg-white/10 px-2 py-1 text-left hover:bg-white/20"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto block rounded-full bg-slate-900/90 px-3 py-1.5 font-semibold text-white shadow"
      >
        DEV
      </button>
    </div>
  )
}