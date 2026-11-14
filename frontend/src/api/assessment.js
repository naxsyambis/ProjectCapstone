import { api } from './client'

const SKALA = [
  { nilai: 1, label: 'Tidak pernah', singkat: 'Tdk Pernah' },
  { nilai: 2, label: 'Jarang', singkat: 'Jarang' },
  { nilai: 3, label: 'Kadang-kadang', singkat: 'Kadang' },
  { nilai: 4, label: 'Sering', singkat: 'Sering' },
  { nilai: 5, label: 'Selalu', singkat: 'Selalu' },
]

// Backend gaya_asuh values → label tampilan frontend
const KELOMPOK_MAP = {
  autoritatif: 'Demokratis',
  otoriter: 'Otoriter',
  permisif: 'Permisif',
}

/**
 * Ambil 32 pertanyaan PSDQ-SF dari backend.
 * Backend returns: { total, pertanyaan: [{ id_pertanyaan_assessment, nomor_item, teks_pertanyaan, gaya_asuh, dimensi }] }
 * Frontend expects: { skala, pertanyaan: [{ id_pertanyaan, nomor_item, kelompok, sublabel, teks }] }
 */
export async function getQuestions() {
  const { data } = await api.get('/assessment/pertanyaan')
  const pertanyaan = (data.pertanyaan || []).map((p) => ({
    id_pertanyaan: p.id_pertanyaan_assessment,
    nomor_item: p.nomor_item,
    kelompok: KELOMPOK_MAP[p.gaya_asuh] || p.gaya_asuh,
    sublabel: p.dimensi || '',
    teks: p.teks_pertanyaan,
  }))
  return { skala: SKALA, pertanyaan }
}

/**
 * Submit jawaban asesmen.
 * Frontend sends: [{ id_pertanyaan, skor_item }]
 * Backend expects: { jawaban: [{ id_pertanyaan_assessment, skor_item }] }
 */
export async function submitAssessment(jawaban) {
  if (!Array.isArray(jawaban) || jawaban.length === 0) {
    throw new Error('Jawaban tidak boleh kosong.')
  }
  const payload = jawaban.map((j) => ({
    id_pertanyaan_assessment: j.id_pertanyaan,
    skor_item: j.skor_item,
  }))
  const { data } = await api.post('/assessment/submit', { jawaban: payload })
  return { id_assessment: data.assessment?.id_assessment }
}

/**
 * Ambil hasil asesmen terakhir user.
 * Backend returns array dari /assessment/history (descending by date).
 * Frontend expects: { id_assessment, tanggal_assessment, gaya_dominan, rincian: [...], wawasan: {...} }
 */
export async function getLatestResult() {
  try {
    const { data } = await api.get('/assessment/history')
    if (!Array.isArray(data) || data.length === 0) return null
    const latest = data[0]

    const skorAut = latest.skor_autoritatif ?? 0
    const skorOto = latest.skor_otoriter ?? 0
    const skorPer = latest.skor_permisif ?? 0
    const total = skorAut + skorOto + skorPer

    return {
      id_assessment: latest.id_assessment,
      tanggal_assessment: latest.tanggal_assessment,
      gaya_dominan: latest.gaya_dominan,
      rincian: [
        { gaya: 'autoritatif', persentase: total > 0 ? Math.round((skorAut / total) * 100) : 0 },
        { gaya: 'otoriter', persentase: total > 0 ? Math.round((skorOto / total) * 100) : 0 },
        { gaya: 'permisif', persentase: total > 0 ? Math.round((skorPer / total) * 100) : 0 },
      ],
      wawasan: {
        kekuatan: latest.kekuatan ? [latest.kekuatan] : [],
        area_fokus: latest.area_fokus ? [latest.area_fokus] : [],
      },
    }
  } catch {
    return null
  }
}
