import { getChildren } from './children'
import { getLatestResult } from './assessment'
import { getLearningPath } from './learning'
import { getMissions } from './missions'

// MOCK. NANTI: satu panggilan GET /laporan. Backend yang menghitung semuanya
// dan parameter hasAssessment dihapus (server sudah tahu dari pengguna yang login).
export async function getReport({ hasAssessment }) {
  const [jalur, assessment, anak] = await Promise.all([
    getLearningPath(),
    hasAssessment ? getLatestResult() : Promise.resolve(null),
    getChildren(),
  ])
  const papan = await Promise.all(anak.map((a) => getMissions(a.id_bayi)))

  const fase = jalur.minggu.find((m) => m.status === 'berjalan')

  const semuaMisi = papan.flatMap((p) =>
    (p.misi_hari_ini ?? []).map((m) => ({
      id: `${p.bayi.id_bayi}-${m.id_misi}`,
      judul: m.judul,
      selesai: m.status === 'selesai',
      anak: p.bayi.nama,
    })),
  )

  return {
    progres_belajar: hasAssessment
      ? { persen: jalur.progres.persen, fase: fase ? `Minggu ${fase.urutan}: ${fase.judul}` : 'Semua minggu selesai' }
      : null,
    gaya_dominan: assessment?.gaya_dominan ?? null,
    misi: {
      selesai: semuaMisi.filter((m) => m.selesai).length,
      total: semuaMisi.length,
      item: semuaMisi.slice(0, 4),
    },
    anak: anak.map((a, i) => ({
      id_bayi: a.id_bayi,
      nama: a.nama,
      usia_bulan: a.usia_bulan,
      screening: a.screening,
      status_screening: papan[i].status_screening,
      misi: papan[i].misi_hari_ini
        ? {
            selesai: papan[i].misi_hari_ini.filter((m) => m.status === 'selesai').length,
            total: papan[i].misi_hari_ini.length,
          }
        : null,
    })),
    lencana: (papan.find((p) => p.lencana)?.lencana ?? []).slice(0, 3),
  }
}