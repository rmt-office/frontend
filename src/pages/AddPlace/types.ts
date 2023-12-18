import { FieldErrors, UseFormRegister } from 'react-hook-form';

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
		website: string;
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

export type ErrorField = FieldErrors<FormValues>

export type RegisterType = UseFormRegister<FormValues>;
