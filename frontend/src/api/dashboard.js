import { api } from './client'
import { getLatestResult } from './assessment'

/**
 * Ambil data dashboard user.
 * Tidak ada endpoint /dashboard di backend, jadi kita compose dari beberapa endpoint.
 * getDashboard({ hasAssessment }) — parameter hasAssessment dari AuthProvider.
 */
export async function getDashboard({ hasAssessment } = {}) {
  try {
    // Jika user belum pernah assessment, kembalikan state kosong
    if (!hasAssessment) {
      return {
        gaya_dominan: null,
        progres_belajar: null,
        screening: { status: 'belum_pernah', judul: null, sisa_hari: null },
        misi_mingguan: { selesai: 0, total: 5 },
        misi_mendatang: [],
        aktivitas_terbaru: [],
      }
    }

    // Fetch assessment result dan materi progress secara paralel
    const [assessmentResult, materiRes] = await Promise.all([
      getLatestResult().catch(() => null),
      api.get('/materi').catch(() => ({ data: { data: [] } })),
    ])

    const materiList = materiRes.data?.data || []
    const totalMateri = materiList.length
    const selesaiMateri = materiList.filter((m) => {
      const prog = Array.isArray(m.progress) ? m.progress[0] : null
      return (prog?.persentase ?? 0) >= 100
    }).length
    const persenBelajar =
      totalMateri > 0 ? Math.round((selesaiMateri / totalMateri) * 100) : 0

    // Cari materi terakhir yang sedang/pernah dipelajari
    const materiTerakhir = materiList.find((m) => {
      const prog = Array.isArray(m.progress) ? m.progress[0] : null
      return prog && (prog.persentase ?? 0) > 0 && (prog.persentase ?? 0) < 100
    })

    return {
      gaya_dominan: assessmentResult?.gaya_dominan ?? null,
      progres_belajar:
        totalMateri > 0
          ? {
              persen: persenBelajar,
              modul_terakhir: materiTerakhir?.judul ?? null,
            }
          : null,
      screening: { status: 'belum_pernah', judul: null, sisa_hari: null },
      misi_mingguan: { selesai: 0, total: 5 },
      misi_mendatang: [],
      aktivitas_terbaru: [],
    }
  } catch {
    return {
      gaya_dominan: null,
      progres_belajar: null,
      screening: { status: 'belum_pernah', judul: null, sisa_hari: null },
      misi_mingguan: { selesai: 0, total: 5 },
      misi_mendatang: [],
      aktivitas_terbaru: [],
    }
  }
}
