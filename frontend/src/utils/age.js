export function tanggalHariIni() {
  const d = new Date()
  const dua = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${dua(d.getMonth() + 1)}-${dua(d.getDate())}`
}

// "2025-03-04" -> usia dalam bulan penuh (null kalau tanggal belum lengkap)
export function hitungUsiaBulan(tanggalLahir, hariIni = new Date()) {
  const [tahun, bulan, tanggal] = String(tanggalLahir).split('-').map(Number)
  if (!tahun || !bulan || !tanggal) return null

  let selisih = (hariIni.getFullYear() - tahun) * 12 + (hariIni.getMonth() + 1 - bulan)
  if (hariIni.getDate() < tanggal) selisih -= 1
  return selisih
}

export function formatUsia(bulan) {
  if (bulan === null || bulan < 0) return ''
  const tahun = Math.floor(bulan / 12)
  const sisa = bulan % 12
  if (tahun === 0) return `${sisa} bulan`
  return sisa === 0 ? `${tahun} tahun` : `${tahun} tahun ${sisa} bulan`
}

export function tahapUsia(bulan) {
  if (bulan === null || bulan < 0) return ''
  if (bulan < 12) return 'Bayi'
  if (bulan < 36) return 'Balita'
  if (bulan < 72) return 'Prasekolah'
  return 'Usia sekolah'
}

// 14 -> "14 Bulan"   |   40 -> "3 Tahun"
export function formatUsiaRingkas(bulan) {
  if (bulan === null || bulan < 0) return ''
  return bulan < 24 ? `${bulan} Bulan` : `${Math.floor(bulan / 12)} Tahun`
}