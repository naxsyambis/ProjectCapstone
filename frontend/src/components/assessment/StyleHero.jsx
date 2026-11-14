import { GAYA_ASUH } from '../../utils/parentingStyles'

export default function StyleHero({ gaya }) {
  const info = GAYA_ASUH[gaya]
  if (!info) return null

  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand-600 px-6 py-9 text-center text-white shadow-lg shadow-brand-600/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-10 size-40 rounded-full bg-white/10 blur-2xl"
      />

      <div className="relative">
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">Gaya dominan Anda</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">{info.label}</h2>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-white/90">{info.deskripsi}</p>
      </div>
    </section>
  )
}