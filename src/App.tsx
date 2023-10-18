import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={'Home'} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logout' element={'logout'} />
			</Routes>
		</>
	)
}

export default App
