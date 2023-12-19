import { useState } from 'react';
import FormError from '../../../components/FormError';
import Input from '../../../components/Input';
import { ContactInfoTypes, ErrorField, RegisterType, UnregisterType } from '../types';

const ContactInfo = ({
	register,
	unregister,
	errors,
}: {
	register: RegisterType;
	unregister: UnregisterType;
	errors: ErrorField;
}) => {
	const [contactInfoFields, setContactInfoFields] = useState<string[]>([]);
	return (
		<>
			{contactInfoFields.map((ci) => {
				const key = ci as keyof ContactInfoTypes;

				return (
					<Input
						label={`${ci}`}
						type='text'
						id='website'
						placeholder='www.facebook.com'
						{...register(`contactInfo.${key}`)}
					>
						<span
							className='hover:cursor-pointer'
							onClick={() => {
								setContactInfoFields((previousFields) => {
									const newFields = previousFields.filter((field) => field !== key);
									return newFields;
								});
								unregister(`contactInfo.${key}`);
							}}
						>
							remover
						</span>
						{errors.contactInfo && <FormError message={errors.contactInfo?.website?.message} />}
					</Input>
				);
			})}
			<select
				onChange={(e) => {
					setContactInfoFields([...contactInfoFields, e.target.value]);
				}}
			>
				<option value='website'>Website</option>
				<option value='telephone'>Phone</option>
				<option value='instagram'>Instagram</option>
				<option value='facebook'>Facebook</option>
			</select>
			{/* <Input
				label='Website*'
				type='text'
				id='website'
				placeholder='www.facebook.com'
				{...register('contactInfo.website')}
			>
				{errors.contactInfo && <FormError message={errors.contactInfo?.website?.message} />}
			</Input> */}
			{/* <Input label='Phone*' type='number' id='phone' placeholder='9 99 99 99 99' inputMode='tel' {...register('contactInfo.telephone')}></Input>
			<p>We need at least one way to contact the establishment, ex: website, phone, instagram</p> */}

			{errors.contactInfo && <FormError message={errors.contactInfo?.message} />}
		</>
	);
};
export default ContactInfo;
