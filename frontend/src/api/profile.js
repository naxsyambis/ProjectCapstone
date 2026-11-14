import { api } from './client'

/**
 * Ambil data profil tambahan user (selain nama/email yang sudah ada di AuthProvider).
 * Route: GET /me
 * Backend returns user object: { id_user, nama_lengkap, nama_panggilan, email, nomor_hp, role, foto_url, profil_lengkap, created_at }
 */
export async function getProfile() {
  const { data } = await api.get('/me')
  return {
    nomor_hp: data.nomor_hp || '',
    usia_orang_tua: null,
    tanggal_daftar: data.created_at,
  }
}

/**
 * Update profil user.
 * Route: PUT /profil
 * Backend expects: { nama_lengkap, nama_panggilan, nomor_hp, ... }
 */
export async function updateProfile(payload) {
  const { data } = await api.put('/profil', {
    nama_lengkap: payload.nama_lengkap,
    nama_panggilan: payload.nama_panggilan,
    nomor_hp: payload.nomor_hp || null,
  })
  return {
    nama_lengkap: data.user?.nama_lengkap ?? data.nama_lengkap ?? payload.nama_lengkap,
    nama_panggilan: data.user?.nama_panggilan ?? data.nama_panggilan ?? payload.nama_panggilan,
  }
}

/**
 * Upload foto profil.
 * Route: POST /profil/foto (multipart/form-data, field "foto")
 * Backend returns: { foto_url }
 */
export async function uploadProfilePhoto(file) {
  const form = new FormData()
  form.append('foto', file)
  const { data } = await api.post('/profil/foto', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return { foto_url: data.foto_url }
}
