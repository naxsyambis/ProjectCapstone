import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MateriHeader from '../components/materi/MateriHeader'
import VideoPlayer from '../components/materi/VideoPlayer'
import SummaryTab from '../components/materi/SummaryTab'
import ArticleTab from '../components/materi/ArticleTab'
import ActionBar from '../components/materi/ActionBar'
import Loading from '../components/feedback/Loading'
import ErrorState from '../components/feedback/ErrorState'
import { useRequest } from '../hooks/useRequest'
import { getMateri, markMateriDone } from '../api/learning'
import { ambilIdYoutube } from '../utils/video'
import { ROUTES } from '../utils/constants'

function MateriView({ idMateri }) {
  const request = useCallback(() => getMateri(idMateri), [idMateri])
  const { data, loading, error, retry } = useRequest(request)

  const [tab, setTab] = useState(null)
  const [doneLocal, setDoneLocal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState('')

  const videoId = data ? ambilIdYoutube(data.url_video) : null

  const tabs = []
  if (data?.ringkasan || data?.poin_penting?.length > 0 || data?.pdf) tabs.push({ id: 'ringkasan', label: 'Ringkasan' })
  if (data?.isi_artikel) tabs.push({ id: 'artikel', label: 'Artikel' })

  const aktif = tabs.some((t) => t.id === tab) ? tab : tabs[0]?.id
  const selesai = doneLocal || data?.status_progress === 'selesai'

  const handleComplete = async () => {
    setSaving(true)
    setActionError('')
    try {
      await markMateriDone(idMateri)
      setDoneLocal(true)
    } catch (err) {
      setActionError(err.message || 'Gagal menyimpan. Silakan coba lagi.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <MateriHeader minggu={data?.minggu} judul={data?.judul} />

      <main className="mx-auto w-full max-w-2xl flex-1 pb-8">
        {loading && <Loading text="Memuat materi..." />}

        {error && (
          <div className="space-y-4 px-5 pt-6">
            <ErrorState message={error} onRetry={retry} />
            <Link to={ROUTES.LEARNING_PATH} className="block text-center text-sm font-semibold text-brand-600 hover:underline">
              Kembali ke Jalur Belajar
            </Link>
          </div>
        )}

        {data && (
          <>
            {videoId && <VideoPlayer videoId={videoId} title={data.judul} />}

            {tabs.length > 1 && (
              <div role="tablist" aria-label="Isi materi" className="flex gap-6 border-b border-slate-200 px-5">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={aktif === t.id}
                    onClick={() => setTab(t.id)}
                    className={`-mb-px border-b-2 py-3 text-[15px] font-medium transition ${
                      aktif === t.id
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            <div role={tabs.length > 1 ? 'tabpanel' : undefined} className="px-5 py-6">
              {aktif === 'ringkasan' && <SummaryTab materi={data} />}
              {aktif === 'artikel' && <ArticleTab materi={data} />}
              {tabs.length === 0 && <p className="py-8 text-center text-slate-500">Konten materi belum tersedia.</p>}
            </div>
          </>
        )}
      </main>

      {data && (
        <ActionBar
          idMateri={idMateri}
          selesai={selesai}
          kuis={data.quiz}
          saving={saving}
          error={actionError}
          onComplete={handleComplete}
        />
      )}
    </div>
  )
}

export default function MateriPage() {
  const { idMateri } = useParams()
  // key: pindah ke materi lain = tampilan dimulai dari awal (tab dan status lokal tidak terbawa)
  return <MateriView key={idMateri} idMateri={idMateri} />
}