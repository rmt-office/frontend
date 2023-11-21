import { Navigate } from 'react-router-dom'
import { useAuthValue } from '../../context'
import { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useAuthValue()

	return user ? children : <Navigate to={'/login'} />
}
export default ProtectedRoute
