import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth()

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={ROUTES.HOME} replace />

  return <Outlet />
}