import { ROUTES } from './constants'

export const materiPath = (id) => `${ROUTES.MATERI}/${id}`
export const kuisPath = (id) => `${ROUTES.MATERI}/${id}/kuis`
export const hasilKuisPath = (id) => `${ROUTES.MATERI}/${id}/kuis/hasil`

export const screeningPath = (idBayi) => `${ROUTES.SCREENING}/${idBayi}`
export const hasilScreeningPath = (idBayi) => `${ROUTES.SCREENING}/${idBayi}/hasil`
export const misiPath = (idBayi) => (idBayi ? `${ROUTES.MISSION}?anak=${idBayi}` : ROUTES.MISSION)

export const anakPath = (id) => `${ROUTES.CHILDREN}/${id}`