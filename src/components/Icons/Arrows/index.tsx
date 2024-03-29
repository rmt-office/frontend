const Arrow = ({
	next = true,
	onClick: onClick,
	className,
}: {
	next?: boolean;
	onClick?: (e: React.BaseSyntheticEvent) => void;
	className?: string;
}) => {
	return (
		<button type='submit' onClick={onClick}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={4}
				stroke='currentColor'
				className={`w-6 h-6 hover:cursor-pointer ${className}`}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d={`${
						next ? 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' : 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
					}`}
				/>
			</svg>
		</button>
	);
};
export default Arrow;
