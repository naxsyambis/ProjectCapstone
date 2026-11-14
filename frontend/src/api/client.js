import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: { Accept: 'application/json' },
})

// Inject token dari localStorage ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vidya_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Tangani error global: 401 = hapus token (sesi habis)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('vidya_token')
    }
    // Ambil pesan error yang bermakna untuk ditampilkan ke user
    const msg =
      err.response?.data?.message ||
      (err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : null) ||
      err.message ||
      'Terjadi kesalahan. Coba lagi.'
    const error = new Error(msg)
    error.status = err.response?.status
    error.fieldErrors = err.response?.data?.errors ?? null
    return Promise.reject(error)
  },
)
