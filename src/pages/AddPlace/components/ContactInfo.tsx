import { CSSProperties, useState } from 'react';
import Select, { ClearIndicatorProps, MultiValueRemoveProps, components } from 'react-select';

import FormError from '../../../components/FormError';
import Input from '../../../components/Input';
import {
	ContactInfoTypes,
	ControlType,
	ErrorField,
	RegisterType,
	UnregisterType,
} from '../types';
import { Controller } from 'react-hook-form';

const options = [
	{ value: 'website', label: 'Website' },
	{ value: 'telephone', label: 'Phone' },
	{ value: 'instagram', label: 'Instagram' },
	{ value: 'facebook', label: 'Facebook' },
];

type ContactField = { value: string; label: string };

const ContactInfo = ({
	register,
	unregister,
	control,
	errors,
}: {
	register: RegisterType;
	unregister: UnregisterType;
	errors: ErrorField;
	control: ControlType;
}) => {
	const [contactInfoFields, setContactInfoFields] = useState<
		readonly { label: string; value: string }[]
	>([]);

	const MultiValueRemove = (props: MultiValueRemoveProps) => {
		const previousClickEvent = props.innerProps.onClick;
		props.innerProps.onClick = (event) => {
			if (typeof props.data === 'object' && props.data != null) {
				const getKey = props.data;
				if ('value' in getKey) {
					const key = getKey.value as keyof ContactInfoTypes;
					unregister(`contactInfo.${key}`);
				}
			}
			if (previousClickEvent) {
				previousClickEvent(event);
			}
		};

		return <components.MultiValueRemove {...props}></components.MultiValueRemove>;
	};

	const ClearIndicator = (props: ClearIndicatorProps) => {
		const {
			getStyles,
			innerProps: { ref, ...restInnerProps },
		} = props;
		const previousClickEvent = props.innerProps.onMouseDown;
		props.innerProps.onMouseDown = (event) => {
			unregister(`contactInfo`);

			if (previousClickEvent) {
				previousClickEvent(event);
			}
		};
		return (
			<div
				{...restInnerProps}
				ref={ref}
				style={getStyles('clearIndicator', props) as CSSProperties}
			>
				<div style={{ padding: '0px 5px' }} className='text-black hover:cursor-pointer'>
					X
				</div>
			</div>
		);
	};

	return (
		<>
			{contactInfoFields.map(({ value: value, label }) => {
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
						{errors.contactInfo?.[key] && (
							<FormError message={errors.contactInfo?.[key]?.message} />
						)}
					</Input>
				);
			})}

			<Controller
				control={control}
				name='contactInfo'
				render={({ field: { ref } }) => (
					<Select
						onChange={(contactFields) => {
							setContactInfoFields(
								contactFields.map((field) => {
									return { ...(field as ContactField) };
								})
							);
						}}
						components={{ MultiValueRemove, ClearIndicator }}
						ref={ref}
						className='text-black my-6'
						options={options}
						isMulti
					/>
				)}
			/>

			<p>We need at least one way to contact the establishment, ex: website, phone, instagram</p>
			{errors.contactInfo && 	<FormError message={errors.contactInfo.message} />}
			{/* {errors.contactInfo &&
				Object.keys(errors.contactInfo).map((e) => {
					const value = e as keyof FormValues['contactInfo'];
					return(
						<div className='flex gap-2'> 
						<span >{value}:</span>
						<FormError message={errors.contactInfo?.[value]?.message} />
					</div>
					)
				})} */}
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
