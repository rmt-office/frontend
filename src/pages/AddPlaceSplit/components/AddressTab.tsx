import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import FormError from '../../../components/FormError';
import Input from '../../../components/Input';
import { useAddPlace } from '../../../context/addPlace/useAddPlace';
import { FormValues, TABS } from '../types';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../../components/Icons/Arrows';
import PageShown from './PageShown';

const CATEGORY = [
	{ value: 'Café', label: 'Café' },
	{ value: 'Airport', label: 'Airport' },
	{ value: 'Hotel Lobby', label: 'Hotel Lobby' },
	{ value: 'Library', label: 'Library' },
	{ value: 'Coworking', label: 'Coworking' },
];

const AddressTab = () => {
	const { formData, setFormData, pathname } = useAddPlace();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm({ defaultValues: formData });

	const onSubmit = (values: Partial<FormValues>) => {
		setFormData({ ...formData, ...values });
		navigate(TABS.CONTACT_INFO);
	};

	const findCategory = () => {
		const index = CATEGORY.findIndex((category) => category.value === getValues('category'));
		return CATEGORY[index];
	};

	return (
		<>
			<Input
				label='Name*'
				type='text'
				id='cafeName'
				placeholder='Café name'
				{...register('name', { required: 'Name is a required field' })}
			>
				{errors?.name && <FormError message={errors.name.message} />}
			</Input>

			<label htmlFor='category'>
				Category*
				<Controller
					control={control}
					name='category'
					rules={{ required: 'Should select one category' }}
					render={({ field: { onChange } }) => (
						<Select
							onChange={(category) => {
								onChange(category?.value);
							}}
							defaultValue={findCategory()}
							className='text-black mt-2'
							options={CATEGORY}
						/>
					)}
				/>
			</label>
			{errors?.category && <FormError message={errors.category.message} />}

			<Input
				label='Country*'
				type='text'
				id='country'
				placeholder='France'
				{...register('address.country', { required: 'Country is required' })}
			>
				{errors?.address?.country && <FormError message={errors.address?.country.message} />}
			</Input>

			<Input
				label='Postal Code*'
				type='text'
				id='postalCode'
				placeholder='75000'
				{...register('address.zipCode', { required: 'Inform us the zip code' })}
			>
				{errors?.address?.zipCode && <FormError message={errors.address?.zipCode.message} />}
			</Input>

			<Input
				label='City*'
				type='text'
				id='city'
				placeholder='Paris'
				{...register('address.city', { required: 'A city is required' })}
			>
				{errors?.address?.city && <FormError message={errors.address?.city.message} />}
			</Input>

			<Input
				label='Street*'
				type='text'
				id='street'
				placeholder='Av. des Champs-Élysées'
				{...register('address.street', { required: 'Which street the remote space is located?' })}
			>
				{errors?.address?.street && <FormError message={errors.address?.street.message} />}
			</Input>

			<PageShown pathname={pathname} />
			<div className='flex w-full justify-end'>
				<Arrow onClick={handleSubmit(onSubmit)} />
			</div>
		</>
	);
};
export default AddressTab;
