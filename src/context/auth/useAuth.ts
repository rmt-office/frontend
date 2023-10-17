import { useContext } from 'react'
import { AuthContext } from './authContext'

export const useAuthValue = () => {
	const auth = useContext(AuthContext)
	if (auth == null) {
		throw `Use inside the wrapper`
	}

	return auth
}
