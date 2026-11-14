const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  getToken() {
    return localStorage.getItem('vidya_token') || '';
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('vidya_token', token);
    } else {
      localStorage.removeItem('vidya_token');
    }
  },

  getUser() {
    const u = localStorage.getItem('vidya_user');
    return u ? JSON.parse(u) : null;
  },

  setUser(user) {
    if (user) {
      localStorage.setItem('vidya_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vidya_user');
    }
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401) {
          this.setToken(null);
          this.setUser(null);
          window.location.reload();
        }
        const errorMsg = data.message || (data.errors ? Object.values(data.errors).flat().join(', ') : 'Terjadi kesalahan sistem');
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      throw err;
    }
  },

  // Auth
  register(body) {
    return this.request('/register', { method: 'POST', body: JSON.stringify(body) });
  },
  login(body) {
    return this.request('/login', { method: 'POST', body: JSON.stringify(body) });
  },
  logout() {
    return this.request('/logout', { method: 'POST' });
  },
  getMe() {
    return this.request('/me');
  },

  // Anak
  getAnakList() {
    return this.request('/anak');
  },
  createAnak(body) {
    return this.request('/anak', { method: 'POST', body: JSON.stringify(body) });
  },
  deleteAnak(id) {
    return this.request(`/anak/${id}`, { method: 'DELETE' });
  },

  // Assessment Pola Asuh (PSDQ-SF)
  getAssessmentPertanyaan() {
    return this.request('/assessment/pertanyaan');
  },
  submitAssessment(jawaban) {
    return this.request('/assessment/submit', { method: 'POST', body: JSON.stringify({ jawaban }) });
  },
  getAssessmentHistory() {
    return this.request('/assessment/history');
  },

  // Screening Sosial-Emosional Anak (BPSC / PPSC)
  getScreeningPertanyaan(idAnak) {
    return this.request(`/anak/${idAnak}/screening/pertanyaan`);
  },
  submitScreening(idAnak, jawaban) {
    return this.request(`/anak/${idAnak}/screening/submit`, { method: 'POST', body: JSON.stringify({ jawaban }) });
  },
  getScreeningHistory(idAnak) {
    return this.request(`/anak/${idAnak}/screening/history`);
  },

  // Materi / Learning Path
  getMateriList(params = '') {
    return this.request(`/materi${params ? '?' + params : ''}`);
  },
  getMateriDetail(id) {
    return this.request(`/materi/${id}`);
  },
  updateMateriProgress(id, persentase) {
    return this.request(`/materi/${id}/progress`, { method: 'POST', body: JSON.stringify({ persentase }) });
  },

  // Quiz
  getQuizByMateri(idMateri) {
    return this.request(`/materi/${idMateri}/quiz`);
  },
  submitQuiz(idQuiz, jawaban, waktuDetik) {
    return this.request(`/quiz/${idQuiz}/submit`, { method: 'POST', body: JSON.stringify({ jawaban, waktu_detik: waktuDetik }) });
  },
  getQuizHistory() {
    return this.request('/quiz/history');
  },

  // Parenting Mission (ASQ:SE-2)
  getMissionsByAnak(idAnak) {
    return this.request(`/anak/${idAnak}/missions`);
  },
  startMission(idAnak, idMisi) {
    return this.request(`/anak/${idAnak}/missions/${idMisi}/start`, { method: 'POST' });
  },
  completeMission(idAnak, idMisi, catatan) {
    return this.request(`/anak/${idAnak}/missions/${idMisi}/complete`, { method: 'POST', body: JSON.stringify({ catatan }) });
  },

  // Admin APIs
  adminGetUsers() {
    return this.request('/admin/users');
  },
  adminUpdateUser(id, body) {
    return this.request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(body) });
  },
  adminDeleteUser(id) {
    return this.request(`/admin/users/${id}`, { method: 'DELETE' });
  },

  // Soal Asesmen (PSDQ-SF)
  adminGetPertanyaanAssessment() {
    return this.request('/admin/pertanyaan-assessment');
  },
  adminCreatePertanyaanAssessment(body) {
    return this.request('/admin/pertanyaan-assessment', { method: 'POST', body: JSON.stringify(body) });
  },
  adminUpdatePertanyaanAssessment(id, body) {
    return this.request(`/admin/pertanyaan-assessment/${id}`, { method: 'PUT', body: JSON.stringify(body) });
  },
  adminDeletePertanyaanAssessment(id) {
    return this.request(`/admin/pertanyaan-assessment/${id}`, { method: 'DELETE' });
  },

  // Soal Skrining (BPSC & PPSC)
  adminGetPertanyaanScreening() {
    return this.request('/admin/pertanyaan-screening');
  },
  adminCreatePertanyaanScreening(body) {
    return this.request('/admin/pertanyaan-screening', { method: 'POST', body: JSON.stringify(body) });
  },
  adminUpdatePertanyaanScreening(id, body) {
    return this.request(`/admin/pertanyaan-screening/${id}`, { method: 'PUT', body: JSON.stringify(body) });
  },
  adminDeletePertanyaanScreening(id) {
    return this.request(`/admin/pertanyaan-screening/${id}`, { method: 'DELETE' });
  },
};
