import { Outlet } from 'react-router-dom';
import { AddPlaceWrapper } from '../../context/addPlace/addPlaceContext';


const AddPlaceSplit = () => {

	return (
		<AddPlaceWrapper>
			<div className='flex flex-col gap-3'>
				<Outlet />
			</div>
		</AddPlaceWrapper>
	);
};
export default AddPlaceSplit;
