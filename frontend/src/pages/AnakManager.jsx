import React, { useState } from 'react';
import { api } from '../services/api';
import { Baby, Plus, Trash2, Calendar, FileText, X } from 'lucide-react';
import { useModal } from '../components/ModalContext';

export default function AnakManager({ anakList, onRefresh, onNavigate }) {
  const { confirmAction, showToast } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    catatan: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createAnak(formData);
      setShowModal(false);
      setFormData({ nama: '', tanggal_lahir: '', jenis_kelamin: 'L', catatan: '' });
      showToast(`Data anak ${formData.nama} berhasil ditambahkan!`, 'success');
      onRefresh();
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const confirmed = await confirmAction({
      title: 'Hapus Profil Anak?',
      message: `Apakah Anda yakin ingin menghapus data "${nama}"? Semua riwayat skrining sosial-emosional dan progres misi terkait anak ini akan ikut terhapus permanen.`,
      type: 'danger',
      confirmText: 'Ya, Hapus Data',
      cancelText: 'Batalkan',
    });

    if (confirmed) {
      try {
        await api.deleteAnak(id);
        showToast(`Data anak "${nama}" berhasil dihapus.`, 'success');
        onRefresh();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Data Anak & Balita</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            Kelola profil anak untuk memantau usia tumbuh kembang serta skrining instrumen klinis.
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
          <Plus size={19} /> Tambah Anak Baru
        </button>
      </div>

      {anakList?.length === 0 ? (
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>Belum Ada Data Anak</h3>
          <p style={{ color: '#64748b', fontSize: '0.94rem', marginTop: '8px', maxWidth: '420px', margin: '8px auto 24px auto', lineHeight: 1.6 }}>
            Tambahkan profil buah hati Anda untuk mulai melakukan asesmen tumbuh kembang sosial-emosional secara terukur.
          </p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={18} /> Daftarkan Anak Sekarang
          </button>
        </div>
      ) : (
        <div className="grid-cols-2">
          {anakList.map((anak) => (
            <div key={anak.id_anak} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      background: anak.jenis_kelamin === 'L' ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                      color: anak.jenis_kelamin === 'L' ? '#1d4ed8' : '#be185d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.4rem',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.04)'
                    }}>
                      {anak.nama.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{anak.nama}</h3>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        <span className={`badge ${anak.jenis_kelamin === 'L' ? 'badge-info' : 'badge-danger'}`}>
                          {anak.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}
                        </span>
                        <span className="badge badge-warning">
                          {anak.usia_bulan} Bulan
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(anak.id_anak, anak.nama)}
                    className="btn-outline-danger"
                    style={{ padding: '8px', borderRadius: '10px' }}
                    title="Hapus Anak"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '0.9rem',
                  color: '#475569'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={16} color="#64748b" />
                    <span>Lahir: <strong>{new Date(anak.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></span>
                  </div>
                  {anak.catatan && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <FileText size={16} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>"{anak.catatan}"</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '22px' }}>
                <button
                  onClick={() => onNavigate('screening', { selectedAnakId: anak.id_anak })}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }}
                >
                  Mulai Skrining
                </button>
                <button
                  onClick={() => onNavigate('missions', { selectedAnakId: anak.id_anak })}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }}
                >
                  Lihat Misi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Modal Form Tambah Anak */}
      {showModal && (
        <div className="popup-backdrop animate-fade-in" onClick={() => setShowModal(false)}>
          <div
            className="popup-dialog animate-scale-up"
            style={{ maxWidth: '520px', textAlign: 'left', alignItems: 'stretch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="popup-close-btn"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Baby size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Tambah Data Anak</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Data ini digunakan untuk menentukan jenis kuesioner medis.</p>
              </div>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px 16px', borderRadius: '10px', fontSize: '0.88rem', marginBottom: '16px', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
                  Nama Lengkap Anak *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rayyan"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
                  Tanggal Lahir *
                </label>
                <input
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.tanggal_lahir}
                  onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                  Jenis Kelamin *
                </label>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="L"
                      checked={formData.jenis_kelamin === 'L'}
                      onChange={() => setFormData({ ...formData, jenis_kelamin: 'L' })}
                    />
                    Laki-Laki
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="P"
                      checked={formData.jenis_kelamin === 'P'}
                      onChange={() => setFormData({ ...formData, jenis_kelamin: 'P' })}
                    />
                    Perempuan
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows="3"
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Misal: Riwayat alergi, fase tumbuh gigi, perkembangan motorik..."
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px' }}
                >
                  {loading ? 'Menyimpan...' : 'Simpan Profil Anak'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
