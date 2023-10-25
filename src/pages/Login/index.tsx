import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import PageTitle from '../../components/PageTitle'

const Login = () => {
	return (
		<>
			<PageTitle>Login</PageTitle>

			<LoginForm />

			<p className='self-center text-base font-normal'>
				Don't have an account yet?{' '}
				<Link to={'/signup'} className='text-indigo-500 font-semibold'>
					Click here
				</Link>{' '}
				to register
			</p>
		</>
	)
}
export default Login
