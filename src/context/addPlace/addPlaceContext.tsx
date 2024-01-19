import { Dispatch, SetStateAction, useState, createContext, ReactNode } from 'react';
import { FormValues } from '../../pages/AddPlaceSplit/types';
import { useLocation } from 'react-router-dom';

const FormContext = createContext<null | {
	formData: FormValues;
	setFormData: Dispatch<SetStateAction<FormValues>>;
	pathname: string;
}>(null);

const AddPlaceWrapper = ({ children }: { children: ReactNode }) => {
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		price: 0,
		address: {
			country: '',
			city: '',
			street: '',
			zipCode: '',
		},
	});

	const { pathname } = useLocation();

	return (
		<FormContext.Provider
			value={{
				formData,
				setFormData,
				pathname,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export { FormContext, AddPlaceWrapper };
