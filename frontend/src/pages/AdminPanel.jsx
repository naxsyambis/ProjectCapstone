import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Users, 
  ClipboardCheck, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useModal } from '../components/ModalContext';

export default function AdminPanel() {
  const { confirmAction, showToast } = useModal();
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'assessment' | 'screening'
  const [users, setUsers] = useState([]);
  const [pertanyaanAss, setPertanyaanAss] = useState([]);
  const [pertanyaanScr, setPertanyaanScr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Forms
  const [editUserModal, setEditUserModal] = useState(null);
  const [userFormData, setUserFormData] = useState({ nama_lengkap: '', email: '', role: 'orang_tua', nomor_hp: '', password: '' });

  const [assModal, setAssModal] = useState(false);
  const [editingAssId, setEditingAssId] = useState(null);
  const [assFormData, setAssFormData] = useState({
    nomor_item: '',
    teks_pertanyaan: '',
    gaya_asuh: 'autoritatif',
    dimensi: 'support_afeksi',
  });

  const [scrModal, setScrModal] = useState(false);
  const [editingScrId, setEditingScrId] = useState(null);
  const [scrFormData, setScrFormData] = useState({
    instrumen: 'BPSC',
    nomor_item: '',
    subscale: 'irritability',
    teks_pertanyaan: '',
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await api.adminGetUsers();
        setUsers(res || []);
      } else if (activeTab === 'assessment') {
        const res = await api.adminGetPertanyaanAssessment();
        setPertanyaanAss(res || []);
      } else if (activeTab === 'screening') {
        const res = await api.adminGetPertanyaanScreening();
        setPertanyaanScr(res || []);
      }
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // ==================== USER HANDLERS ====================
  const handleEditUser = (user) => {
    setEditUserModal(user);
    setUserFormData({
      nama_lengkap: user.nama_lengkap,
      email: user.email,
      role: user.role,
      nomor_hp: user.nomor_hp || '',
      password: '',
    });
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      await api.adminUpdateUser(editUserModal.id_user, userFormData);
      showToast('Data user berhasil diperbarui.', 'success');
      setEditUserModal(null);
      loadData();
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = await confirmAction({
      title: 'Hapus Akun Pengguna?',
      message: `Yakin ingin menghapus user "${user.nama_lengkap}" (${user.email})? Semua data anak, riwayat asesmen, dan progres belajar terkait akan terhapus permanen.`,
      type: 'danger',
      confirmText: 'Ya, Hapus Pengguna',
      cancelText: 'Batal',
    });

    if (confirmed) {
      try {
        await api.adminDeleteUser(user.id_user);
        showToast(`User ${user.nama_lengkap} berhasil dihapus.`, 'success');
        loadData();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };

  // ==================== ASESMEN SOAL HANDLERS ====================
  const handleOpenAssModal = (item = null) => {
    if (item) {
      setEditingAssId(item.id_pertanyaan_assessment);
      setAssFormData({
        nomor_item: item.nomor_item,
        teks_pertanyaan: item.teks_pertanyaan,
        gaya_asuh: item.gaya_asuh,
        dimensi: item.dimensi,
      });
    } else {
      setEditingAssId(null);
      const nextNum = (pertanyaanAss.length ? Math.max(...pertanyaanAss.map(p => p.nomor_item)) + 1 : 1);
      setAssFormData({
        nomor_item: nextNum,
        teks_pertanyaan: '',
        gaya_asuh: 'autoritatif',
        dimensi: 'support_afeksi',
      });
    }
    setAssModal(true);
  };

  const handleSaveAss = async (e) => {
    e.preventDefault();
    try {
      if (editingAssId) {
        await api.adminUpdatePertanyaanAssessment(editingAssId, assFormData);
        showToast('Butir soal asesmen berhasil diperbarui.', 'success');
      } else {
        await api.adminCreatePertanyaanAssessment(assFormData);
        showToast('Butir soal asesmen baru berhasil ditambahkan.', 'success');
      }
      setAssModal(false);
      loadData();
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  const handleDeleteAss = async (id, nomor) => {
    const confirmed = await confirmAction({
      title: 'Hapus Soal Asesmen?',
      message: `Apakah Anda yakin ingin menghapus butir pertanyaan asesmen nomor #${nomor}?`,
      type: 'danger',
      confirmText: 'Hapus Soal',
      cancelText: 'Batal',
    });

    if (confirmed) {
      try {
        await api.adminDeletePertanyaanAssessment(id);
        showToast(`Butir soal #${nomor} berhasil dihapus.`, 'success');
        loadData();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };

  // ==================== SKRINING SOAL HANDLERS ====================
  const handleOpenScrModal = (item = null) => {
    if (item) {
      setEditingScrId(item.id_pertanyaan_screening);
      setScrFormData({
        instrumen: item.instrumen,
        nomor_item: item.nomor_item,
        subscale: item.subscale,
        teks_pertanyaan: item.teks_pertanyaan,
      });
    } else {
      setEditingScrId(null);
      const bpscSoal = pertanyaanScr.filter(p => p.instrumen === 'BPSC');
      const nextNum = bpscSoal.length ? Math.max(...bpscSoal.map(p => p.nomor_item)) + 1 : 1;
      setScrFormData({
        instrumen: 'BPSC',
        nomor_item: nextNum,
        subscale: 'irritability',
        teks_pertanyaan: '',
      });
    }
    setScrModal(true);
  };

  const handleSaveScr = async (e) => {
    e.preventDefault();
    try {
      if (editingScrId) {
        await api.adminUpdatePertanyaanScreening(editingScrId, scrFormData);
        showToast('Soal skrining anak berhasil diperbarui.', 'success');
      } else {
        await api.adminCreatePertanyaanScreening(scrFormData);
        showToast('Soal skrining anak baru berhasil ditambahkan.', 'success');
      }
      setScrModal(false);
      loadData();
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  const handleDeleteScr = async (id, nomor, instrumen) => {
    const confirmed = await confirmAction({
      title: 'Hapus Soal Skrining?',
      message: `Apakah Anda yakin ingin menghapus butir soal instrumen ${instrumen} nomor #${nomor}?`,
      type: 'danger',
      confirmText: 'Hapus Soal',
      cancelText: 'Batal',
    });

    if (confirmed) {
      try {
        await api.adminDeletePertanyaanScreening(id);
        showToast(`Soal ${instrumen} #${nomor} berhasil dihapus.`, 'success');
        loadData();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Admin */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Admin Control Center</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
            Kelola data akun pengguna, butir instrumen Asesmen Pola Asuh Orang Tua, dan Skrining Anak.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '5px', borderRadius: '14px', gap: '6px', border: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setActiveTab('users')}
            className="btn"
            style={{
              padding: '9px 18px',
              fontSize: '0.9rem',
              fontWeight: 700,
              borderRadius: '10px',
              background: activeTab === 'users' ? 'white' : 'transparent',
              color: activeTab === 'users' ? '#2563eb' : '#64748b',
              boxShadow: activeTab === 'users' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <Users size={16} /> Kelola Pengguna
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className="btn"
            style={{
              padding: '9px 18px',
              fontSize: '0.9rem',
              fontWeight: 700,
              borderRadius: '10px',
              background: activeTab === 'assessment' ? 'white' : 'transparent',
              color: activeTab === 'assessment' ? '#2563eb' : '#64748b',
              boxShadow: activeTab === 'assessment' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <ClipboardCheck size={16} /> Soal Asesmen (PSDQ)
          </button>
          <button
            onClick={() => setActiveTab('screening')}
            className="btn"
            style={{
              padding: '9px 18px',
              fontSize: '0.9rem',
              fontWeight: 700,
              borderRadius: '10px',
              background: activeTab === 'screening' ? 'white' : 'transparent',
              color: activeTab === 'screening' ? '#2563eb' : '#64748b',
              boxShadow: activeTab === 'screening' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <ShieldCheck size={16} /> Soal Skrining Anak
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. TAB KELOLA USER */}
      {/* ======================================================== */}
      {activeTab === 'users' && (
        <div className="card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Daftar Pengguna Terdaftar ({users.length})</h3>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '8px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', width: '220px' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Pengguna</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Role</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>No. HP</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Jumlah Anak</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
                  <tr key={u.id_user} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.nama_lengkap}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                        {u.role === 'admin' ? 'Admin' : 'Orang Tua'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#475569' }}>{u.nomor_hp || '-'}</td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>{u.anak_count || 0} Anak</td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEditUser(u)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="btn-outline-danger"
                          style={{ padding: '6px 10px', borderRadius: '8px' }}
                          title="Hapus Pengguna"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TAB KELOLA SOAL ASESMEN POLA ASUH (PSDQ-SF) */}
      {/* ======================================================== */}
      {activeTab === 'assessment' && (
        <div className="card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Bank Soal Asesmen Pola Asuh ({pertanyaanAss.length} Butir)</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Standar Instrumen PSDQ-SF (Autoritatif, Otoriter, Permisif)</p>
            </div>
            <button onClick={() => handleOpenAssModal()} className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              <Plus size={16} /> Tambah Butir Soal
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pertanyaanAss.map((soal) => (
              <div
                key={soal.id_pertanyaan_assessment}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
                  <span style={{ fontWeight: 800, color: '#2563eb', width: '32px', fontSize: '1rem' }}>#{soal.nomor_item}</span>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{soal.teks_pertanyaan}</div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <span className="badge badge-info" style={{ textTransform: 'capitalize' }}>{soal.gaya_asuh}</span>
                      <span className="badge badge-warning" style={{ textTransform: 'capitalize' }}>{soal.dimensi?.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <button onClick={() => handleOpenAssModal(soal)} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: '0.82rem' }}>
                    <Edit3 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDeleteAss(soal.id_pertanyaan_assessment, soal.nomor_item)} className="btn-outline-danger" style={{ padding: '7px 10px', borderRadius: '8px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. TAB KELOLA SOAL SKRINING ANAK (BPSC / PPSC) */}
      {/* ======================================================== */}
      {activeTab === 'screening' && (
        <div className="card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Bank Soal Skrining Anak ({pertanyaanScr.length} Butir)</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Instrumen BPSC (Bayi 0-17 Bulan) & PPSC (Balita 18-65 Bulan)</p>
            </div>
            <button onClick={() => handleOpenScrModal()} className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              <Plus size={16} /> Tambah Soal Skrining
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pertanyaanScr.map((soal) => (
              <div
                key={soal.id_pertanyaan_screening}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
                  <span className={`badge ${soal.instrumen === 'BPSC' ? 'badge-info' : 'badge-success'}`}>
                    {soal.instrumen} #{soal.nomor_item}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{soal.teks_pertanyaan}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px', textTransform: 'capitalize', fontWeight: 600 }}>
                      Subskala: {soal.subscale?.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <button onClick={() => handleOpenScrModal(soal)} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: '0.82rem' }}>
                    <Edit3 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDeleteScr(soal.id_pertanyaan_screening, soal.nomor_item, soal.instrumen)} className="btn-outline-danger" style={{ padding: '7px 10px', borderRadius: '8px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL EDIT USER */}
      {/* ======================================================== */}
      {editUserModal && (
        <div className="popup-backdrop animate-fade-in" onClick={() => setEditUserModal(null)}>
          <div
            className="popup-dialog animate-scale-up"
            style={{ maxWidth: '480px', textAlign: 'left', alignItems: 'stretch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close-btn" onClick={() => setEditUserModal(null)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '18px', color: '#0f172a' }}>
              Edit Akun Pengguna
            </h3>
            <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={userFormData.nama_lengkap}
                  onChange={(e) => setUserFormData({ ...userFormData, nama_lengkap: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Alamat Email</label>
                <input
                  type="email"
                  required
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Hak Akses (Role)</label>
                <select
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: 600 }}
                >
                  <option value="orang_tua">Orang Tua</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  value={userFormData.nomor_hp}
                  onChange={(e) => setUserFormData({ ...userFormData, nomor_hp: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Reset Kata Sandi (Opsional)</label>
                <input
                  type="password"
                  placeholder="Kosongkan jika tidak ingin mengubah..."
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditUserModal(null)} className="btn btn-secondary">Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL ASESMEN SOAL */}
      {/* ======================================================== */}
      {assModal && (
        <div className="popup-backdrop animate-fade-in" onClick={() => setAssModal(false)}>
          <div
            className="popup-dialog animate-scale-up"
            style={{ maxWidth: '520px', textAlign: 'left', alignItems: 'stretch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close-btn" onClick={() => setAssModal(false)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '18px', color: '#0f172a' }}>
              {editingAssId ? 'Edit Soal Asesmen Pola Asuh' : 'Tambah Soal Asesmen Pola Asuh'}
            </h3>
            <form onSubmit={handleSaveAss} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Nomor Item (1-32)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={assFormData.nomor_item}
                  onChange={(e) => setAssFormData({ ...assFormData, nomor_item: parseInt(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Gaya Asuh Target</label>
                <select
                  value={assFormData.gaya_asuh}
                  onChange={(e) => setAssFormData({ ...assFormData, gaya_asuh: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: 600 }}
                >
                  <option value="autoritatif">Autoritatif (Demokratis)</option>
                  <option value="otoriter">Otoriter</option>
                  <option value="permisif">Permisif</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Dimensi</label>
                <select
                  value={assFormData.dimensi}
                  onChange={(e) => setAssFormData({ ...assFormData, dimensi: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: 600 }}
                >
                  <option value="support_afeksi">Support & Afeksi (Autoritatif)</option>
                  <option value="regulasi">Regulasi Induktif (Autoritatif)</option>
                  <option value="otonomi">Otonomi Demokratis (Autoritatif)</option>
                  <option value="koersi_fisik">Koersi Fisik (Otoriter)</option>
                  <option value="hostilitas_verbal">Hostilitas Verbal (Otoriter)</option>
                  <option value="hukuman">Hukuman Non-Fisik (Otoriter)</option>
                  <option value="indulgensi">Indulgensi (Permisif)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Teks Pernyataan / Pertanyaan</label>
                <textarea
                  rows="3"
                  required
                  value={assFormData.teks_pertanyaan}
                  onChange={(e) => setAssFormData({ ...assFormData, teks_pertanyaan: e.target.value })}
                  placeholder="Misal: Memberikan pelukan hangat saat anak merasa sedih..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setAssModal(false)} className="btn btn-secondary">Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Soal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL SKRINING SOAL */}
      {/* ======================================================== */}
      {scrModal && (
        <div className="popup-backdrop animate-fade-in" onClick={() => setScrModal(false)}>
          <div
            className="popup-dialog animate-scale-up"
            style={{ maxWidth: '520px', textAlign: 'left', alignItems: 'stretch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close-btn" onClick={() => setScrModal(false)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '18px', color: '#0f172a' }}>
              {editingScrId ? 'Edit Soal Skrining Anak' : 'Tambah Soal Skrining Anak'}
            </h3>
            <form onSubmit={handleSaveScr} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Instrumen Skrining</label>
                <select
                  value={scrFormData.instrumen}
                  onChange={(e) => setScrFormData({ ...scrFormData, instrumen: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: 600 }}
                >
                  <option value="BPSC">BPSC (Bayi 0 - 17 Bulan)</option>
                  <option value="PPSC">PPSC (Anak 18 - 65 Bulan)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Nomor Item</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={scrFormData.nomor_item}
                  onChange={(e) => setScrFormData({ ...scrFormData, nomor_item: parseInt(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Subskala Gejala</label>
                <input
                  type="text"
                  required
                  value={scrFormData.subscale}
                  onChange={(e) => setScrFormData({ ...scrFormData, subscale: e.target.value })}
                  placeholder="Contoh: irritability, externalizing, attention, routines"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>Teks Pertanyaan Gejala</label>
                <textarea
                  rows="3"
                  required
                  value={scrFormData.teks_pertanyaan}
                  onChange={(e) => setScrFormData({ ...scrFormData, teks_pertanyaan: e.target.value })}
                  placeholder="Misal: Apakah anak mudah tersinggung atau menangis hebat saat rutinitas berubah?"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setScrModal(false)} className="btn btn-secondary">Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Soal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
