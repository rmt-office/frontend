import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { useThemeValue } from './context';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import AddPlace from './pages/AddPlaceSplit';
import AddressTab from './pages/AddPlaceSplit/components/AddressTab';
import ContactInfo from './pages/AddPlaceSplit/components/ContactInfo';
import DetailsTab from './pages/AddPlaceSplit/components/DetailsTab';
import Token from './pages/Token';

function App() {
	const { theme } = useThemeValue();
	useEffect(() => {
		const html = document.querySelector('html');
		if (html && theme === 'dark') {
			html.className = 'dark';
		} else if (html) {
			html.className = '';
		}
	}, [theme]);

	return (
		<>
			<Navbar />
			<div className='w-100 mx-auto'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/auth' element={<Token />} />
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
							<ProtectedRoute>
								<AddPlace />
							</ProtectedRoute>
						}
					>
						<Route path='' element={<AddressTab />} />
						<Route path='contactInfo' element={<ContactInfo />} />
						<Route path='details' element={<DetailsTab />} />
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
