import { useState } from 'react'
import { AuthContext } from './AuthContext'
import * as authApi from '../api/auth'
import { NAV_STATE, ROLES } from '../utils/constants'

const MOCK_USER = {
  id_user: 99,
  nama_lengkap: 'Orang Tua Contoh',
  nama_panggilan: 'Ezra',
  email: 'contoh@mail.com',
  role: ROLES.PARENT,
  foto_url: null,
  profil_lengkap: true,
}

const MOCK_ADMIN = {
  id_user: 100,
  nama_lengkap: 'Admin Contoh',
  nama_panggilan: 'Admin',
  email: 'admin@contoh.test',
  role: ROLES.ADMIN,
  foto_url: null,
  profil_lengkap: true,
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hasAssessment, setHasAssessment] = useState(false)

  const applySession = (data) => {
    setUser(data.user)
    setHasAssessment(data.has_assessment)
    return { user: data.user, hasAssessment: data.has_assessment }
  }

  const login = async (credentials) => applySession(await authApi.login(credentials))
  const register = async (payload) => applySession(await authApi.register(payload))

  const completeOnboarding = async (payload) => {
    const data = await authApi.completeOnboarding(payload)
    setUser((current) => ({ ...current, ...data.user }))
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
      setHasAssessment(false)
    }
  }
    const markAssessmentDone = () => setHasAssessment(true)
    const updateUser = (patch) => setUser((current) => (current ? { ...current, ...patch } : current))

  // Khusus uji coba: loncat antar tiga kondisi menu
  const setMockState = (state) => {
    if (state === NAV_STATE.GUEST) {
      setUser(null)
      setHasAssessment(false)
      return
    }
    if (state === NAV_STATE.ADMIN) {
      setUser(MOCK_ADMIN)
      setHasAssessment(false)
      return
    }
    setUser(MOCK_USER)
    setHasAssessment(state === NAV_STATE.ACTIVE_USER)
  }
  
  return (
    <AuthContext.Provider
      value={{ user, hasAssessment, login, register, completeOnboarding, logout, markAssessmentDone, updateUser, setMockState }}
    >
      {children}
    </AuthContext.Provider>
  )
}