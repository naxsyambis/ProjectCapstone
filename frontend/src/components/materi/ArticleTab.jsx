import { FlaskConical } from 'lucide-react'
import Avatar from '../ui/Avatar'
import ArticleBody from './ArticleBody'

export default function ArticleTab({ materi }) {
  const { gambar_url, kategori_label, subjudul, penulis, durasi_menit, isi_artikel, referensi } = materi

  return (
    <article>
      {gambar_url && <img src={gambar_url} alt="" className="mb-5 aspect-video w-full rounded-3xl object-cover" />}

      {kategori_label && (
        <p className="text-xs font-bold uppercase tracking-wider text-brand-600">{kategori_label}</p>
      )}
      {subjudul && <p className="mt-2 text-xl leading-snug text-slate-600">{subjudul}</p>}

      {penulis && (
        <div className="mt-5 flex items-center gap-3">
          <Avatar name={penulis.nama} size={44} />
          <div className="text-sm">
            <p className="font-semibold text-slate-900">{penulis.nama}</p>
            <p className="text-slate-500">
              {penulis.peran}
              {durasi_menit > 0 && ` • ${durasi_menit} menit baca`}
            </p>
          </div>
        </div>
      )}

      <ArticleBody markdown={isi_artikel} />

      {referensi?.length > 0 && (
        <section className="mt-10 rounded-2xl bg-slate-100/80 p-5" aria-labelledby="referensi">
          <h2 id="referensi" className="flex items-center gap-2 font-semibold text-slate-900">
            <FlaskConical size={18} aria-hidden="true" />
            Referensi Ilmiah
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            {referensi.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>
      )}

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        Konten ini bersifat edukasi umum dan tidak menggantikan konsultasi dengan psikolog atau tenaga kesehatan.
      </p>
    </article>
  )
}