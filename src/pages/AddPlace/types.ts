import { Control, FieldErrors, UseFormRegister, UseFormUnregister } from 'react-hook-form';

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
};

export type ContactInfoTypes = FormValues['contactInfo']

export type ErrorField = FieldErrors<FormValues>;

export type RegisterType = UseFormRegister<FormValues>;
export type UnregisterType = UseFormUnregister<FormValues>;
export type ControlType = Control<FormValues, unknown>