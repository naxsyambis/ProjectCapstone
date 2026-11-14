import { useState } from 'react'
import MissionCard from './MissionCard'
import WeekProgress from './WeekProgress'
import BadgeShelf from './BadgeShelf'
import Alert from '../feedback/Alert'
import { updateMission } from '../../api/missions'

export default function MissionBoard({ idBayi, data, onPoinChange }) {
  const [misi, setMisi] = useState(data.misi_hari_ini)
  const [minggu, setMinggu] = useState(data.minggu_ini)
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')

  const handleAction = async (item, aksi) => {
    setBusyId(item.id_misi)
    setError('')
    try {
      const res = await updateMission(idBayi, item.id_misi, aksi)
      setMisi((daftar) => daftar.map((m) => (m.id_misi === res.misi.id_misi ? res.misi : m)))
      setMinggu(res.minggu_ini)
      onPoinChange(res.poin_total)
    } catch (err) {
      setError(err.message || 'Gagal menyimpan. Silakan coba lagi.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mt-6">
        <WeekProgress hari={minggu} />
      </div>

      <section className="mt-8" aria-labelledby="misi-hari-ini">
        <h2 id="misi-hari-ini" className="text-lg font-semibold text-slate-900">
          Misi Hari Ini
        </h2>

        {error && (
          <div className="mt-3">
            <Alert>{error}</Alert>
          </div>
        )}

        {misi.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Belum ada misi untuk hari ini.</p>
        ) : (
          <ul className="mt-3 space-y-4">
            {misi.map((m) => (
              <MissionCard key={m.id_misi} misi={m} busy={busyId === m.id_misi} onAction={handleAction} />
            ))}
          </ul>
        )}
      </section>

      <BadgeShelf lencana={data.lencana} />
    </>
  )
}