import { useState } from 'react'
import { useAuthValue, useThemeValue } from '../../context'
import { Link } from 'react-router-dom'
import ProfilePictureIcon from '../Icons/ProfilePictureIcon'
import HamburguerMenuIcon from '../Icons/HamburguerMenuIcon'
import CloseIcon from '../Icons/CloseIcon'
import ToggleThemeIcon from '../Icons/ToggleIcon'

const NavMenu = ({ width }: { width: number }) => {
	const { user, isLoggedIn, logoutUser } = useAuthValue()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { theme, toggleTheme } = useThemeValue()

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			{width >= 768 ? (
				<>
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
						<div className='flex flex-col '>
							<div className='flex justify-between '>
								<span onClick={toggleTheme}>
									<ToggleThemeIcon theme={theme} />
								</span>
								<a
									className=' text-white bg-red-500 dark:bg-red-800 px-0.5  rounded border-solid border-2 border-red-500 dark:border-red-800 hover:cursor-pointer hover:shadow-sm hover:shadow-red-300'
									onClick={() => {
										logoutUser()
									}}
								>
									Logout
								</a>
							</div>
							<p>Welcome, {user?.username}</p>
						</div>
					)}
				</>
			) : (
				<>
					<HamburguerMenuIcon handleOpen={handleOpen} />
					{isOpen && (
						<>
							<div
								className='absolute inset-0 z-40 bg-opacity-60 bg-slate-950'
								onClick={handleOpen}
							></div>
							<div className=' bg-gray-200  dark:bg-gray-600 absolute min-h-full w-1/2 top-0 right-0 z-50'>
								<span onClick={toggleTheme} className='absolute left-2 top-2'>
									<ToggleThemeIcon theme={theme} />
								</span>
								<CloseIcon handleOpen={handleOpen} />
								<ul className='flex flex-col ps-8 min-h-screen justify-around'>
									<div className='flex flex-col gap-12'>
										<li className='text-lg'>
											{!isLoggedIn ? (
												'Welcome'
											) : (
												<div className='flex gap-2 items-center'>
													{!user?.profilePicture ? (
														<ProfilePictureIcon />
													) : (
														<img src={user?.profilePicture} alt={user?.username} />
													)}
													{user?.username}
												</div>
											)}
										</li>
										<li className='text-lg'>
											<Link to={'/'} onClick={handleOpen}>
												Home - Find a place
											</Link>
										</li>
										<div>
											<li className='text-lg'>Add a place</li>
											{isLoggedIn ? <li className='text-lg'>Your profile</li> : null}
										</div>
									</div>
									<div className='flex flex-col gap-2'>
										<li className='text-lg'>Send Feedback</li>
										{!isLoggedIn ? (
											<div>
												<li className='text-lg'>
													<Link to={'/signup'} onClick={handleOpen}>
														Sign Up
													</Link>
												</li>
												<li className='text-lg'>
													<Link to={'/login'} onClick={handleOpen}>
														Login
													</Link>
												</li>
											</div>
										) : (
											<>
												<li>
													<a
														className='text-white bg-red-500 dark:bg-red-800 px-0.5  rounded border-solid border-2 border-red-500 dark:border-red-800 hover:cursor-pointer hover:shadow-sm hover:shadow-red-300'
														onClick={() => {
															logoutUser()
														}}
													>
														Logout
													</a>
												</li>
											</>
										)}
									</div>
								</ul>
							</div>
						</>
					)}
				</>
			)}
		</>
	)
}
export default NavMenu
