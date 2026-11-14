import { ClipboardList, CircleAlert, HeartPulse, Users } from 'lucide-react'
import { ROUTES } from '../utils/constants'

// DATA CONTOH untuk tampilan. Ganti dengan data dari API.
const pad = (n) => String(n).padStart(2, '0')
const tgl = (i) => `${pad((i % 27) + 1)} Okt 2026`
const pilih = (daftar, i) => daftar[i % daftar.length]
const buat = (jumlah, fn) => Array.from({ length: jumlah }, (_, i) => ({ id: i + 1, ...fn(i) }))

export const ADMIN_STATS = [
  { label: 'Pengguna terdaftar', nilai: 128, icon: Users, tone: 'brand' },
  { label: 'Assessment selesai', nilai: 94, icon: ClipboardList, tone: 'green' },
  { label: 'Screening selesai', nilai: 71, icon: HeartPulse, tone: 'amber' },
  { label: 'Perlu perhatian', nilai: 6, icon: CircleAlert, tone: 'red' },
]

export const ADMIN_REVIEW = [
  { teks: '6 screening berstatus perlu perhatian dalam 7 hari terakhir.', to: `${ROUTES.ADMIN}/hasil-screening` },
  { teks: '3 materi masih berstatus draf.', to: `${ROUTES.ADMIN}/materi` },
  { teks: '2 akun terkunci karena gagal masuk berulang.', to: `${ROUTES.ADMIN}/pengguna` },
]

const CATATAN_PRIVASI = 'Data anak ditampilkan tanpa nama (ID pseudonim) untuk melindungi privasi.'

