import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import { useModal } from '../components/ModalContext';

export default function Quiz({ selectedMateriId, onNavigate }) {
  const { showModal, showToast } = useModal();
  const [quiz, setQuiz] = useState(null);
  const [jawaban, setJawaban] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedMateriId) {
      loadQuiz(selectedMateriId);
    } else {
      setLoading(false);
    }
  }, [selectedMateriId]);

  const loadQuiz = async (materiId) => {
    setLoading(true);
    setResult(null);
    setJawaban({});
    try {
      const res = await api.getQuizByMateri(materiId);
      setQuiz(res);
    } catch (err) {
      showModal({
        title: 'Kuis Belum Tersedia',
        message: 'Materi pembelajaran ini saat ini belum memiliki kuis evaluasi. Silakan pelajari materi lainnya.',
        type: 'info',
        confirmText: 'Kembali ke Materi',
      }).then(() => {
        onNavigate('materi');
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (idSoal, huruf) => {
    setJawaban((prev) => ({
      ...prev,
      [idSoal]: huruf,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalSoal = quiz?.pertanyaan?.length || 0;
    const totalTerisi = Object.keys(jawaban).length;

    if (totalTerisi < totalSoal) {
      showModal({
        title: 'Jawaban Belum Lengkap',
        message: `Mohon jawab seluruh butir soal kuis sebelum mengirimkan (${totalTerisi} dari ${totalSoal} butir dijawab).`,
        type: 'warning',
        confirmText: 'Lanjutkan',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payloadJawaban = Object.entries(jawaban).map(([id, ans]) => ({
        id_pertanyaan_quiz: parseInt(id),
        jawaban: ans,
      }));

      const res = await api.submitQuiz(quiz.id_quiz, payloadJawaban, 60);
      setResult(res);
      if (res.hasil?.status_lulus) {
        showToast('Selamat, Anda LULUS kuis evaluasi!', 'success');
      } else {
        showToast('Belum mencapai batas kelulusan. Tetap semangat!', 'warning');
      }
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedMateriId) {
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
          <HelpCircle size={44} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Pilih Materi untuk Mulai Kuis</h3>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '8px', maxWidth: '420px', margin: '8px auto 24px auto', lineHeight: 1.6 }}>
          Setiap modul edukasi di Learning Path dilengkapi kuis pemahaman dengan ambang batas kelulusan.
        </p>
        <button onClick={() => onNavigate('materi')} className="btn btn-primary">
          Buka Daftar Materi
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px', borderRadius: '20px' }}>
        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.1rem' }}>Menyiapkan soal kuis evaluasi...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{quiz?.judul_quiz || 'Kuis Evaluasi'}</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            Uji pemahaman Anda terhadap konsep pengasuhan positif (Batas Kelulusan: <strong>{quiz?.min_skor_lulus || 70}%</strong>).
          </p>
        </div>
        <button onClick={() => onNavigate('materi')} className="btn btn-secondary">
          Kembali ke Materi
        </button>
      </div>

      {result && (
        <div className="card animate-scale-up" style={{
          border: '2px solid',
          borderColor: result.hasil?.status_lulus ? '#10b981' : '#ef4444',
          background: result.hasil?.status_lulus ? '#f0fdf4' : '#fef2f2',
          padding: '36px',
          textAlign: 'center',
          borderRadius: '24px',
          boxShadow: '0 12px 30px -5px rgba(0,0,0,0.06)'
        }}>
          {result.hasil?.status_lulus ? (
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Award size={36} />
            </div>
          ) : (
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <XCircle size={36} />
            </div>
          )}

          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            Skor Anda: {result.hasil?.skor}%
          </h3>
          <p style={{ fontSize: '1.02rem', color: '#475569', marginTop: '8px', marginBottom: '24px', fontWeight: 500 }}>
            {result.message}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => setResult(null)} className="btn btn-secondary" style={{ padding: '11px 22px' }}>
              Ulangi Kuis
            </button>
            <button onClick={() => onNavigate('materi')} className="btn btn-primary" style={{ padding: '11px 24px' }}>
              Lanjut Materi Lain <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '26px', padding: '32px' }}>
        {quiz?.pertanyaan?.map((soal, idx) => (
          <div key={soal.id_pertanyaan_quiz} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px', lineHeight: 1.5 }}>
              {idx + 1}. {soal.teks_pertanyaan}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['a', 'b', 'c', 'd'].map((huruf) => {
                const teksPilihan = soal[`pilihan_${huruf}`];
                if (!teksPilihan) return null;

                const isSelected = jawaban[soal.id_pertanyaan_quiz] === huruf;

                return (
                  <button
                    key={huruf}
                    type="button"
                    onClick={() => handleSelectAnswer(soal.id_pertanyaan_quiz, huruf)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1.5px solid',
                      borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      textAlign: 'left',
                      color: isSelected ? '#1d4ed8' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      boxShadow: isSelected ? '0 4px 10px rgba(37, 99, 235, 0.12)' : 'none',
                      transform: isSelected ? 'translateX(4px)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: isSelected ? '#2563eb' : '#f1f5f9',
                      color: isSelected ? 'white' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {huruf.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.94rem', lineHeight: 1.45 }}>{teksPilihan}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', flexWrap: 'wrap', gap: '14px' }}>
          <span style={{ fontSize: '0.92rem', color: '#64748b' }}>
            Progress Dijawab: <strong style={{ color: '#2563eb' }}>{Object.keys(jawaban).length}</strong> dari {quiz?.pertanyaan?.length || 0} butir
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ padding: '14px 34px', fontSize: '0.96rem' }}
          >
            {submitting ? 'Menilai Jawaban...' : 'Kirim Jawaban Kuis'}
          </button>
        </div>
      </form>
    </div>
  );
}
