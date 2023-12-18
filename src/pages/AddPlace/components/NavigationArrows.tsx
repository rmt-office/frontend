import { Dispatch, SetStateAction } from 'react'
import Button from '../../../components/Button'
import Arrows from '../../../components/Icons/Arrows'
import { Tabs, TABS } from '../types'

const NavigationArrows = ({
	tabs,
  setTabs
}: {
	tabs: Tabs
  setTabs: Dispatch<SetStateAction<Tabs>>
}) => {

  const handleNextTabs = () => {
		if (tabs === TABS.ADDRESS) {
			setTabs(TABS.CONTACT_INFO)
		} else if (tabs === TABS.CONTACT_INFO) {
			setTabs(TABS.DETAILS)
		}
	}

	const handlePrevTabs = () => {
		if (tabs === TABS.CONTACT_INFO) {
			setTabs(TABS.ADDRESS)
		} else if (tabs === TABS.DETAILS) {
			setTabs(TABS.CONTACT_INFO)
		}
	}
	return (
		<div
			className={`items-center flex gap-1.5 mt-1 ${
				tabs === TABS.ADDRESS ? 'self-end' : 'justify-between'
			}`}
		>
			{tabs !== TABS.ADDRESS && <Arrows next={false} onClick={handlePrevTabs} />}

			{tabs !== TABS.DETAILS && <Arrows onClick={handleNextTabs} />}
			{/* {tabs === TABS.DETAILS && } */}
			<Button type='submit'>Create</Button>
		</div>
	)
}
export default NavigationArrows
