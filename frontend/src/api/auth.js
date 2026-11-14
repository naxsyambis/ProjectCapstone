import { api } from './client'

/**
 * Login. Backend returns { message, user, token }.
 * We store the token and return { user, has_assessment } to match AuthProvider.applySession().
 */
export async function login({ email, password }) {
  const { data } = await api.post('/login', { email, password })
  localStorage.setItem('vidya_token', data.token)
  return {
    user: data.user,
    has_assessment: data.has_assessment ?? false,
  }
}

/**
 * Register. Backend returns { message, user, token }.
 */
export async function register(payload) {
  const { data } = await api.post('/register', payload)
  localStorage.setItem('vidya_token', data.token)
  return {
    user: data.user,
    has_assessment: false,
  }
}

/**
 * Selesaikan onboarding (isi nama panggilan, dll).
 */
export async function completeOnboarding(payload) {
  const { data } = await api.put('/profil/onboarding', payload)
  return { user: data.user ?? data }
}

/**
 * Logout — hapus token dari server lalu dari localStorage.
 */
export async function logout() {
  try {
    await api.post('/logout')
  } finally {
    localStorage.removeItem('vidya_token')
  }
}
