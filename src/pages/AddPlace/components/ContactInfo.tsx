import Input from '../../../components/Input';
import { RegisterType } from '../types';

const ContactInfo = ({ register }: { register: RegisterType }) => {
	return (
		<div>
			<Input
				label='Website*'
				type='text'
				id='website'
				placeholder='www.facebook.com'
				{...register('contactInfo.website')}
			></Input>
			<Input label='Email*' type='text' id='type' placeholder='Type'></Input>
			<p>We need at least one way to contact the establishment, ex: website, phone, instagram</p>
		</div>
	);
};
export default ContactInfo;
