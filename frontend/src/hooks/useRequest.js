import { useEffect, useState } from 'react'

// Cache in-memory persisten di memori browser
const memoryCache = new Map()

export function invalidateCache(key) {
  if (key) {
    memoryCache.delete(key)
  } else {
    memoryCache.clear()
  }
}

export function useRequest(requestFn, explicitKey = null) {
  // Bangun key unik: jika tidak diberikan nama/key, gunakan representasi string fungsi
  const resolvedKey = explicitKey || requestFn.name || String(requestFn).slice(0, 100)

  const [attempt, setAttempt] = useState(0)
  
  // Ambil data langsung dari cache jika sudah pernah diakses sebelumnya
  const cachedData = memoryCache.get(resolvedKey)
  
  const [result, setResult] = useState({
    data: cachedData !== undefined ? cachedData : null,
    error: '',
  })

  useEffect(() => {
    let cancelled = false

    requestFn()
      .then((data) => {
        memoryCache.set(resolvedKey, data)
        if (!cancelled) {
          setResult({ data, error: '' })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setResult((prev) => ({
            data: prev.data,
            error: err.message || 'Gagal memuat data. Silakan coba lagi.',
          }))
        }
      })

    return () => {
      cancelled = true
    }
  }, [requestFn, attempt, resolvedKey])

  // Hanya bernilai true jika data BELUM pernah ada sama sekali di memori
  const loading = result.data === null && result.error === ''

  return {
    data: result.data,
    error: result.error,
    loading,
    retry: () => {
      memoryCache.delete(resolvedKey)
      setAttempt((n) => n + 1)
    },
  }
}
