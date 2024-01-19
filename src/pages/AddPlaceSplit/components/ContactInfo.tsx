import { CSSProperties, useEffect, useState } from 'react';
import Select, {
	ClearIndicatorProps,
	GroupBase,
	MultiValueRemoveProps,
	components,
} from 'react-select';
import { Controller, useForm } from 'react-hook-form';

import FormError from '../../../components/FormError';
import Input from '../../../components/Input';
import { ContactInfoTypes, FormValues, TABS } from '../types';
import { useAddPlace } from '../../../context/addPlace/useAddPlace';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../../components/Icons/Arrows';

const options = [
	{ value: 'website', label: 'Website' },
	{ value: 'telephone', label: 'Phone' },
	{ value: 'instagram', label: 'Instagram' },
	{ value: 'facebook', label: 'Facebook' },
];

type ContactField = { value: string; label: string };

const ContactInfo = () => {
	const { formData, setFormData } = useAddPlace();

	const navigate = useNavigate();

	const [contactInfoFields, setContactInfoFields] = useState<readonly ContactField[]>([]);

	const {
		control,
		handleSubmit,
		register,
		unregister,
		getValues,
		setError,
		setValue,
		formState: { errors },
	} = useForm({ defaultValues: formData });

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

	const onSubmit = (values: Partial<FormValues>) => {
		const contact = getValues('contactInfo');

		if (!contact || !Object.keys(contact).length) {
			setFormData({ ...formData, contactInfo: contact });
			setError('contactInfo', { message: 'At least one type of contact is necessary' });
			return;
		}
		let contactFilled = false;

		for (const key in contact) {
			const value = key as keyof ContactInfoTypes;
			const element = contact[value];
			if (element) {
				contactFilled = true;
			}
			setError(`contactInfo`, { message: 'At least one type of contact is necessary' });
			setError(`contactInfo.${value}`, { message: 'Please fill out the field' });
		}

		if (contactFilled) {
			setFormData({ ...formData, ...values });
			navigate(TABS.DETAILS);
		}
		return;
	};

	useEffect(() => {
		const contactValues = getValues('contactInfo');
		const contactInfo: ContactField[] = [];
		for (const key in contactValues) {
			const value = key as keyof ContactInfoTypes;
			const found: ContactField | undefined = options.find((option) => option.value === value);
			if (found) {
				contactInfo.push(found);
			}
		}

		setContactInfoFields(contactInfo);
	}, [getValues]);

	// Clear all the fields
	const ClearIndicator = (
		props: ClearIndicatorProps<ContactField, true, GroupBase<ContactField>>
	) => {
		const {
			getStyles,
			innerProps: { ref, ...restInnerProps },
		} = props;
		const previousClickEvent = props.innerProps.onMouseDown;
		props.innerProps.onMouseDown = (event) => {
			if (previousClickEvent) {
				previousClickEvent(event);
			}
			setValue('contactInfo', undefined);
			const newContactInfo = getValues('contactInfo');
			setFormData({ ...formData, contactInfo: newContactInfo });
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

	const getContact = (key: keyof ContactInfoTypes) => {
		let defaultValue
		if (key === 'telephone') {
			defaultValue = `${getValues(`contactInfo.${key}`) ?? ''}`
		} else {
			defaultValue = `https://${getValues(`contactInfo.${key}`) ?? ''}`
		} 

		return defaultValue
	}

	return (
		<>
			{contactInfoFields.map(({ value: value, label }) => {
				const key = value as keyof ContactInfoTypes;

				return (
					<Input
						label={`${label}`}
						type='text'
						id='website'
						placeholder='+14 99 99 99 99'
						defaultValue={getContact(key)}
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
				shouldUnregister={true}
				render={({ field: { ref } }) => (
					<Select
						onChange={(contactFields) => {
							setContactInfoFields(
								contactFields.map((field) => {
									return { ...(field as ContactField) };
								})
							);
						}}
						value={[...contactInfoFields]}
						components={{ MultiValueRemove, ClearIndicator }}
						ref={ref}
						className='text-black my-6'
						options={options}
						isMulti
					/>
				)}
			/>

			<p>We need at least one way to contact the establishment, ex: website, phone, instagram</p>
			{errors.contactInfo && <FormError message={errors.contactInfo.message} />}

		

			<div className='flex justify-between'>
				<Arrow next={false} onClick={() => navigate(TABS.ADDRESS)} />
				<Arrow onClick={handleSubmit(onSubmit)} />
			</div>

		</>
	);
};
export default ContactInfo;
