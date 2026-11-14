import { ChevronLeft, ChevronRight } from 'lucide-react'

const tombol =
  'inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'

export default function Pagination({ page, lastPage, total, onPageChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
      <p>
        {total} data • Halaman {page} dari {lastPage}
      </p>
      <div className="flex gap-2">
        <button type="button" className={tombol} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft size={16} aria-hidden="true" />
          Sebelumnya
        </button>
        <button type="button" className={tombol} disabled={page >= lastPage} onClick={() => onPageChange(page + 1)}>
          Berikutnya
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}