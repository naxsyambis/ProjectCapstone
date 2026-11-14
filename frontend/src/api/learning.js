import { api } from './client'

/**
 * Ambil jalur belajar (daftar materi) user.
 * Route: GET /materi
 * Backend returns: { rekomendasi_aktif, total, data: [{ id_materi, judul, deskripsi, kategori_target, tipe_konten, durasi_menit, progress: [...], quiz }] }
 */
export async function getLearningPath() {
  const { data } = await api.get('/materi')
  const list = data.data || []

  const minggu = list.map((m, i) => {
    const prog = Array.isArray(m.progress) ? m.progress[0] : null
    const persen = prog?.persentase ?? 0
    const status =
      persen >= 100
        ? 'selesai'
        : persen > 0
          ? 'berjalan'
          : i === 0
            ? 'berjalan'
            : 'terkunci'

    return {
      id_materi: m.id_materi,
      urutan: i + 1,
      judul: m.judul,
      subjudul: m.deskripsi || '',
      status,
    }
  })

  const selesai = minggu.filter((m) => m.status === 'selesai').length
  const total = minggu.length

  return {
    jalur: {
      kategori_target: data.rekomendasi_aktif || 'umum',
      judul: '',
      gaya_dominan: '',
    },
    progres: {
      selesai,
      total,
      persen: total > 0 ? Math.round((selesai / total) * 100) : 0,
    },
    minggu,
  }
}

/**
 * Ambil detail materi tertentu.
 * Route: GET /materi/{id}
 * Backend returns materi object with progress and quiz relations.
 */
export async function getMateri(id) {
  const { data } = await api.get(`/materi/${id}`)
  const prog = Array.isArray(data.progress) ? data.progress[0] : null
  const persen = prog?.persentase ?? 0

  return {
    id_materi: data.id_materi,
    minggu: data.urutan ?? 1,
    judul: data.judul,
    subjudul: data.deskripsi || '',
    kategori_label: data.kategori_target || '',
    penulis: { nama: data.penulis || '', peran: '' },
    gambar_url: data.gambar_url || null,
    durasi_menit: data.durasi_menit || 0,
    diverifikasi_oleh: data.diverifikasi_oleh || null,
    url_video: data.url_video || null,
    ringkasan: data.ringkasan || '',
    poin_penting: data.poin_penting || [],
    pdf: data.url_pdf
      ? { nama: data.judul, ukuran_byte: null, url: data.url_pdf }
      : null,
    isi_artikel: data.isi_artikel || null,
    referensi: data.referensi ? [data.referensi] : [],
    status_progress: persen >= 100 ? 'selesai' : persen > 0 ? 'sedang_belajar' : 'belum_mulai',
    quiz: {
      jumlah_soal: data.quiz?.pertanyaan?.length ?? 5,
      lulus: null,
    },
  }
}

/**
 * Tandai materi sebagai selesai (progress 100%).
 * Route: POST /materi/{id}/progress
 */
export async function markMateriDone(id) {
  await api.post(`/materi/${id}/progress`, { persentase: 100 })
}
