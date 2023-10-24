import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
	return (
		<>
			<Navbar />
			<div className='w-5/6 mx-auto'>
				<Routes>
					<Route path='/' element={'Home'} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</div>
		</>
	)
}

export default App
