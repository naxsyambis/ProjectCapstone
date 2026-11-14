import { api } from './client'

/**
 * Ambil soal kuis untuk materi tertentu.
 * Route: GET /materi/{id_materi}/quiz
 * Backend returns: { id_quiz, id_materi, judul_quiz, min_skor_lulus, pertanyaan: [{ id_pertanyaan_quiz, teks_pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, urutan }] }
 * Frontend expects: { id_materi, judul_quiz, min_skor_lulus, pertanyaan: [{ id_pertanyaan_quiz, teks, opsi: [{ kode, label }] }] }
 */
export async function getQuiz(idMateri) {
  const { data } = await api.get(`/materi/${idMateri}/quiz`)

  // Simpan id_quiz di module-level untuk dipakai di submitQuiz
  _quizIdMap[Number(idMateri)] = data.id_quiz

  const pertanyaan = (data.pertanyaan || []).map((q) => {
    const opsi = []
    if (q.pilihan_a) opsi.push({ kode: 'a', label: q.pilihan_a })
    if (q.pilihan_b) opsi.push({ kode: 'b', label: q.pilihan_b })
    if (q.pilihan_c) opsi.push({ kode: 'c', label: q.pilihan_c })
    if (q.pilihan_d) opsi.push({ kode: 'd', label: q.pilihan_d })

    return {
      id_pertanyaan_quiz: q.id_pertanyaan_quiz,
      teks: q.teks_pertanyaan,
      opsi,
    }
  })

  return {
    id_materi: Number(idMateri),
    id_quiz: data.id_quiz,
    judul_quiz: data.judul_quiz || 'Kuis',
    min_skor_lulus: data.min_skor_lulus || 70,
    pertanyaan,
  }
}

// Cache id_quiz per id_materi (diisi saat getQuiz dipanggil)
const _quizIdMap = {}

/**
 * Submit jawaban kuis.
 * Route: POST /quiz/{id_quiz}/submit
 * Frontend sends: [{ id_pertanyaan_quiz, jawaban: 'a'|'b'|'c'|'d' }]
 * Backend expects: { jawaban: [{ id_pertanyaan_quiz, jawaban }], waktu_detik }
 * Backend returns: { message, hasil: { status_lulus, skor, ... } }
 */
export async function submitQuiz(idMateri, jawaban) {
  const idQuiz = _quizIdMap[Number(idMateri)]
  if (!idQuiz) throw new Error('Data kuis tidak ditemukan. Muat ulang halaman.')

  const { data } = await api.post(`/quiz/${idQuiz}/submit`, {
    jawaban: jawaban.map((j) => ({
      id_pertanyaan_quiz: j.id_pertanyaan_quiz,
      jawaban: j.jawaban,
    })),
    waktu_detik: null,
  })

  return { lulus: data.hasil?.status_lulus ?? false }
}

/**
 * Ambil hasil kuis terakhir.
 * Route: GET /quiz/history (filtered by user via token)
 * Returns null jika belum pernah mengerjakan.
 */
export async function getQuizResult(idMateri) {
  try {
    const { data } = await api.get('/quiz/history')
    if (!Array.isArray(data) || data.length === 0) return null

    // Cari hasil yang untuk materi ini
    const idQuiz = _quizIdMap[Number(idMateri)]
    const hasil = idQuiz
      ? data.find((h) => h.id_quiz === idQuiz) || data[0]
      : data[0]

    if (!hasil) return null

    return {
      lulus: hasil.status_lulus,
      skor: hasil.skor,
      min_skor_lulus: hasil.quiz?.min_skor_lulus ?? 70,
      tinjauan: [],
    }
  } catch {
    return null
  }
}
