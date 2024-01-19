import { ReactNode } from 'react';

const Button = ({
	children,
	type,
	className,
	onClick,
}: {
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	onClick?: ((param?: unknown) => void) | (() => void);
}) => {
	return (
		<button
			type={type ? type : 'button'}
			className={`text-white bg-neutral-700 rounded border-white border-2 px-2 py-1 hover:cursor-pointer hover:shadow-sm dark:hover:shadow-white hover:shadow-gray-600 ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
export default Button;
