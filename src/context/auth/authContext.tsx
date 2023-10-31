import { useState, useEffect, createContext, ReactNode } from 'react'
import { authService } from '../../utils/services'

const AuthContext = createContext<null | {
	user: null | { username: string; _id: string; email: string; profilePicture: string }
	isLoading: boolean
	isLoggedIn: boolean
	storeToken: (token: string) => void
	authenticateUser: () => Promise<void>
	removeToken: () => void
	logoutUser: () => void
}>(null)

const AuthContextWrapper = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<null | {
		username: string
		_id: string
		email: string
		profilePicture: string
	}>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

	const storeToken = (token: string) => localStorage.setItem('token', token)

	const authenticateUser = async () => {
		const storedToken = localStorage.getItem('token')
		if (!storedToken) {
			setUser(null)
			setIsLoading(false)
			setIsLoggedIn(false)
		}
		try {
			setIsLoading(true)
			const { data } = await authService.verify()
			setIsLoggedIn(true)
			setUser(data)
			console.log(data)
		} catch (error) {
			removeToken()
			setIsLoggedIn(false)
		} finally {
			setIsLoading(false)
		}
	}

	const removeToken = () => localStorage.removeItem('token')

	const logoutUser = async () => {
		removeToken()
		await authenticateUser()
	}

	useEffect(() => {
		authenticateUser()
	}, [])

	return (
		<AuthContext.Provider
			value={{ user, isLoading, isLoggedIn, storeToken, authenticateUser, removeToken, logoutUser }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContextWrapper, AuthContext }
