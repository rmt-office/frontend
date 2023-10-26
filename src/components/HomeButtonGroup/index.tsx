import { ReactNode } from 'react'

const HomeButtonGroup = ({ children, heading }: { children: ReactNode; heading: string }) => {
	return (
		<section className='flex flex-col gap-2 items-center my-4 w-100'>
			<h3 className='text-lg'>{heading}</h3>
			<div className='grid gap-4 min-w-full sm:grid-cols-2 md:grid-cols-4'>{children}</div>
		</section>
	)
}
export default HomeButtonGroup
