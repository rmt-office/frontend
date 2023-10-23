import { Link } from 'react-router-dom'
import './Navbar.css'
import { useAuthValue } from '../../context'

const Navbar = () => {
	const { user, isLoggedIn, logoutUser } = useAuthValue()
	return (
		<nav className='mb-8'>
			<h2>
				<Link to={'/'} className='text-2xl'>
					Remote Office
				</Link>
			</h2>
			<div>
				<ul>
					{!isLoggedIn ? (
						<>
							<li>
								<Link to={'/signup'}>Sign Up</Link>
							</li>
							<li>
								<Link to={'/login'}>Login</Link>
							</li>
						</>
					) : (
						<>
							<p>Welcome, {user?.username}</p>
							<li>
								<a
									className='text-red-400 bg-gray-800 px-2 py-2 rounded border-solid border-2 border-red-400 hover:cursor-pointer hover:shadow-sm hover:shadow-red-300'
									onClick={() => {
										logoutUser()
									}}
								>
									Logout
								</a>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	)
}
export default Navbar
