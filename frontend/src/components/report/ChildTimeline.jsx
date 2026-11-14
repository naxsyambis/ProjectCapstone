import TimelineItem from './TimelineItem'
import { formatTanggal } from '../../utils/format'
import { hasilScreeningPath, misiPath, screeningPath } from '../../utils/paths'

function susunItem(anak) {
  const { id_bayi: id, nama, status_screening: status, screening, misi } = anak
  const tanggal = screening.terakhir ? formatTanggal(screening.terakhir) : ''
  const item = []

  if (status === 'belum_pernah') {
    item.push({
      judul: 'Screening Sosial-Emosional',
      state: 'pending',
      chip: 'Belum dilakukan',
      deskripsi: `Lakukan screening untuk memantau perkembangan sosial-emosional ${nama}.`,
      tautan: { to: screeningPath(id), label: 'Mulai Screening' },
    })
  } else if (status === 'at_risk') {
    item.push({
      judul: 'Screening Sosial-Emosional',
      state: 'attention',
      chip: 'Perlu perhatian',
      deskripsi: `Disarankan berkonsultasi dengan profesional • ${tanggal}`,
      tautan: { to: hasilScreeningPath(id), label: 'Lihat hasil dan saran' },
    })
  } else {
    item.push({
      judul: 'Screening Sosial-Emosional',
      state: 'done',
      chip: 'Selesai',
      deskripsi: `Hasil aman • ${tanggal}`,
      tautan: { to: hasilScreeningPath(id), label: 'Lihat hasil' },
    })
  }

  if (status === 'aman' && misi) {
    const semua = misi.total > 0 && misi.selesai === misi.total
    item.push({
      judul: 'Misi Parenting',
      state: semua ? 'done' : 'active',
      chip: semua ? 'Selesai' : 'Sedang Berlangsung',
      deskripsi: `${misi.selesai} dari ${misi.total} misi hari ini selesai.`,
      tautan: { to: misiPath(id), label: 'Buka Misi' },
    })
  } else {
    item.push({
      judul: 'Misi Parenting',
      state: 'pending',
      chip: status === 'at_risk' ? 'Ditunda' : 'Terkunci',
      deskripsi:
        status === 'at_risk'
          ? 'Fokus pada konsultasi profesional terlebih dahulu.'
          : 'Tersedia setelah screening berstatus aman.',
    })
  }

  if (screening.jadwal_berikutnya) {
    item.push({
      judul: 'Screening Berikutnya',
      state: 'pending',
      chip: 'Terjadwal',
      deskripsi: `Disarankan sekitar ${formatTanggal(screening.jadwal_berikutnya)}.`,
    })
  }

  return item
}

export default function ChildTimeline({ anak }) {
  const item = susunItem(anak)

  return (
    <ol className="mt-6 space-y-4" aria-label={`Perkembangan ${anak.nama}`}>
      {item.map((it, i) => (
        <TimelineItem key={it.judul} item={it} terakhir={i === item.length - 1} />
      ))}
    </ol>
  )
}