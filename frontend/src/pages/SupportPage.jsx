import { CircleAlert, Mail } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'
import FaqList from '../components/support/FaqList'
import Button from '../components/ui/Button'
import { FAQ } from '../content/legal'
import { SUPPORT_EMAIL } from '../utils/contact'

export default function SupportPage() {
  return (
    <PageLayout>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Dukungan</h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        Temukan jawaban cepat di bawah ini, atau hubungi kami jika belum terjawab.
      </p>

      <section aria-label="Kondisi darurat" className="mt-6 flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">
        <CircleAlert size={26} className="mt-0.5 shrink-0 text-red-700" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-red-800">Kondisi darurat</h2>
          <p className="mt-1 leading-relaxed text-red-800">
            Jika anak dalam kondisi darurat atau Anda khawatir dengan keselamatannya, segera ke IGD terdekat atau
            hubungi nomor darurat 112. Aplikasi ini tidak dapat menangani keadaan darurat.
          </p>
        </div>
      </section>

      <h2 className="mt-8 text-xl font-bold text-slate-900">Pertanyaan yang sering diajukan</h2>
      <div className="mt-4">
        <FaqList items={FAQ} />
      </div>

      <section className="mt-8 rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70">
        <h2 className="text-xl font-bold text-slate-900">Masih butuh bantuan?</h2>
        {SUPPORT_EMAIL ? (
          <>
            <p className="mt-2 text-slate-600">Kirim pertanyaan Anda melalui email.</p>
            <Button
              as="a"
              href={`mailto:${SUPPORT_EMAIL}`}
              icon={Mail}
              className="mt-5 w-full sm:w-auto sm:px-10"
            >
              {SUPPORT_EMAIL}
            </Button>
          </>
        ) : (
          <p className="mt-2 text-slate-500">
            Kontak dukungan belum tersedia.
            {import.meta.env.DEV && ' (Isi VITE_SUPPORT_EMAIL di file .env lalu jalankan ulang npm run dev.)'}
          </p>
        )}
      </section>
    </PageLayout>
  )
}