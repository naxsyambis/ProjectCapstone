import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import SupportPage from './pages/SupportPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AssessmentPage from './pages/AssessmentPage.jsx'
import AssessmentResultPage from './pages/AssessmentResultPage.jsx'
import LearningPathPage from './pages/LearningPathPage.jsx'
import MateriListPage from './pages/MateriListPage.jsx'
import MateriPage from './pages/MateriPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import QuizResultPage from './pages/QuizResultPage.jsx'
import ScreeningPage from './pages/ScreeningPage.jsx'
import ScreeningFormPage from './pages/ScreeningFormPage.jsx'
import ScreeningResultPage from './pages/ScreeningResultPage.jsx'
import MissionPage from './pages/MissionPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProfileEditPage from './pages/ProfileEditPage.jsx'
import ChildrenPage from './pages/ChildrenPage.jsx'
import ChildFormPage from './pages/ChildFormPage.jsx'
import AccountSettingsPage from './pages/AccountSettingsPage.jsx'
import PrivacySettingsPage from './pages/PrivacySettingsPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import AdminResourcePage from './pages/admin/AdminResourcePage.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import DevStateSwitcher from './components/dev/DevStateSwitcher.jsx'
import { ROLES } from './utils/constants'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="lupa-sandi" element={<ForgotPasswordPage />} />
        <Route path="atur-ulang-sandi" element={<ResetPasswordPage />} />
        <Route path="privasi" element={<PrivacyPolicyPage />} />
        <Route path="ketentuan" element={<TermsPage />} />
        <Route path="dukungan" element={<SupportPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="assessment" element={<AssessmentPage />} />
          <Route path="assessment/hasil" element={<AssessmentResultPage />} />
          <Route path="learning-path" element={<LearningPathPage />} />
          <Route path="materi" element={<MateriListPage />} />
          <Route path="materi/:idMateri" element={<MateriPage />} />
          <Route path="materi/:idMateri/kuis" element={<QuizPage />} />
          <Route path="materi/:idMateri/kuis/hasil" element={<QuizResultPage />} />
          <Route path="screening" element={<ScreeningPage />} />
          <Route path="screening/:idBayi" element={<ScreeningFormPage />} />
          <Route path="screening/:idBayi/hasil" element={<ScreeningResultPage />} />
          <Route path="misi" element={<MissionPage />} />
          <Route path="laporan" element={<ReportPage />} />
          <Route path="profil" element={<ProfilePage />} />
          <Route path="profil/ubah" element={<ProfileEditPage />} />
          <Route path="anak" element={<ChildrenPage />} />
          <Route path="anak/baru" element={<ChildFormPage />} />
          <Route path="anak/:idBayi" element={<ChildFormPage />} />
          <Route path="pengaturan/akun" element={<AccountSettingsPage />} />
          <Route path="pengaturan/privasi" element={<PrivacySettingsPage />} />
          <Route path="pengaturan/notifikasi" element={<ComingSoonPage />} />
        </Route>

        {/* Pembatasan peran di sini hanya untuk kenyamanan. Backend WAJIB memeriksa peran admin di setiap endpoint. */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/:resource" element={<AdminResourcePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {import.meta.env.DEV && <DevStateSwitcher />}
    </>
  )
}