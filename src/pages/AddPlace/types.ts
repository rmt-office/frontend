import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormUnregister,
} from 'react-hook-form';

export const TABS = {
	ADDRESS: 'Address',
	CONTACT_INFO: 'Contact Info',
	DETAILS: 'Details',
} as const;

export type Tabs = (typeof TABS)[keyof typeof TABS];

export type FormValues = {
	name: string;
	category: string;
	contactInfo: {
		website?: string;
		telephone?: string;
		facebook?: string;
		linkedIn?: string;
		instagram?: string;
	};
	price: number;
	meetingRooms: number;
	address: {
		country: string;
		city: string;
		street: string;
		zipCode: string;
	};
	wifiSpeed?: 'Fast' | 'Medium' | 'Slow';
	meetingRoom?: number;
	bathrooms?: number;
	tags: {
		hasFood: boolean;
		hasDrink: boolean;
		hasCafeteria: boolean;
		isAccessible: boolean;
		isVegan: boolean;
		isVegetarian: boolean;
	};
	description?: string;
	photos: string[];
};

export type ContactInfoTypes = FormValues['contactInfo'];
export type TagsTypes = FormValues['tags'];

export type ErrorField = FieldErrors<FormValues>;

export type RegisterType = UseFormRegister<FormValues>;
export type UnregisterType = UseFormUnregister<FormValues>;
export type ControlType = Control<FormValues, unknown>;
export type GetValuesType = UseFormGetValues<FormValues>;
