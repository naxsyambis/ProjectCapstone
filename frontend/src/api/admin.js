import { api } from './client'

export async function getAdminStats() {
  const { data } = await api.get('/admin/stats')
  return data
}

export async function getAdminUsers() {
  const { data } = await api.get('/admin/users')
  return data
}

export async function deleteAdminUser(id) {
  const { data } = await api.delete(`/admin/users/${id}`)
  return data
}

export async function getAdminMateri() {
  const { data } = await api.get('/materi')
  return data.data || []
}

export async function deleteAdminMateri(id) {
  const { data } = await api.delete(`/admin/materi/${id}`)
  return data
}

export async function getAdminSoalAssessment() {
  const { data } = await api.get('/admin/pertanyaan-assessment')
  return data
}

export async function getAdminSoalScreening() {
  const { data } = await api.get('/admin/pertanyaan-screening')
  return data
}

export async function getAdminHasilAssessment() {
  const { data } = await api.get('/admin/hasil-assessment')
  return data
}

export async function getAdminHasilScreening() {
  const { data } = await api.get('/admin/hasil-screening')
  return data
}

