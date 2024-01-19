const CloseIcon = ({ handleOpen, className }: { handleOpen: () => void; className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='-8 -8 40 40'
			strokeWidth={1.5}
			stroke='currentColor'
			className={`w-8 h-8 absolute right-2 top-2 hover:cursor-pointer ${className}`}
			onClick={handleOpen}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
		</svg>
	)
}
export default CloseIcon
