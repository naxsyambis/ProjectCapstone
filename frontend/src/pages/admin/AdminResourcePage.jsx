import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import AdminTable from '../../components/admin/AdminTable'
import Pagination from '../../components/admin/Pagination'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Alert from '../../components/feedback/Alert'
import Loading from '../../components/feedback/Loading'
import ErrorState from '../../components/feedback/ErrorState'
import NotFoundPage from '../NotFoundPage'
import { useRequest } from '../../hooks/useRequest'
import {
  getAdminUsers,
  deleteAdminUser,
  getAdminMateri,
  deleteAdminMateri,
  getAdminSoalAssessment,
  getAdminSoalScreening,
  getAdminHasilAssessment,
  getAdminHasilScreening,
} from '../../api/admin'

const UKURAN_HALAMAN = 8

// Mapping konfigurasi kolom & fetcher API riil untuk setiap resource admin
const RESOURCE_MAP = {
  pengguna: {
    judul: 'Pengguna',
    deskripsi: 'Kelola akun orang tua dan administrator riil dari database.',
    kolom: [
      { key: 'nama', label: 'Nama' },
      { key: 'email', label: 'Email' },
      { key: 'peran', label: 'Peran', tipe: 'badge' },
      { key: 'telepon', label: 'Nomor HP' },
      { key: 'terdaftar', label: 'Terdaftar' },
    ],
    fetcher: async () => {
      const data = await getAdminUsers()
      return data.map((u) => ({
        id: u.id_user,
        nama: u.nama_lengkap,
        email: u.email,
        peran: u.role,
        telepon: u.nomor_hp || '-',
        terdaftar: new Date(u.tanggal_daftar).toLocaleDateString('id-ID'),
      }))
    },
    deleter: deleteAdminUser,
  },
  materi: {
    judul: 'Materi Pembelajaran',
    deskripsi: 'Kelola modul materi edukasi (video, artikel, durasi) di sistem.',
    kolom: [
      { key: 'judul', label: 'Judul', wrap: true },
      { key: 'tipe', label: 'Tipe', tipe: 'badge' },
      { key: 'kategori', label: 'Kategori Sasaran' },
      { key: 'durasi', label: 'Durasi' },
    ],
    fetcher: async () => {
      const data = await getAdminMateri()
      return data.map((m) => ({
        id: m.id_materi,
        judul: m.judul,
        tipe: m.tipe_konten,
        kategori: m.kategori_target,
        durasi: `${m.durasi_menit || 5} menit`,
      }))
    },
    deleter: deleteAdminMateri,
  },
  'soal-assessment': {
    judul: 'Soal Assessment Pola Asuh (PSDQ-SF)',
    deskripsi: 'Daftar 32 butir instrumen PSDQ-SF yang aktif di sistem.',
    kolom: [
      { key: 'nomor', label: 'No' },
      { key: 'pernyataan', label: 'Pernyataan', wrap: true },
      { key: 'gaya', label: 'Gaya Pengasuhan', tipe: 'badge' },
      { key: 'dimensi', label: 'Dimensi' },
    ],
    fetcher: async () => {
      const data = await getAdminSoalAssessment()
      return data.map((s) => ({
        id: s.id_pertanyaan_assessment,
        nomor: s.nomor_item,
        pernyataan: s.teks_pertanyaan,
        gaya: s.gaya_asuh,
        dimensi: s.dimensi,
      }))
    },
  },
  'soal-screening': {
    judul: 'Soal Skrining Sosial-Emosional',
    deskripsi: 'Butir instrumen skrining BPSC (<18 bulan) dan PPSC (18–65 bulan).',
    kolom: [
      { key: 'instrumen', label: 'Instrumen', tipe: 'badge' },
      { key: 'nomor', label: 'No' },
      { key: 'pernyataan', label: 'Pernyataan', wrap: true },
      { key: 'subskala', label: 'Subskala' },
    ],
    fetcher: async () => {
      const data = await getAdminSoalScreening()
      return data.map((s) => ({
        id: s.id_pertanyaan_screening,
        instrumen: s.instrumen,
        nomor: s.nomor_item,
        pernyataan: s.teks_pertanyaan,
        subskala: s.subscale,
      }))
    },
  },
  'hasil-assessment': {
    judul: 'Riwayat Hasil Assessment',
    deskripsi: 'Data hasil asesmen pola asuh orang tua dari database.',
    kolom: [
      { key: 'pengguna', label: 'Pengguna' },
      { key: 'gaya', label: 'Gaya Dominan', tipe: 'badge' },
      { key: 'autoritatif', label: 'Skor Demokratis' },
      { key: 'otoriter', label: 'Skor Otoriter' },
      { key: 'permisif', label: 'Skor Permisif' },
      { key: 'tanggal', label: 'Tanggal' },
    ],
    fetcher: async () => {
      const data = await getAdminHasilAssessment()
      return data.map((h) => ({
        id: h.id_assessment,
        pengguna: h.user?.nama_lengkap || `User #${h.id_user}`,
        gaya: h.gaya_dominan,
        autoritatif: h.skor_autoritatif,
        otoriter: h.skor_otoriter,
        permisif: h.skor_permisif,
        tanggal: new Date(h.tanggal_assessment).toLocaleDateString('id-ID'),
      }))
    },
  },
  'hasil-screening': {
    judul: 'Riwayat Hasil Screening',
    deskripsi: 'Data hasil skrining sosial-emosional anak dari database.',
    kolom: [
      { key: 'anak', label: 'Nama Anak' },
      { key: 'instrumen', label: 'Instrumen', tipe: 'badge' },
      { key: 'usia', label: 'Usia Saat Skrining' },
      { key: 'status', label: 'Status Risiko', tipe: 'badge' },
      { key: 'rekomendasi', label: 'Rekomendasi' },
      { key: 'tanggal', label: 'Tanggal' },
    ],
    fetcher: async () => {
      const data = await getAdminHasilScreening()
      return data.map((s) => ({
        id: s.id_screening,
        anak: s.anak?.nama || `Anak #${s.id_anak}`,
        instrumen: s.instrumen_digunakan,
        usia: `${s.usia_anak_saat_screening} bulan`,
        status: s.status_risiko,
        rekomendasi: s.rekomendasi === 'rujuk_psikolog' ? 'Rujuk Psikolog' : 'Aktivitas Harian',
        tanggal: new Date(s.tanggal_screening).toLocaleDateString('id-ID'),
      }))
    },
  },
}

