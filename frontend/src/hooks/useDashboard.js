import { useEffect, useState } from 'react'
import { getDashboard } from '../api/dashboard'
import { useAuth } from './useAuth'

// Cache memori untuk dashboard agar navigasi instan
let dashboardCache = null

export function useDashboard() {
  const { hasAssessment } = useAuth()
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({
    data: dashboardCache,
    error: '',
  })

  const key = `${hasAssessment}:${attempt}`

  useEffect(() => {
    let cancelled = false

    getDashboard({ hasAssessment })
      .then((data) => {
        dashboardCache = data
        if (!cancelled) setResult({ data, error: '' })
      })
      .catch((err) => {
        if (!cancelled) {
          setResult((prev) => ({
            data: prev.data,
            error: err.message || 'Gagal memuat dasbor. Silakan coba lagi.',
          }))
        }
      })

    return () => {
      cancelled = true
    }
  }, [key, hasAssessment])

  // Hanya loading saat data benar-benar belum ada di memori
  const loading = result.data === null && result.error === ''

  return {
    data: result.data,
    error: result.error,
    loading,
    retry: () => {
      dashboardCache = null
      setAttempt((n) => n + 1)
    },
  }
}
