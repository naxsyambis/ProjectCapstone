import { api } from './client'

/**
 * Ambil misi parenting untuk anak.
 * Route: GET /anak/{id_anak}/missions
 * Backend returns: { anak, total_misi, data: [{ id_misi, judul_misi, deskripsi, poin, usia_min_bulan, usia_maks_bulan, progress: [...] }] }
 */
export async function getMissions(idBayi) {
  const { data } = await api.get(`/anak/${idBayi}/missions`)
  const anak = data.anak || {}

  const misiHariIni = (data.data || []).map((m) => {
    const prog = Array.isArray(m.progress) ? m.progress[0] : null
    let status = 'belum_mulai'
    if (prog) {
      status = prog.tanggal_selesai ? 'selesai' : 'sedang_berjalan'
    }
    return {
      id_misi: m.id_misi,
      judul: m.judul_misi,
      deskripsi: m.deskripsi || '',
      ikon: m.sumber_aktivitas || 'default',
      poin: m.poin || 0,
      status,
    }
  })

  const selesai = misiHariIni.filter((m) => m.status === 'selesai').length

  return {
    bayi: { id_bayi: idBayi, nama: anak.nama || '' },
    status_screening: 'aman', // missions page assumes screening done
    poin_total: selesai * 50,
    minggu_ini: [],
    misi_hari_ini: misiHariIni,
    lencana: [],
  }
}

/**
 * Update status misi (mulai atau selesai).
 * Route: POST /anak/{id_anak}/missions/{id_misi}/start
 *        POST /anak/{id_anak}/missions/{id_misi}/complete
 */
export async function updateMission(idBayi, idMisi, aksi) {
  if (aksi === 'mulai') {
    await api.post(`/anak/${idBayi}/missions/${idMisi}/start`)
  } else if (aksi === 'selesai') {
    await api.post(`/anak/${idBayi}/missions/${idMisi}/complete`, { catatan: null })
  }
  return {}
}
