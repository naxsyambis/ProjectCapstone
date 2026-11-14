export function formatUkuran(byte) {
  if (!Number.isFinite(byte) || byte <= 0) return ''
  if (byte < 1024 * 1024) return `${Math.max(1, Math.round(byte / 1024))} KB`
  return `${(byte / (1024 * 1024)).toFixed(1)} MB`
}

export function formatTanggal(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatBulanTahun(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}