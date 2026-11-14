import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BookOpen, CheckCircle, Clock, PlayCircle, HelpCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { useModal } from '../components/ModalContext';
import { DEFAULT_MATERI } from '../services/initialData';

export default function LearningPath({ onNavigate }) {
  const { showToast } = useModal();
  // Langsung tampilkan materi tanpa layar loading
  const [materiList, setMateriList] = useState(DEFAULT_MATERI);
  const [rekomendasiAktif, setRekomendasiAktif] = useState('umum');
  const [selectedMateri, setSelectedMateri] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMateri();
  }, []);

  const loadMateri = async () => {
    try {
      const res = await api.getMateriList().catch(() => null);
      if (res && res.data?.length) {
        setMateriList(res.data);
        setRekomendasiAktif(res.rekomendasi_aktif || 'umum');
      }
    } catch (err) {
      // Data default tetap siap dipakai
    }
  };

  const handleUpdateProgress = async (id, persentase) => {
    try {
      await api.updateMateriProgress(id, persentase);
      showToast(`Progres materi diperbarui: ${persentase}%`, 'success');
      loadMateri();
      if (selectedMateri && selectedMateri.id_materi === id) {
        const updated = await api.getMateriDetail(id);
        setSelectedMateri(updated);
      }
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Learning Path & Materi Edukasi</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            Jalur pembelajaran terarah yang disesuaikan secara ilmiah dengan hasil asesmen pola asuh Anda.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Fokus Kurikulum:</span>
          <span className="badge badge-info" style={{ textTransform: 'capitalize', fontSize: '0.82rem', padding: '6px 14px' }}>
            {rekomendasiAktif.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Detail Modal / View */}
      {selectedMateri && (
        <div className="popup-backdrop animate-fade-in" onClick={() => setSelectedMateri(null)}>
          <div
            className="popup-dialog animate-scale-up"
            style={{ maxWidth: '780px', maxHeight: '88vh', overflowY: 'auto', textAlign: 'left', alignItems: 'stretch', padding: '36px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close-btn" onClick={() => setSelectedMateri(null)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <span className="badge badge-info" style={{ textTransform: 'uppercase', marginBottom: '10px' }}>
                  {selectedMateri.kategori_target?.replace(/_/g, ' ')}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35 }}>
                  {selectedMateri.judul}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.86rem', color: '#64748b', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
              <span>⏱ Durasi: <strong>{selectedMateri.durasi_menit || 5} Menit</strong></span>
              <span>📖 Tipe: <strong style={{ textTransform: 'capitalize' }}>{selectedMateri.tipe_konten}</strong></span>
              <span>📈 Status: <strong>{selectedMateri.progress?.[0]?.persentase || 0}% Selesai</strong></span>
            </div>

            <div style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.75, marginBottom: '28px', whiteSpace: 'pre-line' }}>
              {selectedMateri.isi_artikel || selectedMateri.ringkasan}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f8fafc',
              padding: '18px 22px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Tandai Progres Belajar:</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button
                    onClick={() => handleUpdateProgress(selectedMateri.id_materi, 50)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    50% (Sedang Baca)
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(selectedMateri.id_materi, 100)}
                    className="btn btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    100% (Selesai Baca)
                  </button>
                </div>
              </div>

              {selectedMateri.quiz && (
                <button
                  onClick={() => {
                    setSelectedMateri(null);
                    onNavigate('quiz', { selectedMateriId: selectedMateri.id_materi });
                  }}
                  className="btn btn-primary"
                  style={{ padding: '12px 22px' }}
                >
                  <HelpCircle size={17} /> Kerjakan Kuis Evaluasi
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid Materi List */}
      <div className="grid-cols-2">
        {materiList.map((m) => {
          const progress = m.progress?.[0]?.persentase || 0;
          const isCompleted = progress === 100;

          return (
            <div key={m.id_materi} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.74rem' }}>
                    {m.kategori_target?.replace(/_/g, ' ')}
                  </span>
                  {isCompleted ? (
                    <span className="badge badge-success" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <CheckCircle size={12} /> Tuntas
                    </span>
                  ) : progress > 0 ? (
                    <span className="badge badge-warning">Progres {progress}%</span>
                  ) : (
                    <span className="badge badge-info">Belum Mulai</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', lineHeight: 1.4, color: '#0f172a' }}>
                  {m.judul}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                  {m.ringkasan}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
                  <Clock size={15} /> Estimasi durasi: {m.durasi_menit || 5} menit
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={async () => {
                      const full = await api.getMateriDetail(m.id_materi);
                      setSelectedMateri(full);
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '0.88rem' }}
                  >
                    Pelajari Modul <ArrowRight size={15} />
                  </button>
                  {m.quiz && (
                    <button
                      onClick={() => onNavigate('quiz', { selectedMateriId: m.id_materi })}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.88rem', padding: '10px 18px' }}
                    >
                      Kuis
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
