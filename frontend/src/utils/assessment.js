export const BUTIR_PER_HALAMAN = 4
const DETIK_PER_BUTIR = 5

export function hitungEstimasiMenit(total) {
  return Math.max(1, Math.ceil((total * DETIK_PER_BUTIR) / 60))
}

// 5, 5 -> "5"   |   5, 8 -> "5–8"
export function formatRentang(awal, akhir) {
  return awal === akhir ? `${awal}` : `${awal}–${akhir}`
}

// Kelompok (tab) sesuai urutan kemunculan di daftar soal.
// mulai = indeks butir pertama kelompok itu, ids = id semua butirnya.
export function susunKelompok(pertanyaan) {
  const peta = new Map()

  pertanyaan.forEach((q, i) => {
    const nama = q.kelompok || 'Umum'
    if (!peta.has(nama)) peta.set(nama, { nama, mulai: i, ids: [] })
    peta.get(nama).ids.push(q.id_pertanyaan)
  })

  return [...peta.values()]
}