const HamburguerMenuIcon = ({ handleOpen }: { handleOpen: () => void }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='w-8 h-8 border rounded border-black dark:border-white p-1 hover:shadow dark:hover:shadow-white'
			onClick={handleOpen}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
			/>
		</svg>
	)
}
export default HamburguerMenuIcon