import { TABS, Tabs } from '../types'

const PageShown = ({ tabs }: { tabs: Tabs }) => {
	return (
		<div className='flex justify-center gap-20 my-10'>
			<div className={`w-4 h-4 rounded-full dark:bg-white bg-slate-600`}></div>
			<div
				className={`w-4 h-4 rounded-full ${
					tabs !== TABS.ADDRESS ? 'dark:bg-white bg-slate-600' : 'bg-white dark:bg-slate-600'
				}`}
			></div>
			<div
				className={`w-4 h-4 rounded-full ${
					tabs !== TABS.ADDRESS && tabs !== TABS.CONTACT_INFO
						? 'dark:bg-white bg-slate-600'
						: 'bg-white dark:bg-slate-600'
				}`}
			></div>
		</div>
	)
}
export default PageShown
