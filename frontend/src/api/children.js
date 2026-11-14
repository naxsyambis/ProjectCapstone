import { api } from './client'
import { hitungUsiaBulan } from '../utils/age'

/**
 * Adapter: ubah field backend (id_anak) → field frontend (id_bayi).
 * Backend: { id_anak, nama, jenis_kelamin, tanggal_lahir, catatan, usia_bulan, ... }
 * Frontend expects: { id_bayi, nama, jenis_kelamin, tanggal_lahir, catatan, usia_bulan, screening }
 */
function toFrontend(a) {
  return {
    id_bayi: a.id_anak,
    nama: a.nama,
    jenis_kelamin: a.jenis_kelamin,
    tanggal_lahir: a.tanggal_lahir,
    catatan: a.catatan || '',
    usia_bulan: a.usia_bulan ?? hitungUsiaBulan(a.tanggal_lahir),
    screening: a.screening ?? {
      status: 'belum_pernah',
      terakhir: null,
      jadwal_berikutnya: null,
      status_risiko: null,
    },
  }
}

export async function getChildren() {
  const { data } = await api.get('/anak')
  return (Array.isArray(data) ? data : []).map(toFrontend)
}

export async function getChild(idBayi) {
  const { data } = await api.get(`/anak/${idBayi}`)
  return toFrontend(data)
}

export async function createChild(payload) {
  const { data } = await api.post('/anak', {
    nama: payload.nama,
    jenis_kelamin: payload.jenis_kelamin,
    tanggal_lahir: payload.tanggal_lahir,
    catatan: payload.catatan || null,
  })
  // Backend may return { message, data } or the object directly
  const child = data.data ?? data
  return toFrontend(child)
}

export async function updateChild(idBayi, payload) {
  const { data } = await api.put(`/anak/${idBayi}`, {
    nama: payload.nama,
    jenis_kelamin: payload.jenis_kelamin,
    tanggal_lahir: payload.tanggal_lahir,
    catatan: payload.catatan || null,
  })
  const child = data.data ?? data
  return toFrontend(child)
}

export async function deleteChild(idBayi) {
  await api.delete(`/anak/${idBayi}`)
}
