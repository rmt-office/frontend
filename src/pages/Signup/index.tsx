import { Link } from 'react-router-dom'
import SingUpForm from '../../components/SignupForm'
import PageTitle from '../../components/PageTitle'

const Signup = () => {
	return (
		<>
			<PageTitle>Sign Up</PageTitle>

			<SingUpForm />

			<p className='self-center text-base font-normal'>
				Already have an account?{' '}
				<Link to={'/login'} className='text-indigo-500 font-semibold'>
					Click here
				</Link>{' '}
				to login
			</p>
		</>
	)
}
export default Signup

