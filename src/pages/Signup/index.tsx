import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

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
			<form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
				<h1 className='mb-2 text-4xl'>Sign Up</h1>
				<div className='grid gap-1'>
					<label htmlFor='username'>Username:</label>
					<input
						type='username'
						id='username'
						className='rounded text-black placeholder:text-slate-400 px-1 py-1'
						placeholder='JohnDoe'
						{...register('username')}
					/>
					{errors.username && <p>{`${errors.username.message}`}</p>}
				</div>

				<div className='grid gap-1'>
					<label htmlFor='email'>Email*:</label>
					<input
						type='email'
						id='email'
						className='rounded text-black placeholder:text-slate-400 px-1 py-1'
						placeholder='johndoe@gmail.com'
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

				<div className='grid gap-1'>
					<label htmlFor='password'>Password*:</label>
					<input
						type='password'
						id='password'
						className='rounded text-black placeholder:text-slate-400 px-1 py-1'
						placeholder='*********'
						{...register('password', { required: 'Required field' })}
					/>
					{errors.password && <p>{`${errors.password.message}`}</p>}
					<legend className=''>
						Must include 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number
					</legend>
				</div>

				<div className='self-end flex gap-1.5 mt-1'>
					<button type='submit' className='bg-black rounded border-white-50 border-2 px-2 py-1.5'>
						Register
					</button>
					<button
						type='reset'
						onClick={() => reset()}
						className='bg-black rounded border-white-50 border-2 px-2 py-1.5'
					>
						Cancel
					</button>
				</div>

				<p className='self-center text-base font-medium'>
					Already have an account?{' '}
					<Link to={'/login'} className='text-indigo-500 font-semibold'>
						Click here
					</Link>{' '}
					to login
				</p>
			</form>
		</>
	)
}
export default Signup
