import { PropsWithRef, ReactNode, forwardRef } from 'react'

interface InputProps extends PropsWithRef<JSX.IntrinsicElements['input']> {
	type: React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>['type']
	id?: string
	label: string
	placeholder?: string
	className?: string
	children?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ children, type, id, label, placeholder, className, ...props }, ref) => {
		return (
			<div className='grid gap-1'>
				<label htmlFor={id} className='text-lg'>{label} :</label>
				<input
					type={type}
					id={id}
					className={`rounded text-black placeholder:text-slate-400 px-1 py-1 ${className}`}
					placeholder={placeholder}
					ref={ref}
					{...props}
				/>
				{children}
			</div>
		)
	}
)
export default Input
