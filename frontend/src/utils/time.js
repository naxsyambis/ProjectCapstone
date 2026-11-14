const dua = (n) => String(n).padStart(2, '0')
const awalHari = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

export function formatWaktuRelatif(iso, sekarang = new Date()) {
  const tanggal = new Date(iso)
  if (Number.isNaN(tanggal.getTime())) return ''

  // Dibandingkan per hari kalender, bukan per 24 jam
  const selisihHari = Math.round((awalHari(sekarang) - awalHari(tanggal)) / 86400000)
  const jam = `${dua(tanggal.getHours())}:${dua(tanggal.getMinutes())}`

  if (selisihHari <= 0) return `Hari ini pada jam ${jam}`
  if (selisihHari === 1) return `Kemarin pada jam ${jam}`
  if (selisihHari < 7) return `${selisihHari} hari yang lalu`
  return tanggal.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}