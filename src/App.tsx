import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { useThemeValue } from './context'
import { useEffect } from 'react'

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
				</Routes>
			</div>
		</>
	)
}

export default App
