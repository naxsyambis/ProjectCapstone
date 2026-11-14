import React, { useState } from 'react';
import { api } from '../services/api';
import { Heart, Sparkles, Shield, ArrowRight, CheckCircle2, Award, Users, BookOpen } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    password: '',
    password_confirmation: '',
    nomor_hp: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let res;
      if (isRegister) {
        res = await api.register(formData);
      } else {
        res = await api.login({
          email: formData.email,
          password: formData.password,
        });
      }

      if (res && res.token) {
        api.setToken(res.token);
        api.setUser(res.user);
        onLoginSuccess(res.user);
      } else {
        throw new Error('Token otentikasi tidak diterima.');
      }
    } catch (err) {
      setError(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Kolom Kiri: Branding & Informasi Medis Edukasi (Professional Hero Showcase) */}
      <div className="auth-hero-panel">
        <div className="auth-hero-content">
          <div className="auth-brand-badge">
            <div className="logo-badge" style={{ width: '42px', height: '42px' }}>
              <Heart size={22} fill="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
                Vidya Parent
              </h2>
              <span style={{ fontSize: '0.78rem', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Clinical Parenting Platform
              </span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', marginBottom: 'auto', paddingTop: '40px', paddingBottom: '40px' }}>
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)', marginBottom: '18px', padding: '6px 14px', backdropFilter: 'blur(4px)' }}>
              Standar Klinis AAP & CDC
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Bimbingan Pola Asuh & Skrining Dini Berbasis Bukti Ilmiah.
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#e0f2fe', lineHeight: 1.65, maxWidth: '480px', marginBottom: '36px' }}>
              Dampingi masa keemasan buah hati Anda melalui evaluasi gaya pengasuhan tervalidasi PSDQ-SF serta deteksi dini sosial-emosional BPSC & PPSC.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={16} color="#67e8f9" />
                </div>
                <span style={{ color: '#f8fafc', fontSize: '0.94rem', fontWeight: 500 }}>
                  Diagnosis otomatis gaya asuh (Autoritatif, Otoriter, Permisif)
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={16} color="#67e8f9" />
                </div>
                <span style={{ color: '#f8fafc', fontSize: '0.94rem', fontWeight: 500 }}>
                  Skrining tumbuh kembang usia 0–65 bulan dengan skor cut-off klinis
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={16} color="#67e8f9" />
                </div>
                <span style={{ color: '#f8fafc', fontSize: '0.94rem', fontWeight: 500 }}>
                  Modul micro-learning terarah & misi harian interaktif
                </span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#93c5fd' }}>
            <span>© 2026 Vidya Parent Research Foundation</span>
            <span>Versi Klinis 2.4.0</span>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Form Login / Register */}
      <div className="auth-form-panel">
        <div className="auth-form-card animate-scale-up">
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {isRegister ? 'Registrasi Akun Baru' : 'Selamat Datang Kembali'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.94rem' }}>
              {isRegister
                ? 'Lengkapi data Anda untuk memulai perjalanan parenting terstruktur.'
                : 'Masuk ke portal Vidya Parent untuk memantau profil buah hati.'}
            </p>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '14px 18px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              marginBottom: '22px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontWeight: 600 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {isRegister && (
              <div>
                <label className="form-label">Nama Lengkap Orang Tua</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dinda Kartika, S.Psi"
                  value={formData.nama_lengkap}
                  onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                  className="form-input"
                />
              </div>
            )}

            <div>
              <label className="form-label">Alamat Email</label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>

            {isRegister && (
              <div>
                <label className="form-label">Nomor WhatsApp / HP</label>
                <input
                  type="tel"
                  placeholder="081234567890"
                  value={formData.nomor_hp}
                  onChange={(e) => setFormData({ ...formData, nomor_hp: e.target.value })}
                  className="form-input"
                />
              </div>
            )}

            <div>
              <label className="form-label">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-input"
              />
            </div>

            {isRegister && (
              <div>
                <label className="form-label">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  className="form-input"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 700,
                marginTop: '10px',
                justifyContent: 'center'
              }}
            >
              {loading ? (
                'Memproses...'
              ) : (
                <>
                  {isRegister ? 'Daftar Sekarang' : 'Masuk ke Akun'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
            fontSize: '0.92rem',
            color: '#64748b'
          }}>
            {isRegister ? 'Sudah memiliki akun terdaftar?' : 'Belum memiliki akun orang tua?'}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={{
                marginLeft: '8px',
                color: '#2563eb',
                fontWeight: 700,
                textDecoration: 'underline'
              }}
            >
              {isRegister ? 'Masuk di Sini' : 'Daftar Akun Baru'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
