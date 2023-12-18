import Input from '../../../components/Input';
import InputLegend from '../../../components/InputLegend';
import { RegisterType } from '../types';

const DetailsTab = ({ register }: { register: RegisterType }) => {
	return (
		<>
			<Input
				label='Price*'
				type='number'
				id='price'
				min={1}
				max={5}
				placeholder=''
				{...register('price', { min: 1, max: 5, valueAsNumber: true, value: 1 })}
			>
				<InputLegend>
					<p>The price is a relative measure</p>
					<p>1 is the cheapest and the 5 the most expensive</p>
				</InputLegend>
			</Input>
		</>
	);
};
export default DetailsTab;
