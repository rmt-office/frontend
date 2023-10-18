import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import '../../styles/Form.css'

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		values: {
			email: '',
			password: '',
		},
	})
	const onSubmit = (values: { email: string; password: string }) => console.log(values)

	return (
		<>
			<h1>Login</h1>
			<form className='user-form' onSubmit={handleSubmit(onSubmit)}>
				<div className='input-group'>
					<label htmlFor='email'>Email*:</label>
					<input
						type='email'
						id='email'
						{...register('email', {
							required: 'Required field',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'invalid email address',
							},
						})}
					/>
					{errors.email && <p>{`${errors.email.message}`}</p>}
				</div>

				<div className='input-group'>
					<label htmlFor='password'>Password*:</label>
					<input
						type='password'
						id='password'
						{...register('password', { required: 'Required field' })}
					/>
					{errors.password && <p>{`${errors.password.message}`}</p>}
				</div>

				<div className='btn-group'>
					<button type='submit'>Login</button>
					<button type='reset' onClick={() => console.log('first')}>
						Cancel
					</button>
				</div>

				<p>
					Still don't have an account? <Link to={'/signup'}>Click here</Link> to register
				</p>
			</form>
		</>
	)
}
export default Login
