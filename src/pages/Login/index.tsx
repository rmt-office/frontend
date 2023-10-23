import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import '../../styles/Form.css'
import { authService } from '../../utils/services'
import { AxiosError } from 'axios'

const Login = () => {
	const {
		handleSubmit,
		register,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		values: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: { email: string; password: string }) => {
		try {
			const user = {
				email: values.email,
				password: values.password,
			}

			const { data } = await authService.login(user)
			//TODO: Redirect the user after signup?
			console.log(data)
			await authService.verify()
		} catch (error) {
			console.log(error)
			if (error instanceof AxiosError) {
				setError('root.serverError', {
					message: error.response!.data.message,
				})
			}
		}
	}

	return (
		<>
			<h1 className='mb-5 text-4xl'>Login</h1>
			<form className='flex flex-col gap-3 ' onSubmit={handleSubmit(onSubmit)}>
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
								value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
								message: 'Invalid email address',
							},
						})}
					/>
					{errors.email && <p className='text-red-400 mx-0.5'>{`${errors.email.message}`}</p>}
				</div>

				<div className='grid gap-1'>
					<label htmlFor='password'>Password*:</label>
					<input
						type='password'
						id='password'
						className='rounded text-black placeholder:text-slate-400 px-1 py-1'
						placeholder='*********'
						{...register('password', {
							required: 'Required field',
							pattern: {
								value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
								message: `Invalid password pattern`,
							},
						})}
					/>
					<legend className='mx-0.5 text-sm'>
						<p>The password has at least 8 characters and include:</p>
						<p>An uppercase letter, an lowercase letter, a number</p>
						<p>And one of the following: #?!@$ %^&*-</p>
					</legend>
					{errors.password && <p className='text-red-400 mx-0.5'>{`${errors.password.message}`}</p>}
				</div>

				{errors.root?.serverError && (
					<p className='text-red-400 mx-0.5 text-xl'>{errors.root.serverError.message}</p>
				)}

				<div className='self-end flex gap-1.5 mt-1'>
					<button type='submit' className='bg-black rounded border-white-50 border-2 px-2 py-1.5'>
						Login
					</button>
					<button
						type='reset'
						onClick={() => reset()}
						className='bg-black rounded border-white-50 border-2 px-2 py-1.5'
					>
						Cancel
					</button>
				</div>

				<p className='self-center text-base font-normal'>
					Don't have an account yet?{' '}
					<Link to={'/signup'} className='text-indigo-500 font-semibold'>
						Click here
					</Link>{' '}
					to register
				</p>
			</form>
		</>
	)
}
export default Login
