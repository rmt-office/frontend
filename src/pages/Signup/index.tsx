import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authService } from '../../utils/services'
import { AxiosError } from 'axios'
import Button from '../../components/Button'
import Input from '../../components/Input'

const Signup = () => {
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
			username: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (values: {
		email: string
		password: string
		confirmPassword: string
		username?: string
	}) => {
		try {
			const newUser = {
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword,
				username: values.username,
			}
			console.log(newUser)
			return
			const { data } = await authService.signup(newUser)
			//TODO: Redirect the user after signup?
			console.log(data)
		} catch (error) {
			if (error instanceof AxiosError) {
				setError('root.serverError', {
					message: error.response!.data.message,
				})
			}
		}
	}

	return (
		<>
			<h1 className='mb-5 text-4xl'>Sign Up</h1>
			<form className='flex flex-col gap-3 ' onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					label='Username'
					id='username'
					placeholder='JohnDoe'
					{...register('username')}
				>
					<legend className='mx-0.5 text-sm'>
						<p>Should be unique</p>
						<p>If you don't pick an username the first part of the email will be used</p>
					</legend>
					{errors.username && <p>{`${errors.username.message}`}</p>}
				</Input>

				<Input
					type='email'
					label='Email*'
					id='email'
					placeholder='johndoe@gmail.com'
					{...register('email', {
						required: 'Required field',
						pattern: {
							value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
							message: 'Invalid email address',
						},
					})}
				>
					<legend className='mx-0.5 text-sm'>
						<p>Should be unique</p>
					</legend>
					{errors.email && <p className='text-red-400 mx-0.5'>{`${errors.email.message}`}</p>}
				</Input>

				<Input
					type='password'
					id='password'
					label='Password*'
					{...register('password', {
						required: 'Required field',
						pattern: {
							value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
							message: `Invalid password pattern`,
						},
					})}
					placeholder='********'
				>
					{' '}
					{errors.password && <p className='text-red-400 mx-0.5'>{`${errors.password.message}`}</p>}
				</Input>

				<Input
					type='password'
					id='confirmPassword'
					placeholder='*********'
					label='Confirm Password*'
					{...register('confirmPassword', {
						required: 'Required field',
						validate: (value, formValues) =>
							value !== formValues.password ? `Password don't match` : true,
					})}
				>
					{errors.confirmPassword && (
						<p className='text-red-400 mx-0.5'>{`${errors.confirmPassword.message}`}</p>
					)}
					<legend className='mx-0.5 text-sm'>
						<p>Must have at least 8 characters and include:</p>
						<p>An uppercase letter, an lowercase letter, a number</p>
						<p>And one of the following: #?!@$ %^&*-</p>
					</legend>
				</Input>

				{errors.root?.serverError && (
					<p className='text-red-400 mx-0.5 text-xl'>{errors.root.serverError.message}</p>
				)}
				<div className='self-end flex gap-1.5 mt-1'>
					<Button type='submit'>Register</Button>
					<Button type='reset' onClick={() => reset()}>
						Cancel
					</Button>
				</div>

				<p className='self-center text-base font-normal'>
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
