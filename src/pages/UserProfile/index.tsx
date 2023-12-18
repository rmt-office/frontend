import Button from '../../components/Button'
import PageTitle from '../../components/PageTitle'
import useProfile from './useProfile'
import CloseIcon from '../../components/Icons/CloseIcon'
import { ChangeEvent, FormEvent, useState } from 'react'
import { userService, UserUpdate, PasswordUpdate } from '../../utils/services'

const UserProfile = () => {
	const { userPicture, handlePicture, savePicture, isLoading, user, authenticateUser } =
		useProfile()
	const [modal, setModal] = useState({
		isOpen: false,
		selected: '',
	})
	const [editProfile, setEditProfile] = useState<UserUpdate | PasswordUpdate>()

	const handleModal = (type: 'profile' | 'password' | '') => {
		setModal((prev) => {
			if (type === 'profile') {
				setEditProfile({
					username: user!.username,
					email: user!.email,
					currentPassword: '',
				})
				return { selected: type, isOpen: !prev.isOpen }
			} else if (type === 'password') {
				setEditProfile({ password: '', confirmPassword: '', currentPassword: '' })
				return { selected: type, isOpen: !prev.isOpen }
			} else {
				setEditProfile(undefined)
				return { selected: '', isOpen: !prev.isOpen }
			}
		})
	}

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		console.log(editProfile)
		try {
			await userService.updateUser(editProfile!)
			await authenticateUser()
			handleModal('')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			{user && (
				<div className='flex flex-col gap-8 mt-16'>
					<div
						className={`${
							modal.isOpen && 'bg-neutral-800 bg-opacity-95 z-10 inset-0 top-28 absolute '
						}`}
						onClick={() => handleModal('')}
					></div>
					<PageTitle>Profile</PageTitle>

					<div className='flex flex-col gap-16 '>
						<div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
							<div className='rounded-full w-52 aspect-square flex overflow-hidden'>
								<img src={userPicture.picture} alt={user.username} className='object-cover' />
							</div>
							<div className='flex flex-col gap-2'>
								<Button>
									<label htmlFor='photo-upload'>Edit profile picture</label>
									<input
										type='file'
										id='photo-upload'
										className='hidden'
										onChange={handlePicture}
									/>
								</Button>
								{userPicture.isChanged && (
									<Button
										onClick={savePicture}
										className={isLoading ? 'border-gray-600 text-gray-900' : ''}
									>
										{isLoading ? 'Saving...' : 'Save changes'}
									</Button>
								)}
							</div>
						</div>

						<div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
							<div className='flex flex-col gap-2'>
								<p>Username: {user.username}</p>
								<p>Email: {user.email}</p>
							</div>
							<Button onClick={() => handleModal('profile')}>Edit profile</Button>
						</div>

						<div className='flex flex-col gap-4 justify-center sm:flex-row sm:justify-between items-center'>
							<div>
								<label htmlFor='password'>Password: </label>
								<input type='password' value='***********' readOnly className='bg-transparent' />
							</div>
							<Button onClick={() => handleModal('password')}>Change password</Button>
						</div>
					</div>

					{modal.isOpen && (
						<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20'>
							<form
								onSubmit={onSubmit}
								className='flex flex-col gap-6 bg-neutral-700 border-2 border-solid rounded px-10 py-12 relative '
							>
								<CloseIcon handleOpen={() => handleModal('')} />

								<p className='mt-4 text-white text-lg font-bold text-center whitespace-nowrap'>
									Edit your {modal.selected}
								</p>
								<>
									{editProfile &&
										Object.keys(editProfile).map((field) => {
											let value
											// TODO: check if is possible to change hardcoding
											if ('username' in editProfile) {
												value = editProfile[field as keyof UserUpdate]
											} else {
												value = editProfile[field as keyof PasswordUpdate]
											}
											return (
												<div className='grid gap-2' key={field}>
													<label htmlFor={field} className='text-white'>
														{
															<>
																{field
																	.replace('P', ' P')
																	.split(' ')
																	.map(
																		(word: string) => word.slice(0, 1).toUpperCase() + word.slice(1)
																	)
																	.join(' ')}
															</>
														}
													</label>
													<input
														type={field.toLowerCase().includes('password') ? 'password' : 'text'}
														id={field}
														value={value}
														onChange={(e: ChangeEvent<HTMLInputElement>) => {
															setEditProfile({ ...editProfile, [field]: e.target.value })
														}}
														className='text-black ps-1 rounded py-1'
													/>
												</div>
											)
										})}
								</>
								<div className='flex gap-2'>
									<Button type='reset' className='py-0.5'>
										Cancel
									</Button>
									<Button type='submit' className='py-0.5'>
										Save changes
									</Button>
								</div>
							</form>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default UserProfile
