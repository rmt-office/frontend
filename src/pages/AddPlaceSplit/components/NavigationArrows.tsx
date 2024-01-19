import Arrows from '../../../components/Icons/Arrows';
import { TABS } from '../types';
import { useNavigate } from 'react-router-dom';

const NavigationArrows = ({ pathname }: { pathname: string }) => {
	const navigate = useNavigate();

	const handleNextTabs = () => {
		if (pathname === TABS.ADDRESS) {
			navigate(TABS.CONTACT_INFO);
		} else if (pathname === TABS.CONTACT_INFO) {
			navigate(TABS.DETAILS);
		}
	};

	const handlePrevTabs = () => {
		if (pathname === TABS.CONTACT_INFO) {
			navigate(TABS.ADDRESS);
		} else if (pathname === TABS.DETAILS) {
			navigate(TABS.CONTACT_INFO);
		}
	};

	return (
		<div
			className={`items-center flex gap-1.5 mt-1 ${
				pathname === TABS.ADDRESS ? 'justify-end' : 'justify-between'
			}`}
		>
			{pathname !== TABS.ADDRESS && <Arrows next={false} onClick={handlePrevTabs} />}

			{pathname !== TABS.DETAILS && <Arrows onClick={handleNextTabs} />}

		</div>
	);
};
export default NavigationArrows;
