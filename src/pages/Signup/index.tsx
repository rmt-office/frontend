import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import '../../styles/Form.css'

const Signup = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		values: {
			email: '',
			password: '',
			username: '',
		},
	})
	const onSubmit = (values: { email: string; password: string; username?: string }) =>
		console.log(values)

	return (
		<>
			<h1>Sign Up</h1>
			<form className='user-form' onSubmit={handleSubmit(onSubmit)}>
				<div className='input-group'>
					<label htmlFor='username'>Username:</label>
					<input type='username' id='username' {...register('username')} />
					{errors.username && <p>{`${errors.username.message}`}</p>}
				</div>

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
					<legend>
						Must include 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number
					</legend>
				</div>

				<div className='btn-group'>
					<button type='submit'>Register</button>
					<button type='reset' onClick={() => reset()}>
						Cancel
					</button>
				</div>

				<p className='account-cta'>
					Already have an account? <Link to={'/login'}>Click here</Link> to login
				</p>
			</form>
		</>
	)
}
export default Signup
