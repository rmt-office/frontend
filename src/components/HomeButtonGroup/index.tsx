import { ReactNode } from 'react'

const HomeButtonGroup = ({ children, heading }: { children: ReactNode; heading: string }) => {
	return (
		<section className='flex flex-col gap-2 items-center my-4 w-100'>
			<h3>{heading}</h3>
			<div className='grid gap-4 min-w-full md:grid-cols-2 lg:grid-cols-4'>{children}</div>
		</section>
	)
}
export default HomeButtonGroup