export const ADMIN_RESOURCES = {
  pengguna: {
    judul: 'Pengguna',
    deskripsi: 'Kelola akun orang tua dan administrator.',
    aksi: ['ubah', 'hapus'],
    kolom: [
      { key: 'nama', label: 'Nama' },
      { key: 'email', label: 'Email' },
      { key: 'peran', label: 'Peran', tipe: 'badge' },
      { key: 'status', label: 'Status', tipe: 'badge' },
      { key: 'terdaftar', label: 'Terdaftar' },
    ],
    baris: buat(12, (i) => ({
      nama: `Pengguna Contoh ${i + 1}`,
      email: `pengguna${i + 1}@contoh.test`,
      peran: i === 0 ? 'admin' : 'orang_tua',
      status: i % 7 === 6 ? 'nonaktif' : 'aktif',
      terdaftar: tgl(i),
    })),
  },
  materi: {
    judul: 'Materi',
    deskripsi: 'Kelola materi belajar (video, artikel, PDF) dan kategori sasarannya.',
    tambah: 'Tambah Materi',
    aksi: ['ubah', 'hapus'],
    kolom: [
      { key: 'judul', label: 'Judul', wrap: true },
      { key: 'tipe', label: 'Tipe', tipe: 'badge' },
      { key: 'kategori', label: 'Kategori target' },
      { key: 'durasi', label: 'Durasi' },
      { key: 'status', label: 'Status', tipe: 'badge' },
    ],
    baris: buat(11, (i) => ({
      judul: `[Contoh] Materi ${i + 1}`,
      tipe: pilih(['video', 'artikel', 'pdf'], i),
      kategori: pilih(['Otoriter ke otoritatif', 'Permisif ke otoritatif', 'Penguatan otoritatif', 'Umum'], i),
      durasi: `${8 + (i % 5) * 2} menit`,
      status: i % 4 === 3 ? 'draf' : 'terbit',
    })),
  },
  kuis: {
    judul: 'Kuis',
    deskripsi: 'Kelola kuis untuk setiap materi.',
    tambah: 'Tambah Kuis',
    aksi: ['ubah', 'hapus'],
    kolom: [
      { key: 'judul', label: 'Judul kuis', wrap: true },
      { key: 'materi', label: 'Materi', wrap: true },
      { key: 'soal', label: 'Jumlah soal' },
      { key: 'lulus', label: 'Nilai lulus' },
    ],
    baris: buat(8, (i) => ({
      judul: `[Contoh] Kuis Minggu ${i + 1}`,
      materi: `[Contoh] Materi ${i + 1}`,
      soal: 5,
      lulus: '70%',
    })),
  },
  misi: {
    judul: 'Misi Parenting',
    deskripsi: 'Kelola daftar misi yang diberikan setelah screening berstatus aman.',
    tambah: 'Tambah Misi',
    aksi: ['ubah', 'hapus'],
    kolom: [
      { key: 'judul', label: 'Judul misi', wrap: true },
      { key: 'usia', label: 'Rentang usia' },
      { key: 'poin', label: 'Poin' },
    ],
    baris: buat(8, (i) => ({
      judul: `[Contoh] Misi ${i + 1}`,
      usia: `${(i % 4) * 6}–${(i % 4) * 6 + 12} bln`,
      poin: pilih([30, 40, 50], i),
    })),
  },
  'soal-assessment': {
    judul: 'Soal Assessment',
    deskripsi: 'Butir assessment gaya pengasuhan (PSDQ). Sebaiknya hanya diubah jika instrumennya direvisi.',
    aksi: ['ubah'],
    kolom: [
      { key: 'nomor', label: 'No' },
      { key: 'pernyataan', label: 'Pernyataan', wrap: true },
      { key: 'gaya', label: 'Gaya', tipe: 'badge' },
      { key: 'dimensi', label: 'Dimensi' },
    ],
    baris: buat(8, (i) => ({
      nomor: i + 1,
      pernyataan: `[Contoh] Pernyataan PSDQ ${i + 1}`,
      gaya: pilih(['autoritatif', 'otoriter', 'permisif'], i),
      dimensi: pilih(['Dukungan afeksi', 'Regulasi', 'Otonomi', 'Koersi fisik', 'Hostilitas verbal', 'Hukuman', 'Indulgensi'], i),
    })),
  },
  'soal-screening': {
    judul: 'Soal Screening',
    deskripsi: 'Butir screening BPSC (di bawah 18 bulan) dan PPSC (18 sampai 65 bulan).',
    aksi: ['ubah'],
    kolom: [
      { key: 'instrumen', label: 'Instrumen', tipe: 'badge' },
      { key: 'nomor', label: 'No' },
      { key: 'pernyataan', label: 'Pernyataan', wrap: true },
      { key: 'subskala', label: 'Subskala' },
    ],
    baris: buat(8, (i) => {
      const instrumen = i < 4 ? 'BPSC' : 'PPSC'
      return {
        instrumen,
        nomor: (i % 4) + 1,
        pernyataan: `[Contoh] Pernyataan ${instrumen} ${(i % 4) + 1}`,
        subskala: pilih(['Mudah rewel', 'Fleksibilitas', 'Rutinitas', 'Perilaku'], i),
      }
    }),
  },
  'hasil-assessment': {
    judul: 'Hasil Assessment',
    deskripsi: 'Ringkasan hasil assessment pengguna.',
    catatan: 'Pengguna ditampilkan dengan ID pseudonim, bukan nama.',
    aksi: [],
    kolom: [
      { key: 'pengguna', label: 'Pengguna' },
      { key: 'gaya', label: 'Gaya dominan', tipe: 'badge' },
      { key: 'autoritatif', label: 'Autoritatif' },
      { key: 'otoriter', label: 'Otoriter' },
      { key: 'permisif', label: 'Permisif' },
      { key: 'tanggal', label: 'Tanggal' },
    ],
    baris: buat(10, (i) => ({
      pengguna: `U-${100 + i}`,
      gaya: pilih(['autoritatif', 'autoritatif', 'otoriter', 'permisif'], i),
      autoritatif: (3.2 + (i % 5) * 0.3).toFixed(2),
      otoriter: (1.8 + (i % 4) * 0.4).toFixed(2),
      permisif: (1.5 + (i % 3) * 0.5).toFixed(2),
      tanggal: tgl(i),
    })),
  },
  'hasil-screening': {
    judul: 'Hasil Screening',
    deskripsi: 'Ringkasan hasil screening sosial-emosional anak.',
    catatan: CATATAN_PRIVASI,
    aksi: [],
    kolom: [
      { key: 'anak', label: 'Anak' },
      { key: 'instrumen', label: 'Instrumen', tipe: 'badge' },
      { key: 'usia', label: 'Usia' },
      { key: 'status', label: 'Status risiko', tipe: 'badge' },
      { key: 'rujukan', label: 'Dirujuk' },
      { key: 'tanggal', label: 'Tanggal' },
    ],
    baris: buat(10, (i) => {
      const berisiko = i % 4 === 3
      return {
        anak: `A-${100 + i}`,
        instrumen: i % 2 === 0 ? 'BPSC' : 'PPSC',
        usia: `${8 + i * 5} bln`,
        status: berisiko ? 'at_risk' : 'aman',
        rujukan: berisiko ? 'Ya' : 'Tidak',
        tanggal: tgl(i),
      }
    }),
  },
}