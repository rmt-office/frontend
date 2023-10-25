import { useForm } from 'react-hook-form'
import { authService } from '../../utils/services'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import InputLegend from '../InputLegend'

const SingUpForm = () => {
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

	const navigate = useNavigate()

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
			await authService.signup(newUser)
			navigate('/login')
		} catch (error) {
			if (error instanceof AxiosError) {
				setError('root.serverError', {
					message: error.response!.data.message,
				})
			}
		}
	}
	return (
		<form className='flex flex-col gap-3 ' onSubmit={handleSubmit(onSubmit)}>
			<Input
				type='text'
				label='Username'
				id='username'
				placeholder='JohnDoe'
				{...register('username')}
			>
				<InputLegend>
					<p>Should be unique</p>
					<p>If you don't pick an username the first part of the email will be used</p>
				</InputLegend>
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
				<InputLegend>
					<p>Should be unique</p>
				</InputLegend>
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
				<InputLegend>
					<p>Must have at least 8 characters and include:</p>
					<p>An uppercase letter, an lowercase letter, a number</p>
					<p>And one of the following: #?!@$ %^&*-</p>
				</InputLegend>
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
		</form>
	)
}
export default SingUpForm
