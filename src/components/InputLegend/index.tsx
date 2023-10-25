import { ReactNode } from 'react'

const InputLegend = ({ children }: { children: ReactNode }) => {
	return <legend className='mx-0.5 text-sm'>{children}</legend>
}
export default InputLegend
