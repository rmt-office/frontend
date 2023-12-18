import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import InputLegend from '../../components/InputLegend'
import PageTitle from '../../components/PageTitle'
import NavigationArrows from './components/NavigationArrows'
import PageShown from './components/PageShown'
import { TABS, Tabs } from './types'
import { placeService } from '../../utils/services/placeService'

const AddPlace = () => {
	const [tabs, setTabs] = useState<Tabs>(TABS.ADDRESS)
	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		getValues,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			category: '',
			contactInfo: {
				website: '',
			},
			price: 1,
			meetingRooms: 0,
			address: {
				country: '',
				city: '',
				street: '',
				zipCode: '',
			},
		},
	})

	const onSubmit = async (values) => {
		console.log(values)
		if (!values.contactInfo.website) {
			setError('contactInfo', {message: 'Must include a contact info'})
			return 
		}

		try {
			const { data } = await placeService.createPlace(values)
			console.log(data)
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
			<PageTitle>{tabs}</PageTitle>
			<div className='flex flex-col gap-3'>
				{tabs === TABS.ADDRESS && (
					<>
						<Input
							label='Name*'
							type='text'
							id='cafeName'
							placeholder='Café name'
							{...register('name')}
						></Input>
						<Input
							label='Category*'
							type='text'
							id='type'
							placeholder='Type'
							{...register('category')}
						></Input>
						<Input
							label='Country*'
							type='text'
							id='country'
							placeholder='France'
							{...register('address.country')}
						></Input>
						<Input
							label='Postal Code*'
							type='text'
							id='postalCode'
							placeholder='75000'
							{...register('address.zipCode')}
						></Input>
						<Input
							label='City*'
							type='text'
							id='city'
							placeholder='Paris'
							{...register('address.city')}
						></Input>
						<Input
							label='Street*'
							type='text'
							id='street'
							placeholder='Av. des Champs-Élysées'
							{...register('address.street')}
						></Input>
					</>
				)}
				{tabs === TABS.CONTACT_INFO && (
					<>
						<Input
							label='Website*'
							type='text'
							id='website'
							placeholder='www.facebook.com'
							{...register('contactInfo.website')}
						></Input>
						<Input label='Email*' type='text' id='type' placeholder='Type'></Input>
						<p>We need at least one way to contact the establishment, ex: website, phone, instagram</p>
					</>
				)}
				{tabs === TABS.DETAILS && (
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
				)}
			</div>
			{errors && <p className='text-white'>{errors.contactInfo?.website?.message}</p>}
			<PageShown tabs={tabs} />

			<NavigationArrows tabs={tabs} setTabs={setTabs}/>
		</form>
	)
}
export default AddPlace