function RealResourceView({ resourceKey, config }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [hapusItem, setHapusItem] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const request = useCallback(() => config.fetcher(), [config])
  const { data: baris = [], loading, error, retry } = useRequest(request, `admin-res-${resourceKey}`)

  const q = query.trim().toLowerCase()
  const cocok = q
    ? (baris || []).filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)))
    : baris || []

  const lastPage = Math.max(1, Math.ceil(cocok.length / UKURAN_HALAMAN))
  const halaman = Math.min(page, lastPage)
  const tampil = cocok.slice((halaman - 1) * UKURAN_HALAMAN, halaman * UKURAN_HALAMAN)

  const konfirmasiHapus = async () => {
    if (!config.deleter || !hapusItem) return
    setDeleting(true)
    try {
      await config.deleter(hapusItem.id)
      setHapusItem(null)
      retry()
    } catch (err) {
      alert(err.message || 'Gagal menghapus data.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminLayout title={config.judul}>
      <div className="mx-auto max-w-6xl">
        <p className="text-slate-600">{config.deskripsi}</p>

        {loading && <Loading text="Memuat data dari database..." />}
        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-xs">
                <Input
                  icon={Search}
                  placeholder={`Cari ${config.judul.toLowerCase()}...`}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setPage(1)
                  }}
                  aria-label={`Cari di ${config.judul}`}
                />
              </div>
            </div>

            <div className="mt-4">
              <AdminTable
                kolom={config.kolom}
                baris={tampil}
                aksi={config.deleter ? ['hapus'] : []}
                onHapus={(row) => setHapusItem(row)}
              />
            </div>

            {lastPage > 1 && (
              <div className="mt-4">
                <Pagination page={halaman} lastPage={lastPage} onChange={setPage} />
              </div>
            )}
          </>
        )}

        <ConfirmDialog
          open={Boolean(hapusItem)}
          loading={deleting}
          title="Hapus Data"
          description={`Apakah Anda yakin ingin menghapus data "${hapusItem?.nama || hapusItem?.judul || 'item ini'}"? Tindakan ini tidak dapat dibatalkan.`}
          confirmLabel="Hapus"
          onConfirm={konfirmasiHapus}
          onCancel={() => setHapusItem(null)}
        />
      </div>
    </AdminLayout>
  )
}

export default function AdminResourcePage() {
  const { resource } = useParams()
  const config = RESOURCE_MAP[resource]

  if (!config) return <NotFoundPage />
  return <RealResourceView key={resource} resourceKey={resource} config={config} />
}
