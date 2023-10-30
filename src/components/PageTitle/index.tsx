import { ReactNode } from 'react'

const PageTitle = ({ children }: { children: ReactNode }) => {
	return <h1 className='mb-5 text-4xl font-medium'>{children}</h1>
}
export default PageTitle
