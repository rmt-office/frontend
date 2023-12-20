import { useState } from 'react';
import Select from 'react-select';

import FormError from '../../../components/FormError';
import Input from '../../../components/Input';
import { ContactInfoTypes, ControlType, ErrorField, RegisterType } from '../types';
import { Controller } from 'react-hook-form';

const options = [
	{ value: 'website', label: 'Website' },
	{ value: 'telephone', label: 'Phone' },
	{ value: 'instagram', label: 'Instagram' },
	{ value: 'facebook', label: 'Facebook' },
];

const ContactInfo = ({
	register,
	control,
	errors,
}: {
	register: RegisterType;
	errors: ErrorField;
	control: ControlType;
}) => {
	const [contactInfoFields, setContactInfoFields] = useState<
		readonly { label: string; value: string }[]
	>([]);

	return (
		<>
			{contactInfoFields.map(({ value, label }) => {
				const key = value as keyof ContactInfoTypes;

				return (
					<Input
						label={`${label}`}
						type='text'
						id='website'
						placeholder='www.facebook.com'
						{...register(`contactInfo.${key}`)}
						key={key}
					>
						{errors.contactInfo && <FormError message={errors.contactInfo?.[key]?.message} />}
					</Input>
				);
			})}

			<Controller
				control={control}
				name='contactInfo'
				render={({ field: { onChange } }) => (
					<Select
						onChange={(contactFields) => {
							onChange(
								setContactInfoFields(contactFields.map((contactField) => ({ ...contactField })))
							);
						}}
						className='text-black my-6'
						options={options}
						isMulti
					/>
				)}
			/>

			<p>We need at least one way to contact the establishment, ex: website, phone, instagram</p>
			{errors.contactInfo && <FormError message={errors.contactInfo?.message} />}
		</>
	);
};
export default ContactInfo;

// const {
//   control
// } = useForm();

// <Controller
//   control={control}
//   defaultValue={options.map(c => c.value)}
//   name="options"
//   render={({ field: { onChange, value, ref }}) => (
//     <Select
//       inputRef={ref}
//       value={options.filter(c => value.includes(c.value))}
//       onChange={val => onChange(val.map(c => c.value))}
//       options={options}
//       isMulti
//     />
//   )}
// />

{
	/* <select
				onChange={(e) => {
					setContactInfoFields([...contactInfoFields, e.target.value]);
				}}
				className={`rounded text-black px-1 py-1 invalid:text-slate-400`}
				required
			>
				<option value='' disabled hidden>
					Select a field
				</option>
				<option value='website' className='text-black'>
					Website
				</option>
				<option value='telephone' className='text-black'>
					Phone
				</option>
				<option value='instagram' className='text-black'>
					Instagram
				</option>
				<option value='facebook' className='text-black'>
					Facebook
				</option>
			</select> */
}
{
	/* <Input
				label='Website*'
				type='text'
				id='website'
				placeholder='www.facebook.com'
				{...register('contactInfo.website')}
			>
				{errors.contactInfo && <FormError message={errors.contactInfo?.website?.message} />}
			</Input> */
}
{
	/* <Input label='Phone*' type='number' id='phone' placeholder='9 99 99 99 99' inputMode='tel' {...register('contactInfo.telephone')}></Input>
	 */
}

{
	/* <Select options={options} className='text-black' isMulti onChange={(e) => {
				console.log(e)
				setContactInfoFields(e)
				}} /> */
}
