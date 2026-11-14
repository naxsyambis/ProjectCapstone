import { z } from 'zod'
import { hitungUsiaBulan } from './age'

export const MAKS_USIA_ANAK_BULAN = 72

// Dipakai validasi DAN daftar centang di bawah kolom password (satu sumber, tidak duplikat)
export const passwordRules = [
  { id: 'panjang', label: 'Minimal 8 karakter', test: (v) => v.length >= 8 },
  { id: 'huruf', label: 'Mengandung huruf', test: (v) => /[A-Za-z]/.test(v) },
  { id: 'angka', label: 'Mengandung angka', test: (v) => /\d/.test(v) },
]

const email = z
  .string()
  .trim()
  .min(1, 'Email wajib diisi')
  .max(150, 'Email terlalu panjang')
  .email('Format email tidak valid')

const password = passwordRules.reduce(
  (schema, rule) => schema.refine(rule.test, { message: rule.label }),
  z.string().min(1, 'Kata sandi wajib diisi').max(72, 'Kata sandi terlalu panjang'),
)

// Bidang yang dipakai di lebih dari satu form
const namaLengkap = z.string().trim().min(3, 'Nama lengkap minimal 3 karakter').max(150, 'Nama terlalu panjang')
const namaPanggilan = z.string().trim().min(2, 'Nama panggilan minimal 2 karakter').max(50, 'Nama panggilan terlalu panjang')
const nomorHp = z
  .string()
  .trim()
  .refine((v) => v === '' || /^(\+62|62|0)8\d{8,11}$/.test(v), 'Nomor HP tidak valid, contoh: 081234567890')
const usiaOrangTua = z
  .string()
  .min(1, 'Usia wajib diisi')
  .refine((v) => /^\d{2}$/.test(v) && Number(v) >= 15 && Number(v) <= 80, 'Usia harus antara 15 dan 80 tahun')
const namaAnak = z.string().trim().min(2, 'Nama anak minimal 2 karakter').max(100, 'Nama anak terlalu panjang')
const tanggalLahirAnak = z
  .string()
  .min(1, 'Tanggal lahir wajib diisi')
  .refine((v) => {
    const bulan = hitungUsiaBulan(v)
    return bulan !== null && bulan >= 0
  }, 'Tanggal lahir tidak boleh di masa depan')
  .refine((v) => {
    const bulan = hitungUsiaBulan(v)
    return bulan === null || bulan <= MAKS_USIA_ANAK_BULAN
  }, 'Aplikasi ini untuk anak usia 0–6 tahun')
const jenisKelamin = z.string().refine((v) => v === 'L' || v === 'P', 'Pilih jenis kelamin anak')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Kata sandi wajib diisi'),
})

export const registerSchema = z
  .object({
    nama_lengkap: namaLengkap,
    email,
    nomor_hp: nomorHp,
    password,
    konfirmasi_password: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
    setuju: z.boolean().refine((v) => v === true, 'Anda harus menyetujui ketentuan'),
  })
  .refine((d) => d.password === d.konfirmasi_password, {
    path: ['konfirmasi_password'],
    message: 'Konfirmasi kata sandi tidak sama',
  })

export const onboardingSchema = z.object({
  nama_panggilan: namaPanggilan,
  usia_orang_tua: usiaOrangTua,
  nama_anak: namaAnak,
  tanggal_lahir: tanggalLahirAnak,
  jenis_kelamin: jenisKelamin,
})

export const profileSchema = z.object({
  nama_lengkap: namaLengkap,
  nama_panggilan: namaPanggilan,
  nomor_hp: nomorHp,
  usia_orang_tua: usiaOrangTua,
})

export const childSchema = z.object({
  nama: namaAnak,
  tanggal_lahir: tanggalLahirAnak,
  jenis_kelamin: jenisKelamin,
  catatan: z.string().trim().max(500, 'Catatan maksimal 500 karakter'),
})

export const forgotPasswordSchema = z.object({ email })

export const resetPasswordSchema = z
  .object({
    password,
    konfirmasi_password: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((d) => d.password === d.konfirmasi_password, {
    path: ['konfirmasi_password'],
    message: 'Konfirmasi kata sandi tidak sama',
  })

export const changePasswordSchema = z
  .object({
    password_lama: z.string().min(1, 'Kata sandi saat ini wajib diisi'),
    password_baru: password,
    konfirmasi_password: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((d) => d.password_baru === d.konfirmasi_password, {
    path: ['konfirmasi_password'],
    message: 'Konfirmasi kata sandi tidak sama',
  })
  .refine((d) => d.password_baru !== d.password_lama, {
    path: ['password_baru'],
    message: 'Kata sandi baru harus berbeda dari yang lama',
  })

export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Kata sandi wajib diisi'),
  konfirmasi: z.string().refine((v) => v.trim() === 'HAPUS', 'Ketik HAPUS untuk melanjutkan'),
})