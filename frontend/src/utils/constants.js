export const ROLES = {
  PARENT: 'orang_tua',
  ADMIN: 'admin',
}

export const NAV_STATE = {
  GUEST: 'guest',
  NEW_USER: 'new_user',
  ACTIVE_USER: 'active_user',
  ADMIN: 'admin'
}

export const ONBOARDING_STEPS = ['Buat akun', 'Lengkapi profil', 'Mulai penilaian']

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/lupa-sandi',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  ASSESSMENT: '/assessment',
  ASSESSMENT_RESULT: '/assessment/hasil',
  LEARNING_PATH: '/learning-path',
  MATERI: '/materi',
  SCREENING: '/screening',
  MISSION: '/misi',
  REPORT: '/laporan',
  PROFILE: '/profil',
  TERMS: '/ketentuan',
  PRIVACY: '/privasi',
  SUPPORT: '/dukungan',
  CHILDREN: '/anak',
  CHILD_NEW: '/anak/baru',
  PROFILE_EDIT: '/profil/ubah',
  SETTINGS_NOTIFICATIONS: '/pengaturan/notifikasi',
  SETTINGS_ACCOUNT: '/pengaturan/akun',
  SETTINGS_PRIVACY: '/pengaturan/privasi',
  RESET_PASSWORD: '/atur-ulang-sandi',
  ADMIN: '/admin',
}

export const OPSI_JENIS_KELAMIN = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' },
]