import { ArrowRight, Stethoscope } from 'lucide-react'
import Button from '../ui/Button'

// Alamat pencarian dari .env (SOP: tidak ada URL yang ditulis langsung di kode)
const SEARCH_URL = import.meta.env.VITE_PSYCHOLOGIST_SEARCH_URL
const URL_VALID = typeof SEARCH_URL === 'string' && /^https:\/\//.test(SEARCH_URL)

const ALTERNATIF = [
  { judul: 'Puskesmas atau klinik terdekat', isi: 'Tanyakan layanan tumbuh kembang anak.' },
  { judul: 'Rumah sakit', isi: 'Cari poli tumbuh kembang atau psikologi anak.' },
  { judul: 'Dokter anak', isi: 'Minta surat rujukan ke psikolog atau spesialis anak.' },
]

export default function ReferralCard() {
  return (
    <section className="rounded-2xl border border-l-4 border-red-100 border-l-red-700 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
        <Stethoscope size={22} className="text-red-700" aria-hidden="true" />
        Konsultasi Profesional
      </h2>
      <p className="mt-2 text-[17px] leading-relaxed text-slate-600">
        Kami menyarankan Anda berkonsultasi dengan psikolog anak atau dokter spesialis anak untuk membahas hasil ini dan
        menyusun rencana pendampingan yang suportif.
      </p>

      {URL_VALID && (
        <Button as="a" href={SEARCH_URL} target="_blank" rel="noopener noreferrer" variant="danger" pill icon={ArrowRight} className="mt-5 w-full">
          Cari Psikolog Anak Terdekat
        </Button>
      )}

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Jalur lain</h3>
      <ul className="mt-2 space-y-2">
        {ALTERNATIF.map((a) => (
          <li key={a.judul} className="text-[15px] leading-snug text-slate-600">
            <span className="font-semibold text-slate-800">{a.judul}:</span> {a.isi}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm leading-relaxed text-slate-500">
        Pastikan psikolog memiliki izin praktik, dan bawa hasil screening ini. Jika kondisi anak mendesak atau Anda
        khawatir dengan keselamatannya, segera ke IGD terdekat.
      </p>
    </section>
  )
}