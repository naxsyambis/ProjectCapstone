const TONE = {
  aktif: 'green', aman: 'green', terbit: 'green', autoritatif: 'green',
  draf: 'amber', otoriter: 'amber', permisif: 'amber',
  at_risk: 'red', nonaktif: 'red',
  admin: 'blue', video: 'blue', BPSC: 'blue', PPSC: 'blue',
}

const LABEL = { at_risk: 'Perlu perhatian', orang_tua: 'Orang tua' }

const WARNA = {
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-800',
  red: 'bg-red-50 text-red-700',
  blue: 'bg-brand-50 text-brand-700',
  slate: 'bg-slate-100 text-slate-600',
}

function rapikan(value) {
  const teks = String(value).replace(/_/g, ' ')
  return teks.charAt(0).toUpperCase() + teks.slice(1)
}

export default function StatusBadge({ value }) {
  const warna = WARNA[TONE[value] ?? 'slate']

  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${warna}`}>
      {LABEL[value] ?? rapikan(value)}
    </span>
  )
}