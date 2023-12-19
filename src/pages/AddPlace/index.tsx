import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageTitle from '../../components/PageTitle';
import NavigationArrows from './components/NavigationArrows';
import PageShown from './components/PageShown';
import { FormValues, TABS, Tabs } from './types';
import { placeService } from '../../utils/services/placeService';
import AddressTab from './components/AddressTab';
import ContactInfo from './components/ContactInfo';
import DetailsTab from './components/DetailsTab';

const AddPlace = () => {
	const [tabs, setTabs] = useState<Tabs>(TABS.ADDRESS);
	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		setError,
		unregister,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			name: '',
			category: '',
			contactInfo: {},
			price: 1,
			meetingRooms: 0,
			address: {
				country: '',
				city: '',
				street: '',
				zipCode: '',
			},
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		clearErrors();
		console.log('inside onSubmit');
		console.log(values);
		try {
			const { data } = await placeService.createPlace(values);
			console.log(data);
			reset();
		} catch (error) {
			console.log(error);
			setError('root', { message: 'making the form error' });
		}
	};
	return (
		<form className='flex flex-col gap-3' noValidate onSubmit={handleSubmit(onSubmit)}>
			<PageTitle>{tabs}</PageTitle>
			<div className='flex flex-col gap-3'>
				{tabs === TABS.ADDRESS && (
					<>
						<AddressTab register={register} errors={errors} />
					</>
				)}
				{tabs === TABS.CONTACT_INFO && (
					<>
						<ContactInfo register={register} unregister={unregister} errors={errors} />
					</>
				)}
				{tabs === TABS.DETAILS && (
					<>
						<DetailsTab register={register} errors={errors} />
					</>
				)}
			</div>

			<PageShown tabs={tabs} />

			<NavigationArrows tabs={tabs} setTabs={setTabs} />
		</form>
	);
};
export default AddPlace;
