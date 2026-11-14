export default function ErrorState({ message = 'Terjadi kesalahan.', onRetry }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-semibold text-red-700 underline"
        >
          Coba lagi
        </button>
      )}
    </div>
  )
}