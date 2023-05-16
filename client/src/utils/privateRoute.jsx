import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { checkAuth } from '../redux/features/auth/authSlice'

export const PrivateRoute = () => {
  const isAuth = useSelector(checkAuth)
  if (!isAuth) return <Navigate to={'/login'} />
  return <Outlet />
}
