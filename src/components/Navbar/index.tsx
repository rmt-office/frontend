import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context'
import { useEffect, useState } from 'react'

function getWindowSize() {
	const { innerWidth } = window
	return innerWidth
}

const Navbar = () => {
	const { user, isLoggedIn, logoutUser } = useAuthValue()
	const [width, setWidth] = useState<number>(getWindowSize())

	useEffect(() => {
		function handleWindowResize() {
			setWidth(getWindowSize())
		}

		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	return (
		<nav className='mb-8 flex items-end justify-between'>
			<h2>
				<Link to={'/'} className='text-2xl'>
					Remote Office
				</Link>
			</h2>
			<div>
				{/* TODO: Hambuger menu */}
				{width}
				{width >= 768 ? <p>Bigger than 768</p> : <p>Smaller than 768</p>}
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
