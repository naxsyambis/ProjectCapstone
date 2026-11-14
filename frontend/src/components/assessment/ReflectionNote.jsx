import { Leaf } from 'lucide-react'

export default function ReflectionNote() {
  return (
    <aside className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
        <Leaf size={22} aria-hidden="true" />
      </span>
      <p className="text-sm leading-relaxed text-slate-600">
        <strong className="font-semibold text-slate-900">Ruang Refleksi Tenang:</strong> Tidak ada jawaban benar atau
        salah. Kejujuran Anda membantu memetakan profil pola asuh yang paling otentik.
      </p>
    </aside>
  )
}