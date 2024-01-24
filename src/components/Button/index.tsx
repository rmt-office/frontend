import { PropsWithRef, ReactNode } from 'react';

interface Button extends PropsWithRef<JSX.IntrinsicElements['button']> {
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	onClick?: ((param?: unknown) => void) | (() => void);
}

const Button = ({ children, type, className, onClick, ...props }: Button) => {
	return (
		<button
			type={type ? type : 'button'}
			className={`
			text-white bg-neutral-700 rounded border-white border-2 px-2 py-1 
				hover:cursor-pointer hover:shadow-sm dark:hover:shadow-white 
			hover:shadow-gray-600 ${className}
				${props.disabled && 'disabled:opacity-40'}
			`}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
};
export default Button;
