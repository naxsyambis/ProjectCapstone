import React from 'react';
import { 
  Users, 
  ClipboardCheck, 
  BookOpen, 
  Target, 
  Award, 
  Baby, 
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function Dashboard({ user, anakList, latestAssessment, onNavigate }) {
  const primaryAnak = anakList?.[0] || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Welcome Banner - Editorial SaaS Style */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', padding: '5px 12px', fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(6px)' }}>
              ✦ Portal Parenting Tervalidasi
            </span>
            <span style={{ color: '#93c5fd', fontSize: '0.85rem', fontWeight: 500 }}>
              Update Terakhir: Hari Ini
            </span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.03em', marginBottom: '12px' }}>
            Selamat Datang, {user?.nama_lengkap || 'Ayah & Bunda'}! 👋
          </h1>
          <p style={{ opacity: 0.92, fontSize: '1rem', lineHeight: 1.6, maxWidth: '640px', marginBottom: '26px', color: '#e0f2fe' }}>
            Pantau pertumbuhan sosial-emosional si kecil secara objektif menggunakan instrumen psikologi standar (PSDQ, BPSC & PPSC) serta modul panduan harian.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('assessment')}
              className="btn"
              style={{ background: '#ffffff', color: '#1e40af', fontWeight: 700, padding: '12px 24px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)' }}
            >
              Mulai Asesmen Pola Asuh <ArrowUpRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('screening')}
              className="btn"
              style={{ background: 'rgba(255, 255, 255, 0.16)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.35)', padding: '12px 22px', backdropFilter: 'blur(8px)' }}
            >
              <ShieldCheck size={18} /> Deteksi Dini Anak
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row - Modern SaaS Metric Cards with Accent Accents */}
      <div className="grid-cols-3">
        {/* Metric 1 */}
        <div className="metric-card metric-card-blue">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="metric-label">Profil Anak Terdaftar</span>
              <div className="metric-value">{anakList?.length || 0}</div>
            </div>
            <div className="metric-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Baby size={24} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
            <span style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={15} /> Aktif dalam pemantauan
            </span>
            <button onClick={() => onNavigate('anak')} style={{ color: '#2563eb', fontWeight: 700 }}>
              Kelola →
            </button>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="metric-card metric-card-green">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="metric-label">Gaya Pengasuhan Dominan</span>
              <div className="metric-value" style={{ fontSize: '1.45rem', textTransform: 'capitalize' }}>
                {latestAssessment?.gaya_dominan || 'Belum Diuji'}
              </div>
            </div>
            <div className="metric-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
              <ClipboardCheck size={24} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748b' }}>
              {latestAssessment ? `Skor Autoritatif: ${latestAssessment.skor_autoritatif || 0}/5.0` : '32 Butir Kuesioner PSDQ'}
            </span>
            <button onClick={() => onNavigate('assessment')} style={{ color: '#059669', fontWeight: 700 }}>
              Detail →
            </button>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="metric-card metric-card-purple">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="metric-label">Jalur Kurikulum Terfokus</span>
              <div className="metric-value" style={{ fontSize: '1.35rem' }}>
                Learning Path
              </div>
            </div>
            <div className="metric-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <BookOpen size={24} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
            <span style={{ color: '#7c3aed', fontWeight: 600 }}>
              Materi & Quiz Rekomendasi
            </span>
            <button onClick={() => onNavigate('materi')} style={{ color: '#7c3aed', fontWeight: 700 }}>
              Buka →
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Anak Status & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        {/* Left Column: Profil Anak Aktif & Status Skrining */}
        <div className="card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                Pemantauan Tumbuh Kembang Buah Hati
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                Deteksi risiko klinis perilaku, kecemasan, dan interaksi sosial anak.
              </p>
            </div>
            <button onClick={() => onNavigate('anak')} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              + Tambah Anak
            </button>
          </div>

          {anakList && anakList.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {anakList.map((anak) => {
                const isBPSC = (anak.usia_bulan || 0) <= 17;
                return (
                  <div
                    key={anak.id_anak}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 20px',
                      background: '#f8fafc',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: anak.jenis_kelamin === 'L' ? '#eff6ff' : '#fdf2f8',
                        color: anak.jenis_kelamin === 'L' ? '#2563eb' : '#db2777',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.1rem'
                      }}>
                        {anak.nama?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.02rem', color: '#0f172a' }}>
                          {anak.nama}
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '2px' }}>
                          Usia: <strong style={{ color: '#2563eb' }}>{anak.usia_bulan || 0} Bulan</strong> • {anak.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                        Instrumen: {isBPSC ? 'BPSC (0-17 bln)' : 'PPSC (18-65 bln)'}
                      </span>
                      <button
                        onClick={() => onNavigate('screening', { selectedAnakId: anak.id_anak })}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                      >
                        Skrining Sekarang
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '16px', border: '1.5px dashed #cbd5e1' }}>
              <Baby size={40} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>Belum ada data anak yang didaftarkan</h4>
              <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '4px', maxWidth: '340px', margin: '4px auto 16px auto' }}>
                Tambahkan profil anak pertama Anda untuk membuka fitur evaluasi klinis instrumen BPSC/PPSC.
              </p>
              <button onClick={() => onNavigate('anak')} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                Daftarkan Anak Sekarang
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Workflow Steps Card */}
        <div className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Alur Tahapan Parenting
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>Asesmen Gaya Pengasuhan</h5>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px', lineHeight: 1.5 }}>
                    Ketahui skor kecenderungan pola asuh Anda melalui 32 butir kuesioner ilmiah.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>Deteksi Dini Emosi Anak</h5>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px', lineHeight: 1.5 }}>
                    Skrining gejala klinis perilaku berdasarkan cut-off usia bayi & balita.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>Misi Harian & Refleksi</h5>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px', lineHeight: 1.5 }}>
                    Terapkan latihan interaktif sehari-hari bersama buah hati Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
            <button
              onClick={() => onNavigate('missions')}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
            >
              <Target size={16} /> Buka Misi Harian Hari Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
