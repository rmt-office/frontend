import { ReactNode } from 'react'

const Button = ({
	children,
	type,
	className,
	onClick,
}: {
	children: ReactNode
	type?: 'button' | 'submit' | 'reset'
	className?: string
	onClick?: (param?: unknown) => void
}) => {
	return (
		<button
			type={type ? type : 'button'}
			className={`bg-black rounded border-white-50 border-2 px-2 py-1 hover:cursor-pointer hover:shadow-sm hover:shadow-white ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
export default Button
