import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import PageTitle from '../../components/PageTitle'
import { useAuthValue } from '../../context'
import { useState } from 'react'
import { userService, utilServices } from '../../utils/services'

const UserProfile = () => {
	const { user, authenticateUser } = useAuthValue()
	const [isLoading, setIsLoading] = useState(false)
	const [userPicture, setUserPicture] = useState<{
		file: null | File
		picture: string
		isChanged: boolean
	}>({
		file: null,
		picture: user!.profilePicture,
		isChanged: false,
	})

	const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		const newPic = event.target.files[0]
		const picURL = URL.createObjectURL(newPic)
		setUserPicture({
			file: newPic,
			picture: picURL,
			isChanged: true,
		})
	}

	const savePicture = async () => {
		if (!userPicture.file) return
		const photoData = new FormData()
		photoData.append('image', userPicture.file)
		try {
			setIsLoading(true)
			const { data } = await utilServices.uploadPhoto(photoData)
			await userService.uploadPhoto({ profilePicture: data })
			await authenticateUser()

			setUserPicture({ ...userPicture, file: null, isChanged: false })
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{user && (
				<div className='flex flex-col gap-8 min-h-screen mt-16'>
					<PageTitle>Profile</PageTitle>
					<div className='flex flex-col gap-16'>
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
							<Button>
								<Link to='#'>Edit profile</Link>
							</Button>
						</div>

						<div className='flex flex-col gap-4 justify-center sm:flex-row sm:justify-between items-center'>
							<div>
								<label htmlFor='password'>Password: </label>
								<input type='password' value='***********' readOnly className='bg-transparent' />
							</div>
							<Button>
								<Link to='#'>Change password</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default UserProfile
