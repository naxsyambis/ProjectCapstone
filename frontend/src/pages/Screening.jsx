import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Baby, History, Sparkles } from 'lucide-react';
import { useModal } from '../components/ModalContext';
import { DEFAULT_PERTANYAAN_BPSC, DEFAULT_PERTANYAAN_PPSC } from '../services/initialData';

export default function Screening({ anakList, initialAnakId, onNavigate }) {
  const { showModal, showToast } = useModal();
  const [selectedAnakId, setSelectedAnakId] = useState(initialAnakId || anakList[0]?.id_anak || null);
  
  // Tentukan instrumen default langsung dari umur anak tanpa menunggu loading
  const currentAnak = anakList.find(a => a.id_anak === selectedAnakId) || anakList[0];
  const isBPSC = (currentAnak?.usia_bulan || 0) <= 17;
  
  const [dataScreening, setDataScreening] = useState({
    instrumen_digunakan: isBPSC ? 'BPSC' : 'PPSC',
    usia_bulan: currentAnak?.usia_bulan || 1,
    total_pertanyaan: isBPSC ? DEFAULT_PERTANYAAN_BPSC.length : DEFAULT_PERTANYAAN_PPSC.length,
    pertanyaan: isBPSC ? DEFAULT_PERTANYAAN_BPSC : DEFAULT_PERTANYAAN_PPSC,
  });
  const [jawaban, setJawaban] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [viewMode, setViewMode] = useState('test'); // 'test' | 'history'

  useEffect(() => {
    if (selectedAnakId) {
      loadPertanyaan(selectedAnakId);
      loadHistory(selectedAnakId);
    }
  }, [selectedAnakId]);

  const loadPertanyaan = async (idAnak) => {
    setResult(null);
    setJawaban({});
    try {
      const res = await api.getScreeningPertanyaan(idAnak).catch(() => null);
      if (res && res.pertanyaan?.length) {
        setDataScreening(res);
      } else {
        const anak = anakList.find(a => a.id_anak === idAnak);
        const bpsc = (anak?.usia_bulan || 0) <= 17;
        setDataScreening({
          instrumen_digunakan: bpsc ? 'BPSC' : 'PPSC',
          usia_bulan: anak?.usia_bulan || 1,
          total_pertanyaan: bpsc ? DEFAULT_PERTANYAAN_BPSC.length : DEFAULT_PERTANYAAN_PPSC.length,
          pertanyaan: bpsc ? DEFAULT_PERTANYAAN_BPSC : DEFAULT_PERTANYAAN_PPSC,
        });
      }
    } catch (err) {
      // Pertahankan instrumen awal
    }
  };

  const loadHistory = async (idAnak) => {
    try {
      const res = await api.getScreeningHistory(idAnak);
      setHistory(res || []);
    } catch (err) {
      // diamkan agar tidak spam toast error jika backend offline
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
    const totalSoal = dataScreening?.total_pertanyaan || 0;
    const totalTerisi = Object.keys(jawaban).length;

    if (totalTerisi < totalSoal) {
      showModal({
        title: 'Lengkapi Semua Pertanyaan',
        message: `Mohon jawab semua pertanyaan kuesioner (${totalTerisi} dari ${totalSoal} terisi) untuk mendapatkan akurasi diagnosis instrumen.`,
        type: 'warning',
        confirmText: 'Lanjutkan',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = Object.entries(jawaban).map(([id, skor]) => ({
        id_pertanyaan_screening: parseInt(id),
        skor_item: skor,
      }));

      const res = await api.submitScreening(selectedAnakId, payload);
      setResult(res.screening);
      showToast('Hasil skrining tumbuh kembang berhasil dianalisis!', 'success');
      loadHistory(selectedAnakId);
    } catch (err) {
      showModal({
        title: 'Gagal Memproses Skrining',
        message: err.message,
        type: 'danger',
        confirmText: 'Tutup',
      });
    } finally {
      setSubmitting(false);
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
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Pilih atau Tambahkan Anak Terlebih Dahulu</h3>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '8px', maxWidth: '420px', margin: '8px auto 24px auto', lineHeight: 1.6 }}>
          Skrining sosial-emosional disesuaikan secara khusus dengan tanggal lahir anak untuk memvalidasi instrumen BPSC atau PPSC.
        </p>
        <button onClick={() => onNavigate('anak')} className="btn btn-primary">
          Kelola Data Anak
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Deteksi Dini Sosial-Emosional Anak</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            Skrining ilmiah tervalidasi menggunakan instrumen BPSC (0–17 bln) atau PPSC (18–65 bln).
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

          <button
            onClick={() => setViewMode(viewMode === 'test' ? 'history' : 'test')}
            className="btn btn-secondary"
            style={{ padding: '11px 18px' }}
          >
            <History size={16} /> {viewMode === 'test' ? `Riwayat (${history.length})` : 'Kembali Skrining'}
          </button>
        </div>
      </div>

      {result && (
        <div className="card animate-scale-up" style={{
          border: '2px solid',
          borderColor: result.status_risiko === 'at_risk' ? '#ef4444' : '#10b981',
          background: result.status_risiko === 'at_risk' ? '#fef2f2' : '#f0fdf4',
          padding: '34px',
          borderRadius: '24px',
          boxShadow: '0 12px 30px -5px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '18px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: result.status_risiko === 'at_risk' ? '#fee2e2' : '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {result.status_risiko === 'at_risk' ? (
                <AlertTriangle size={32} color="#dc2626" />
              ) : (
                <CheckCircle2 size={32} color="#15803d" />
              )}
            </div>
            <div>
              <span className={`badge ${result.status_risiko === 'at_risk' ? 'badge-danger' : 'badge-success'}`}>
                Status: {result.status_risiko === 'at_risk' ? 'Terindikasi Risiko (At Risk)' : 'Batas Aman'}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>
                Rekomendasi: {result.rekomendasi === 'rujuk_psikolog' ? 'Konsultasi Profesional / Psikolog Anak' : 'Lanjutkan Stimulasi Parenting Positif'}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.65, marginBottom: '22px' }}>
            {result.catatan_klinis}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('missions', { selectedAnakId })}
              className="btn btn-primary"
            >
              Lihat Misi Parenting yang Cocok <ArrowRight size={16} />
            </button>
            <button onClick={() => setResult(null)} className="btn btn-secondary">
              Tutup Tampilan Hasil
            </button>
          </div>
        </div>
      )}

      {viewMode === 'history' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {history.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '50px 20px', borderRadius: '20px' }}>
              Belum ada riwayat skrining untuk anak ini.
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id_screening} className="card card-interactive" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-info">{item.instrumen_digunakan}</span>
                    <span className={`badge ${item.status_risiko === 'at_risk' ? 'badge-danger' : 'badge-success'}`}>
                      {item.status_risiko === 'at_risk' ? 'Risiko Terindikasi' : 'Aman'}
                    </span>
                    <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: 600 }}>
                      Usia saat tes: {item.usia_anak_saat_screening} Bulan
                    </span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {new Date(item.tanggal_screening).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55 }}>
                  {item.catatan_klinis}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
          <div style={{ background: '#f8fafc', padding: '18px 22px', borderRadius: '14px', fontSize: '0.9rem', color: '#334155', border: '1px solid #e2e8f0', lineHeight: 1.6 }}>
            Instrumen Aktif: <strong style={{ color: '#2563eb' }}>{dataScreening?.instrumen_digunakan}</strong> (Khusus Usia {dataScreening?.usia_bulan} Bulan). <br />
            Pilihan Respon: <strong>0 = Tidak Sama Sekali</strong>, <strong>1 = Agak / Kadang-kadang</strong>, <strong>2 = Sangat Sering</strong>.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dataScreening?.pertanyaan?.map((soal, idx) => (
              <div
                key={soal.id_pertanyaan_screening}
                style={{
                  padding: '18px 22px',
                  borderRadius: '16px',
                  border: '1.5px solid',
                  borderColor: jawaban[soal.id_pertanyaan_screening] !== undefined ? '#bfdbfe' : '#e2e8f0',
                  background: jawaban[soal.id_pertanyaan_screening] !== undefined ? '#f8faff' : '#ffffff',
                  transition: 'all 0.2s ease',
                  boxShadow: jawaban[soal.id_pertanyaan_screening] !== undefined ? '0 2px 8px rgba(37, 99, 235, 0.05)' : 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: jawaban[soal.id_pertanyaan_screening] !== undefined ? '#2563eb' : '#f1f5f9',
                    color: jawaban[soal.id_pertanyaan_screening] !== undefined ? 'white' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.98rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>
                      {soal.teks_pertanyaan}
                    </p>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'capitalize', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
                      Subskala: {soal.subscale?.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', maxWidth: '440px', marginLeft: '46px' }}>
                  {[
                    { val: 0, label: '0 - Tidak Sama Sekali' },
                    { val: 1, label: '1 - Agak' },
                    { val: 2, label: '2 - Sangat' },
                  ].map(({ val, label }) => {
                    const isSelected = jawaban[soal.id_pertanyaan_screening] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleSelectScore(soal.id_pertanyaan_screening, val)}
                        style={{
                          flex: 1,
                          padding: '10px 4px',
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: isSelected ? '#2563eb' : '#cbd5e1',
                          background: isSelected ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#ffffff',
                          color: isSelected ? 'white' : '#475569',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          boxShadow: isSelected ? '0 4px 10px rgba(37, 99, 235, 0.22)' : 'none',
                          transform: isSelected ? 'scale(1.03)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {label}
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
            <span style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Progress Terisi: <strong style={{ color: '#2563eb' }}>{Object.keys(jawaban).length}</strong> dari {dataScreening?.total_pertanyaan} butir
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '0.95rem' }}
            >
              {submitting ? 'Menganalisis Klinis...' : 'Kirim & Analisis Gejala Klinis'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
