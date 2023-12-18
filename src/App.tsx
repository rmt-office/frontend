import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { useThemeValue } from './context'
import { useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './pages/UserProfile'
import AddPlace from './pages/AddPlace'

function App() {
	const { theme } = useThemeValue()
	useEffect(() => {
		const html = document.querySelector('html')
		if (html && theme === 'dark') {
			html.className = 'dark'
		} else if (html) {
			html.className = ''
		}
	}, [theme])

	return (
		<>
			<Navbar />
			<div className='w-100 mx-auto'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/user'
						element={
							<ProtectedRoute>
								<UserProfile />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/add'
						element={
							// TODO: Remove after finish the form
							// <ProtectedRoute>
								<AddPlace />
							// </ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</>
	)
}

export default App
