import { useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import ChildTabs from '../components/children/ChildTabs'
import MissionBoard from '../components/missions/MissionBoard'
import { useRequest } from '../hooks/useRequest'
import { getChildren } from '../api/children'
import { getMissions } from '../api/missions'
import { hasilScreeningPath, screeningPath } from '../utils/paths'
import { ROUTES } from '../utils/constants'

function MissionHeader({ poin }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Misi Parenting</h1>
        <p className="mt-2 text-lg leading-snug text-slate-600">Selesaikan tugas harian untuk membangun kebiasaan positif.</p>
      </div>
      {poin !== undefined && (
        <p className="flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 font-bold text-white shadow-md shadow-brand-600/25">
          <Star size={20} className="fill-amber-300 text-amber-300" aria-hidden="true" />
          {poin.toLocaleString('id-ID')} pt
        </p>
      )}
    </div>
  )
}

function InfoCard({ judul, children }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70">
      <h2 className="text-xl font-bold text-slate-900">{judul}</h2>
      <p className="mt-2 leading-relaxed text-slate-600">{children}</p>
    </section>
  )
}

function MissionView({ anak, tabs }) {
  const request = useCallback(() => getMissions(anak.id_bayi), [anak.id_bayi])
  const { data, loading, error, retry } = useRequest(request)
  const [poinBaru, setPoinBaru] = useState(null)

  return (
    <>
      <MissionHeader poin={poinBaru ?? data?.poin_total} />
      {tabs}

      {loading && <Loading text="Memuat misi..." />}
      {error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}

      {data?.status_screening === 'belum_pernah' && (
        <>
          <InfoCard judul={`Belum ada misi untuk ${anak.nama}`}>
            Misi disusun dari hasil screening sosial-emosional. Lakukan screening terlebih dahulu.
          </InfoCard>
          <Button as={Link} to={screeningPath(anak.id_bayi)} className="mt-5 w-full">
            Mulai Screening
          </Button>
        </>
      )}

      {data?.status_screening === 'at_risk' && (
        <>
          <InfoCard judul="Fokus pada konsultasi profesional">
            Berdasarkan hasil screening, misi belum ditampilkan untuk {anak.nama}. Kami menyarankan berkonsultasi dengan
            psikolog anak atau dokter terlebih dahulu.
          </InfoCard>
          <Button as={Link} to={hasilScreeningPath(anak.id_bayi)} className="mt-5 w-full">
            Lihat Hasil dan Saran
          </Button>
        </>
      )}

      {data?.status_screening === 'aman' && (
        <MissionBoard key={anak.id_bayi} idBayi={anak.id_bayi} data={data} onPoinChange={setPoinBaru} />
      )}
    </>
  )
}

export default function MissionPage() {
  const { data: anak, loading, error, retry } = useRequest(getChildren)
  const [params, setParams] = useSearchParams()

  const aktif = anak?.find((a) => String(a.id_bayi) === params.get('anak')) ?? anak?.[0]

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        {(loading || error || anak?.length === 0) && <MissionHeader />}
        {loading && <Loading text="Memuat data anak..." />}
        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {anak?.length === 0 && (
          <>
            <InfoCard judul="Belum ada data anak">Tambahkan anak terlebih dahulu untuk melihat misi.</InfoCard>
            <Button as={Link} to={ROUTES.CHILDREN} className="mt-5 w-full">
              Tambah Data Anak
            </Button>
          </>
        )}

        {aktif && (
          <MissionView
            key={aktif.id_bayi}
            anak={aktif}
            tabs={
              <ChildTabs anak={anak} activeId={aktif.id_bayi} onSelect={(id) => setParams({ anak: id }, { replace: true })} />
            }
          />
        )}
      </main>

      <Footer tagline="Kejelasan yang Mendukung untuk Setiap Orang Tua." />
    </div>
  )
}