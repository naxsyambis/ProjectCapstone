import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ClipboardCheck, CheckCircle, ArrowRight, Award, History, Sparkles, CheckCircle2 } from 'lucide-react';
import { useModal } from '../components/ModalContext';
import { DEFAULT_PERTANYAAN_ASSESSMENT } from '../services/initialData';

export default function Assessment() {
  const { showModal, showToast } = useModal();
  // Langsung gunakan data master pertanyaan agar halaman langsung terbuka tanpa layar loading
  const [pertanyaan, setPertanyaan] = useState(DEFAULT_PERTANYAAN_ASSESSMENT);
  const [jawaban, setJawaban] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('test'); // 'test' | 'history'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resSoal, resHist] = await Promise.all([
        api.getAssessmentPertanyaan().catch(() => null),
        api.getAssessmentHistory().catch(() => null),
      ]);
      if (resSoal?.pertanyaan?.length) {
        setPertanyaan(resSoal.pertanyaan);
      }
      if (resHist?.length) {
        setHistory(resHist);
      }
    } catch (err) {
      // Data default tetap siap dipakai
    }
  };

  const handleSelectScore = (idPertanyaan, skor) => {
    setJawaban((prev) => ({
      ...prev,
      [idPertanyaan]: skor,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalTerisi = Object.keys(jawaban).length;
    if (totalTerisi < 32) {
      showModal({
        title: 'Kuesioner Belum Lengkap',
        message: `Mohon lengkapi semua 32 butir pertanyaan sebelum menghitung skor. Saat ini baru terisi ${totalTerisi} dari 32 butir.`,
        type: 'warning',
        confirmText: 'Lanjutkan Mengisi',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = Object.entries(jawaban).map(([id, skor]) => ({
        id_pertanyaan_assessment: parseInt(id),
        skor_item: skor,
      }));

      const res = await api.submitAssessment(payload);
      setResult(res.assessment);
      showToast('Asesmen PSDQ-SF berhasil dihitung!', 'success');
      loadData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      showModal({
        title: 'Gagal Menyimpan Asesmen',
        message: err.message,
        type: 'danger',
        confirmText: 'Tutup',
      });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Asesmen Gaya Pengasuhan (PSDQ-SF)</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            32 butir kuesioner ilmiah tervalidasi untuk mengenali kecenderungan gaya pengasuhan Anda.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('test')}
            className={`btn ${activeTab === 'test' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Kuesioner Tes
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`btn ${activeTab === 'history' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <History size={16} /> Riwayat ({history.length})
          </button>
        </div>
      </div>

      {result && (
        <div className="card animate-scale-up" style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          border: '2px solid #2563eb',
          padding: '34px',
          borderRadius: '24px',
          boxShadow: '0 12px 30px -5px rgba(37, 99, 235, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: '#2563eb',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={30} />
            </div>
            <div>
              <span className="badge badge-success">Kalkulasi Otomatis Berhasil</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px', textTransform: 'capitalize', color: '#0f172a' }}>
                Gaya Pengasuhan Dominan: {result.gaya_dominan}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.65, marginBottom: '24px' }}>
            {result.keterangan}
          </p>

          <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Skor Autoritatif (Demokratis)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>{result.skor_autoritatif} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 5.0</span></div>
            </div>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Skor Otoriter (Ketat)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>{result.skor_otoriter} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 5.0</span></div>
            </div>
            <div style={{ background: 'white', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Skor Permisif (Bebas)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>{result.skor_permisif} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 5.0</span></div>
            </div>
          </div>

          <button onClick={() => setResult(null)} className="btn btn-secondary" style={{ padding: '10px 22px' }}>
            Tutup Tampilan Hasil
          </button>
        </div>
      )}

      {activeTab === 'test' ? (
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', padding: '18px 22px', borderRadius: '14px', fontSize: '0.9rem', color: '#334155', border: '1px solid #e2e8f0', lineHeight: 1.6 }}>
            <strong style={{ color: '#0f172a' }}>Petunjuk Pengisian:</strong> Bacalah setiap butir pernyataan dan pilih skala yang paling mencerminkan tindakan Anda dalam mendampingi anak:<br />
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '6px', fontWeight: 600 }}>
              <span style={{ color: '#64748b' }}>1 = Tidak Pernah</span>
              <span style={{ color: '#64748b' }}>2 = Jarang</span>
              <span style={{ color: '#64748b' }}>3 = Kadang-Kadang</span>
              <span style={{ color: '#64748b' }}>4 = Sering</span>
              <span style={{ color: '#2563eb' }}>5 = Selalu</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pertanyaan.map((soal, idx) => (
              <div 
                key={soal.id_pertanyaan_assessment}
                style={{
                  padding: '18px 22px',
                  borderRadius: '16px',
                  border: '1.5px solid',
                  borderColor: jawaban[soal.id_pertanyaan_assessment] ? '#bfdbfe' : '#e2e8f0',
                  background: jawaban[soal.id_pertanyaan_assessment] ? '#f8faff' : '#ffffff',
                  transition: 'all 0.2s ease',
                  boxShadow: jawaban[soal.id_pertanyaan_assessment] ? '0 2px 8px rgba(37, 99, 235, 0.05)' : 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: jawaban[soal.id_pertanyaan_assessment] ? '#2563eb' : '#f1f5f9',
                    color: jawaban[soal.id_pertanyaan_assessment] ? 'white' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <p style={{ fontSize: '0.98rem', fontWeight: 600, color: '#1e293b', flex: 1, lineHeight: 1.5 }}>
                    {soal.teks_pertanyaan}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', maxWidth: '440px', marginLeft: '46px' }}>
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = jawaban[soal.id_pertanyaan_assessment] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleSelectScore(soal.id_pertanyaan_assessment, val)}
                        style={{
                          flex: 1,
                          padding: '11px 0',
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: isSelected ? '#2563eb' : '#cbd5e1',
                          background: isSelected ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#ffffff',
                          color: isSelected ? 'white' : '#475569',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          boxShadow: isSelected ? '0 4px 10px rgba(37, 99, 235, 0.25)' : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
            paddingTop: '20px',
            borderTop: '1px solid #f1f5f9',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Progress Pengisian: <strong style={{ color: '#2563eb' }}>{Object.keys(jawaban).length}</strong> dari 32 butir
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '0.95rem' }}
            >
              {submitting ? 'Menghitung Hasil...' : 'Kirim & Hitung Skor Asesmen'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {history.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '50px 20px', borderRadius: '20px' }}>
              Belum ada riwayat asesmen yang tersimpan.
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id_assessment} className="card card-interactive" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'capitalize', color: '#0f172a' }}>
                    Gaya Dominan: {item.gaya_dominan}
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', background: '#f1f5f9', padding: '4px 12px', borderRadius: '8px' }}>
                    {new Date(item.tanggal_assessment).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '16px', lineHeight: 1.55 }}>
                  {item.keterangan}
                </p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#16a34a' }}>Autoritatif: <strong>{item.skor_autoritatif}</strong></span>
                  <span style={{ color: '#dc2626' }}>Otoriter: <strong>{item.skor_otoriter}</strong></span>
                  <span style={{ color: '#d97706' }}>Permisif: <strong>{item.skor_permisif}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
