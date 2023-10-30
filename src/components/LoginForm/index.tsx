import { authService } from '../../utils/services'
import { AxiosError } from 'axios'
import { useAuthValue } from '../../context'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import InputLegend from '../InputLegend'
import Button from '../Button'

const LoginForm = () => {
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
	const navigate = useNavigate()

	const { storeToken, authenticateUser } = useAuthValue()

	const onSubmit = async (values: { email: string; password: string }) => {
		try {
			const user = {
				email: values.email,
				password: values.password,
			}

			const { data } = await authService.login(user)
			storeToken(data.token)
			await authenticateUser()
			navigate('/')
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
		<form className='flex flex-col gap-3 ' onSubmit={handleSubmit(onSubmit)}>
			<Input
				type='email'
				id='email'
				label='Email*'
				placeholder='johndoe@gmail.com'
				{...register('email', {
					required: 'Required field',
					pattern: {
						value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
						message: 'Invalid email address',
					},
				})}
			>
				{errors.email && <p className='text-red-400 mx-0.5'>{`${errors.email.message}`}</p>}
			</Input>

			<Input
				type='password'
				id='password'
				label='Password*'
				placeholder='*********'
				{...register('password', {
					required: 'Required field',
					pattern: {
						value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
						message: `Invalid password pattern`,
					},
				})}
			>
				<InputLegend>
					<p>The password has at least 8 characters and include:</p>
					<p>An uppercase letter, an lowercase letter, a number</p>
					<p>And one of the following: #?!@$ %^&*-</p>
				</InputLegend>
				{errors.password && <p className='text-red-400 mx-0.5'>{`${errors.password.message}`}</p>}
			</Input>

			{errors.root?.serverError && (
				<p className='text-red-400 mx-0.5 text-xl'>{errors.root.serverError.message}</p>
			)}

			<div className='self-end flex gap-1.5 mt-1'>
				<Button type='submit'>Login</Button>
				<Button
					type='reset'
					onClick={() => reset()}
					className='bg-black rounded border-white-50 border-2 px-2 py-1'
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
export default LoginForm
