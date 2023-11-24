import Button from '../../components/Button'
import PageTitle from '../../components/PageTitle'
import useProfile from './useProfile'
import CloseIcon from '../../components/Icons/CloseIcon'
import { useState } from 'react'

const UserProfile = () => {
	const { userPicture, handlePicture, savePicture, isLoading, user } = useProfile()
	const [modal, setModal] = useState({
		isOpen: false,
	})

	const handleModal = () => {
		setModal((prev) => {
			return { isOpen: !prev.isOpen }
		})
	}
	return (
		<>
			{user && (
				<div className='flex flex-col gap-8 mt-16'>
					<div
						className={`${
							modal.isOpen && 'bg-neutral-800 bg-opacity-95 z-10 inset-0 top-28 absolute '
						}`}
						onClick={() => handleModal()}
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
							<Button onClick={handleModal}>Edit profile</Button>
						</div>

						<div className='flex flex-col gap-4 justify-center sm:flex-row sm:justify-between items-center'>
							<div>
								<label htmlFor='password'>Password: </label>
								<input type='password' value='***********' readOnly className='bg-transparent' />
							</div>
							<Button onClick={handleModal}>Change password</Button>
						</div>
					</div>
					{modal.isOpen && (
						<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20'>
							<div className='flex flex-col gap-6 bg-neutral-700 border-2 border-solid rounded px-4 py-12 relative '>
								<CloseIcon handleOpen={() => handleModal()} />

								<p className='mt-4 text-white text-lg font-bold text-center whitespace-nowrap'>
									Where do you want to find your?
								</p>
								<div className='flex gap-2 justify-center items-baseline'>
									<label htmlFor='searchCity' className='text-white'>
										City:
									</label>
									<input
										id='searchCity'
										className='text-black ps-1 rounded py-1'
										placeholder='Paris'
									/>
									<Button className='py-0.5'>Go</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}
export default UserProfile
