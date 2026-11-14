import { api } from './client'

const SKALA = [
  { nilai: 0, label: 'Tidak sama sekali' },
  { nilai: 1, label: 'Agak' },
  { nilai: 2, label: 'Sangat' },
]

/**
 * Ambil pertanyaan screening untuk anak.
 * Route backend: GET /anak/{id_anak}/screening/pertanyaan
 * Backend returns: { anak, usia_bulan, instrumen_digunakan, total_pertanyaan, pertanyaan: [...] }
 * pertanyaan item: { id_pertanyaan_screening, instrumen, nomor_item, subscale, teks_pertanyaan }
 */
export async function getScreeningQuestions(idBayi) {
  const { data } = await api.get(`/anak/${idBayi}/screening/pertanyaan`)
  return {
    bayi: {
      id_bayi: idBayi,
      nama: data.anak?.nama || '',
    },
    usia_bulan: data.usia_bulan,
    instrumen: data.instrumen_digunakan,
    skala: SKALA,
    pertanyaan: (data.pertanyaan || []).map((p) => ({
      id_pertanyaan_screening: p.id_pertanyaan_screening,
      nomor_item: p.nomor_item,
      subscale_label: p.subscale || '',
      teks: p.teks_pertanyaan,
    })),
  }
}

/**
 * Submit jawaban screening.
 * Route backend: POST /anak/{id_anak}/screening/submit
 * Backend expects: { jawaban: [{ id_pertanyaan_screening, skor_item }] }
 */
export async function submitScreening(idBayi, jawaban) {
  const { data } = await api.post(`/anak/${idBayi}/screening/submit`, { jawaban })
  return { id_screening: data.screening?.id_screening }
}

/**
 * Ambil hasil screening terakhir untuk anak.
 * Route backend: GET /anak/{id_anak}/screening/history
 * Backend returns array descending by date.
 */
export async function getScreeningResult(idBayi) {
  try {
    const { data } = await api.get(`/anak/${idBayi}/screening/history`)
    if (!Array.isArray(data) || data.length === 0) return null
    const latest = data[0]

    const jadwal = latest.jadwal_screening_berikutnya ?? null

    return {
      id_screening: latest.id_screening,
      tanggal_screening: latest.tanggal_screening,
      jadwal_screening_berikutnya: jadwal,
      bayi: {
        id_bayi: idBayi,
        nama: latest.anak?.nama || '',
        usia_bulan: latest.usia_anak_saat_screening,
      },
      instrumen: latest.instrumen_digunakan,
      status_risiko: latest.status_risiko,
      rekomendasi: latest.rekomendasi,
      wawasan: { kekuatan: [], area_fokus: [] },
      langkah_awal: [],
    }
  } catch {
    return null
  }
}
