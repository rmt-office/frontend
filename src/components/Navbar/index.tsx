import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context'

const Navbar = () => {
	const { user, isLoggedIn, logoutUser } = useAuthValue()
	return (
		<nav className='mb-8 flex items-end justify-between'>
			<h2>
				<Link to={'/'} className='text-2xl'>
					Remote Office
				</Link>
			</h2>
			<div>
				<ul className='flex gap-2'>
					{!isLoggedIn ? (
						<>
							<li className='px-2 py-1 rounded border-solid border-2 border-white hover:cursor-pointer hover:shadow-sm hover:shadow-white'>
								<Link to={'/signup'}>Sign Up</Link>
							</li>
							<li className='px-2 py-1 rounded border-solid border-2 border-white hover:cursor-pointer hover:shadow-sm hover:shadow-white'>
								<Link to={'/login'}>Login</Link>
							</li>
						</>
					) : (
						<>
							<p>Welcome, {user?.username}</p>
							<li>
								<a
									className='text-red-400 bg-gray-800 px-2 py-1 rounded border-solid border-2 border-red-400 hover:cursor-pointer hover:shadow-sm hover:shadow-red-300'
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
