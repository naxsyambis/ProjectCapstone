import { Pencil, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function AdminTable({ kolom, baris, aksi = [], onEdit, onDelete }) {
  if (baris.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm ring-1 ring-slate-200/70">
        Tidak ada data yang cocok.
      </p>
    )
  }

  const adaAksi = aksi.length > 0

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            {kolom.map((k) => (
              <th key={k.key} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                {k.label}
              </th>
            ))}
            {adaAksi && (
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {baris.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/70">
              {kolom.map((k) => (
                <td key={k.key} className={`px-4 py-3 text-slate-700 ${k.wrap ? 'min-w-64' : 'whitespace-nowrap'}`}>
                  {k.tipe === 'badge' ? <StatusBadge value={row[k.key]} /> : row[k.key]}
                </td>
              ))}
              {adaAksi && (
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    {aksi.includes('ubah') && (
                      <button
                        type="button"
                        onClick={() => onEdit?.(row)}
                        aria-label={`Ubah data ${row.id}`}
                        className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-600"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </button>
                    )}
                    {aksi.includes('hapus') && (
                      <button
                        type="button"
                        onClick={() => onDelete?.(row)}
                        aria-label={`Hapus data ${row.id}`}
                        className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}