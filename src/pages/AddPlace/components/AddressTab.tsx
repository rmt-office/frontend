import { Controller } from 'react-hook-form';
import Select from 'react-select';

import FormError from '../../../components/FormError';
import Input from '../../../components/Input';
import { ControlType, ErrorField, RegisterType } from '../types';

const CATEGORY = [
	{ value: 'Café', label: 'Café' },
	{ value: 'Airport', label: 'Airport' },
	{ value: 'Hotel Lobby', label: 'Hotel Lobby' },
	{ value: 'Library', label: 'Library' },
	{ value: 'Coworking', label: 'Coworking' },
];

const AddressTab = ({
	register,
	control,
	errors,
}: {
	register: RegisterType;
	errors: ErrorField;
	control: ControlType;
}) => {
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
					render={({ field: { onChange } }) => (
						<Select
							onChange={(category) => {
								onChange(category?.value);
							}}
							className='text-black'
							options={CATEGORY}
						/>
					)}
				/>
			</label>

			{/* <select
				required
				className='rounded text-black px-1 py-1 invalid:text-slate-400'
				id='category'
				{...register('category', {
					required: 'Select a category',
				})}
			>
				<option value='' disabled hidden>
					Select a category
				</option>
				{CATEGORY.map((category) => (
					<option key={category} value={category} className='text-black'>
						{category}
					</option>
				))}
			</select> */}
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
		</>
	);
};
export default AddressTab;
