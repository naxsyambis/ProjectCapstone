import { SUPPORT_EMAIL } from '../../utils/contact'

export default function LegalDocument({ judul, pembaruan, pengantar, bagian }) {
  return (
    <article>
      {import.meta.env.DEV && (
        <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          DRAF (hanya tampil saat pengembangan): isi dokumen ini harus ditinjau tim sebelum dipublikasikan. Lihat
          catatan di bagian atas content/legal.js.
        </p>
      )}

      <h1 className="text-4xl font-bold tracking-tight text-slate-900">{judul}</h1>
      <p className="mt-2 text-sm text-slate-500">Terakhir diperbarui: {pembaruan}</p>
      <p className="mt-5 text-[17px] leading-relaxed text-slate-700">{pengantar}</p>

      <nav aria-label="Daftar isi" className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Isi</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5">
          {bagian.map((b) => (
            <li key={b.id}>
              <a href={`#${b.id}`} className="text-brand-600 hover:underline">
                {b.judul}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-8">
        {bagian.map((b, i) => (
          <section key={b.id} id={b.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900">
              {i + 1}. {b.judul}
            </h2>
            {b.paragraf?.map((p) => (
              <p key={p} className="mt-3 text-[17px] leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
            {b.daftar && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-slate-700">
                {b.daftar.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
            {b.kontak &&
              (SUPPORT_EMAIL ? (
                <p className="mt-3">
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-brand-600 hover:underline">
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              ) : (
                <p className="mt-3 text-slate-500">Alamat kontak akan segera tersedia.</p>
              ))}
          </section>
        ))}
      </div>
    </article>
  )
}