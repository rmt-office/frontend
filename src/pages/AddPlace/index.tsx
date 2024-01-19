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
import { AxiosError } from 'axios';
import { utilServices } from '../../utils/services';

const AddPlace = () => {
	const [tabs, setTabs] = useState<Tabs>(TABS.ADDRESS);
	const [photoData, setPhotoData] = useState<FormData>();

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		setError,
		control,
		unregister,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			name: '',
			category: '',
			price: 0,
			meetingRoom: 0,
			bathrooms: 0,
			address: {
				country: '',
				city: '',
				street: '',
				zipCode: '',
			},
			photos: [],
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async () => {
		clearErrors();
		
		try {
			const { data: photosUploaded } = await utilServices.uploadPhotos(photoData!);
			setValue('photos', photosUploaded);
			await placeService.createPlace(getValues());
			reset();
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				const errorsArray = error.response?.data.errors;

				if (Array.isArray(errorsArray)) {
					errorsArray.forEach((e: { message: string; path: string[]; received?: unknown }) => {
						console.log(e);
						const path = e.path[e.path.length - 1];
						switch (path) {
							case 'contactInfo':
								setError(`contactInfo`, { message: 'Should add at least one contact info' });
								break;
							case 'website':
								setError(`contactInfo.${path}`, { message: e.message });
								break;
							case 'facebook':
								setError(`contactInfo.${path}`, { message: e.message });
								break;
							case 'instagram':
								setError(`contactInfo.${path}`, { message: e.message });
								break;
							case 'telephone':
								setError(`contactInfo.${path}`, { message: e.message });
								break;
							case 'price':
								setError(`${path}`, { message: e.message });
								break;
							default:
								console.log(`shouldn't be here`);
								break;
						}
					});
				}
			}
		}
	};
	return (
		<form className='flex flex-col gap-3' noValidate onSubmit={handleSubmit(onSubmit)}>
			<PageTitle>{tabs !== TABS.DETAILS ? `${tabs}*` : tabs}</PageTitle>
			<div className='flex flex-col gap-3'>
				{tabs === TABS.ADDRESS && (
					<>
						<AddressTab register={register} errors={errors} control={control} />
					</>
				)}
				{tabs === TABS.CONTACT_INFO && (
					<>
						<ContactInfo
							register={register}
							errors={errors}
							control={control}
							unregister={unregister}
						/>
					</>
				)}
				{tabs === TABS.DETAILS && (
					<>
						<DetailsTab
							register={register}
							errors={errors}
							control={control}
							unregister={unregister}
							setPhotoData={setPhotoData}
						/>
					</>
				)}
			</div>

			<PageShown tabs={tabs} />

			<NavigationArrows tabs={tabs} setTabs={setTabs} />
		</form>
	);
};
export default AddPlace;
