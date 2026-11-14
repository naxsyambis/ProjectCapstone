import { useEffect, useState } from 'react'

// Mulai dari 0. Panggil start() untuk memulai hitung mundur dari `seconds`.
export function useCountdown(seconds) {
  const [left, setLeft] = useState(0)

  useEffect(() => {
    if (left <= 0) return
    const timer = setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => clearTimeout(timer)
  }, [left])

  return [left, () => setLeft(seconds)]
}