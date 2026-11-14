import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Target, CheckCircle2, Award, Clock, ArrowRight, Play, Baby, X, BookOpen } from 'lucide-react';
import { useModal } from '../components/ModalContext';

export default function Missions({ anakList, initialAnakId, onNavigate }) {
  const { showModal, showToast } = useModal();
  const [selectedAnakId, setSelectedAnakId] = useState(initialAnakId || anakList[0]?.id_anak || null);
  const [missions, setMissions] = useState([]);
  const [anakData, setAnakData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMisi, setActiveMisi] = useState(null);
  const [catatanRefleksi, setCatatanRefleksi] = useState('');
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (selectedAnakId) {
      loadMissions(selectedAnakId);
    }
  }, [selectedAnakId]);

  const loadMissions = async (idAnak) => {
    try {
      const res = await api.getMissionsByAnak(idAnak);
      setMissions(res.data || []);
      setAnakData(res.anak || null);
    } catch (err) {
      // background silent catch
    }
  };

  const handleStartMission = async (idMisi, judulMisi) => {
    try {
      await api.startMission(selectedAnakId, idMisi);
      showToast(`Misi "${judulMisi}" dimulai! Semangat praktik bersama si kecil.`, 'info');
      loadMissions(selectedAnakId);
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  const handleCompleteMission = async (e) => {
    e.preventDefault();
    setCompleting(true);
    try {
      const res = await api.completeMission(selectedAnakId, activeMisi.id_misi, catatanRefleksi);
      showModal({
        title: 'Misi Berhasil Diselesaikan! 🎉',
        message: `Selamat! Anda berhasil menyelesaikan misi "${activeMisi.judul_misi}" dan mendapatkan +${activeMisi.poin} poin pengasuhan. Refleksi Anda telah tercatat.`,
        type: 'success',
        confirmText: 'Luar Biasa!',
      });
      setActiveMisi(null);
      setCatatanRefleksi('');
      loadMissions(selectedAnakId);
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setCompleting(false);
    }
  };

  if (!selectedAnakId || anakList.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '70px 24px', borderRadius: '24px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          color: '#94a3b8'
        }}>
          <Baby size={44} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Pilih Anak Terlebih Dahulu</h3>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '8px', maxWidth: '420px', margin: '8px auto 24px auto', lineHeight: 1.6 }}>
          Setiap misi parenting ASQ:SE-2 dirancang khusus berdasarkan rentang usia tahapan anak dalam bulan.
        </p>
        <button onClick={() => onNavigate('anak')} className="btn btn-primary">
          Kelola Profil Anak
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Parenting Mission (ASQ:SE-2)</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            Aktivitas interaktif langsung bersama anak untuk menstimulasi kedekatan emosional dan sosial.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={selectedAnakId}
            onChange={(e) => setSelectedAnakId(parseInt(e.target.value))}
            style={{
              padding: '11px 16px',
              borderRadius: '12px',
              border: '1.5px solid #cbd5e1',
              fontWeight: 700,
              background: 'white',
              fontSize: '0.92rem',
              color: '#0f172a'
            }}
          >
            {anakList.map((anak) => (
              <option key={anak.id_anak} value={anak.id_anak}>
                {anak.nama} ({anak.usia_bulan} Bulan)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modal Jurnal Refleksi Misi */}
      {activeMisi && (
        <div className="popup-backdrop animate-fade-in" onClick={() => setActiveMisi(null)}>
          <div
            className="popup-dialog animate-scale-up"
            style={{ maxWidth: '540px', textAlign: 'left', alignItems: 'stretch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close-btn" onClick={() => setActiveMisi(null)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Award size={26} />
              </div>
              <div>
                <span className="badge badge-success">Selesaikan Misi Pengasuhan</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  {activeMisi.judul_misi}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              {activeMisi.deskripsi}
            </p>

            <form onSubmit={handleCompleteMission} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
                  Catatan Refleksi & Respon Anak
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Ceritakan bagaimana respon si kecil saat diajak beraktivitas bersama? Apakah ada momen menyenangkan atau tantangan tertentu?"
                  value={catatanRefleksi}
                  onChange={(e) => setCatatanRefleksi(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setActiveMisi(null)}
                  className="btn btn-secondary"
                  style={{ padding: '11px 18px' }}
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  disabled={completing}
                  className="btn btn-primary"
                  style={{ padding: '11px 24px' }}
                >
                  {completing ? 'Menyimpan...' : `Selesaikan & Klaim +${activeMisi.poin} Poin`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {missions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px', borderRadius: '24px' }}>
          <Target size={48} color="#94a3b8" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Belum Ada Misi untuk Rentang Usia Ini</h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '6px' }}>
            Usia anak saat ini: <strong>{anakData?.usia_bulan} bulan</strong>. Misi baru akan dirilis berkala oleh tim ahli.
          </p>
        </div>
      ) : (
        <div className="grid-cols-2">
          {missions.map((misi) => {
            const progress = misi.progress?.[0];
            const status = progress?.status || 'belum_mulai';

            return (
              <div key={misi.id_misi} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span className="badge badge-info" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Award size={14} /> +{misi.poin} Poin
                    </span>

                    {status === 'selesai' ? (
                      <span className="badge badge-success" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <CheckCircle2 size={13} /> Selesai
                      </span>
                    ) : status === 'sedang_berjalan' ? (
                      <span className="badge badge-warning">Sedang Berjalan</span>
                    ) : (
                      <span className="badge badge-info">Siap Dimulai</span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: '#0f172a', lineHeight: 1.4 }}>
                    {misi.judul_misi}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
                    {misi.deskripsi}
                  </p>

                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', fontSize: '0.8rem', color: '#64748b', marginBottom: '18px', border: '1px solid #f1f5f9' }}>
                    Sumber: <strong>{misi.sumber_aktivitas || 'ASQ:SE-2 Learning Activities'}</strong> • Usia: <strong>{misi.usia_min_bulan}-{misi.usia_maks_bulan} Bulan</strong>
                  </div>
                </div>

                <div>
                  {status === 'selesai' ? (
                    <div style={{
                      padding: '12px 16px',
                      background: '#ecfdf5',
                      borderRadius: '12px',
                      fontSize: '0.86rem',
                      color: '#065f46',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #a7f3d0'
                    }}>
                      <CheckCircle2 size={18} color="#10b981" />
                      Misi tuntas diselesaikan ({new Date(progress.tanggal_selesai).toLocaleDateString('id-ID')})
                    </div>
                  ) : status === 'sedang_berjalan' ? (
                    <button
                      onClick={() => setActiveMisi(misi)}
                      className="btn btn-primary"
                      style={{ width: '100%', fontSize: '0.92rem', padding: '12px 0' }}
                    >
                      <CheckCircle2 size={17} /> Selesaikan & Tulis Refleksi
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartMission(misi.id_misi, misi.judul_misi)}
                      className="btn btn-secondary"
                      style={{ width: '100%', fontSize: '0.92rem', padding: '12px 0' }}
                    >
                      <Play size={16} /> Mulai Misi Sekarang
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
