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
						<span className='flex items-end gap-4'>
							<ToggleThemeIcon theme={theme} onClick={toggleTheme} />

							<li>
								<Link to={'/signup'}>Sign Up</Link>
							</li>
							<li>
								<Link to={'/login'}>Login</Link>
							</li>
						</span>
					) : (
						<div className='flex gap-6 items-center'>
							<ToggleThemeIcon theme={theme} onClick={toggleTheme} />

							<Link to={'/user'}>Welcome, {user?.username}</Link>
							<a
								className=' text-white bg-red-500 dark:bg-red-800 px-0.5  rounded border-solid border-2 border-red-500 dark:border-red-800 hover:cursor-pointer hover:shadow-sm hover:shadow-red-300'
								onClick={() => {
									logoutUser()
								}}
							>
								Logout
							</a>
						</div>
					)}
				</>
			) : (
				<>
					{!isOpen && (
						<div className='flex items-center gap-4'>
							<ToggleThemeIcon theme={theme} onClick={toggleTheme} />

							{isLoggedIn && <ProfilePictureIcon />}
							<HamburguerMenuIcon handleOpen={handleOpen} />
						</div>
					)}
					<>
						<div
							className={`${
								isOpen
									? 'absolute inset-0 z-40 bg-opacity-60 bg-gray-950'
									: 'w-0 h-0 overflow-hidden'
							}`}
							onClick={handleOpen}
						>
							{/* background div to close when click outside sidebar */}
						</div>
						<div
							className={`${
								isOpen
									? 'transition ease-linear duration-200  motion-reduce:transition-none bg-gray-200  dark:bg-gray-600 absolute min-h-full w-4/5 top-0 right-0 z-50 '
									: 'w-0 h-0 overflow-hidden -right-full'
							} `}
						>
							{isOpen && (
								<span className='absolute left-3 top-3'>
									<ToggleThemeIcon theme={theme} onClick={toggleTheme} />
								</span>
							)}
							{isOpen && <CloseIcon handleOpen={handleOpen} />}
							<ul className='flex flex-col ps-8 min-h-screen justify-between py-24'>
								<span className='flex flex-col gap-32'>
									<li className='text-lg'>
										{!isLoggedIn ? (
											<span className='flex flex-col gap-8'>
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
											</span>
										) : (
											<div className='flex gap-4 items-center'>
												{!user?.profilePicture ? (
													<ProfilePictureIcon />
												) : (
													<div className='rounded-full w-16 aspect-square flex overflow-hidden'>
														<img
															src={user?.profilePicture}
															alt={user.username}
															className='object-cover'
														/>
													</div>
												)}
												{user?.username}
											</div>
										)}
									</li>
									<span className='flex flex-col gap-8'>
										<li className='text-lg'>
											<Link to={'/'} onClick={handleOpen}>
												Home - Find a place
											</Link>
										</li>
										{isLoggedIn ? (
											<>
												<Link to={'/add'} onClick={handleOpen} className='text-lg'>
													Add a place
												</Link>
												<Link to={'/user'} onClick={handleOpen} className='text-lg'>
													Your profile
												</Link>
											</>
										) : null}
									</span>
								</span>
								<span className='flex flex-col gap-8'>
									<li className='text-lg'>Send Feedback</li>
									{isLoggedIn && (
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
								</span>
							</ul>
						</div>
					</>
				</>
			)}
		</>
	)
}
export default NavMenu
