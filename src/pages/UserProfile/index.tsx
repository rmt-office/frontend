import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import PageTitle from '../../components/PageTitle'
import { useAuthValue } from '../../context'

const UserProfile = () => {
	const { user } = useAuthValue()

	return (
		<>
			{user && (
				<div className='flex flex-col gap-8 min-h-screen mt-16'>
					<PageTitle>Profile</PageTitle>
					<div className='flex flex-col gap-16'>
						<div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
							<div className='rounded-full w-52 aspect-square flex overflow-hidden'>
								<img src={user.profilePicture} alt={user.username} className='object-cover' />
							</div>
							<Button>
								<Link to={'#'}>Upload photo</Link>
							</Button>
						</div>
						<div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
							<div className='flex flex-col gap-2'>
								<p>Username: {user.username}</p>
								<p>Email: {user.email}</p>
							</div>
							<a href='#' className='underline text-blue-800'>
								Edit profile
							</a>
						</div>

						<div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
							<p>Password: **********</p>
							<a href='#'>Change password</a>
						</div>
					</div>
					{/* <div className='h-screen w-screen bg-white absolute'></div> */}
				</div>
			)}
		</>
	)
}
export default UserProfile
