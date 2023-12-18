export const TABS = {
	ADDRESS: 'Address',
	CONTACT_INFO: 'Contact Info',
	DETAILS: 'Details',
} as const

export type Tabs = (typeof TABS)[keyof typeof TABS]