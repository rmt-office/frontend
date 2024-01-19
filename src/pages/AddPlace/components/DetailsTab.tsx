import { Controller } from 'react-hook-form';
import Input from '../../../components/Input';
import InputLegend from '../../../components/InputLegend';
import { ControlType, ErrorField, FormValues, RegisterType, TagsTypes, UnregisterType } from '../types';
import Select, { ClearIndicatorProps, MultiValueRemoveProps, components } from 'react-select';
import FormError from '../../../components/FormError';
import { CSSProperties, useState } from 'react';
import CloseIcon from '../../../components/Icons/CloseIcon';

const WIFI_SPEED = [
	{ value: 'Fast', label: 'Fast (greater than 30mbps)' },
	{ value: 'Medium', label: 'Medium' },
	{ value: 'Slow', label: 'Slow (less than 5mbps)' },
];

const TAGS = [
	{ value: 'hasFood', label: 'Free snacks' },
	{ value: 'hasDrink', label: 'Free drinks' },
	{ value: 'hasCafeteria', label: 'Paid foods/drinks' },
	{ value: 'isAccessible', label: 'Acessible' },
	{ value: 'isVegan', label: 'Vegan options' },
	{ value: 'isVegetarian', label: 'Vegetarian options' },
];

type TagsFields = { value: string; label: string };

type Urls = { url: string; filename: string };

const DetailsTab = ({
	register,
	errors,
	control,
	unregister,
	setPhotoData,
}: {
	register: RegisterType;
	errors: ErrorField;
	control: ControlType;
	unregister: UnregisterType;
	setPhotoData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}) => {
	const [photos, setPhotos] = useState<Urls[]>([]);

	const MultiValueRemove = (props: MultiValueRemoveProps) => {
		const previousClickEvent = props.innerProps.onClick;
		props.innerProps.onClick = (event) => {
			if (typeof props.data === 'object' && props.data != null) {
				const getKey = props.data;
				if ('value' in getKey) {
					const key = getKey.value as keyof TagsTypes;
					unregister(`tags.${key}`);
				}
			}
			if (previousClickEvent) {
				previousClickEvent(event);
			}
		};

		return <components.MultiValueRemove {...props}></components.MultiValueRemove>;
	};

	const ClearIndicator = (props: ClearIndicatorProps) => {
		const {
			getStyles,
			innerProps: { ref, ...restInnerProps },
		} = props;
		const previousClickEvent = props.innerProps.onMouseDown;
		props.innerProps.onMouseDown = (event) => {
			unregister(`tags`);

			if (previousClickEvent) {
				previousClickEvent(event);
			}
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

	const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = new FormData();
		setPhotos((previousPhotos) => {
			const urls: Urls[] = [...previousPhotos];
			if (e.target.files) {
				[...e.target.files].forEach((file) => {
					data.append('images', file);
					const newUrl = URL.createObjectURL(file);
					if (!urls.find((url: Urls) => url.filename === file.name)) {
						urls.push({ url: newUrl, filename: file.name });
					}
				});
			}

			return urls;
		});
		setPhotoData(data);
	};

	const removePicture = (filename: string) => {
		setPhotos((previousPhotos) => {
			return previousPhotos.filter((photo) => photo.filename !== filename);
		});
	};

	return (
		<>
			<Input label='Photos' type='file' id='photos' multiple onChange={handlePhotos}></Input>
			{photos && (
				<div className='flex flex-wrap gap-2'>
					{photos.map((photo) => (
						<span className='relative' key={photo.filename}>
							<img src={photo.url} alt={photo.filename} className='max-h-36' />
							<CloseIcon
								handleOpen={() => removePicture(photo.filename)}
								className='bg-white bg-opacity-80 border-2 border-black text-red-700 rounded-full'
							/>
						</span>
					))}
				</div>
			)}

			<Input
				label='Price*'
				type='number'
				id='price'
				placeholder='a value between 1 and 5'
				min={0}
				max={5}
				{...register('price', {
					min: { value: 1, message: 'The minimum price is 1' },
					max: { value: 5, message: 'The maximum price is 5' },
					required: true,
					valueAsNumber: true,
				})}
			>
				<InputLegend>
					<p>The price is a relative measure</p>
					<p>1 is the cheapest and the 5 the most expensive</p>
				</InputLegend>
				{errors?.price && <FormError message={errors.price.message} />}
			</Input>

			<label htmlFor='category'>
				Wi-Fi Speed:
				<Controller
					control={control}
					name='wifiSpeed'
					render={({ field: { onChange } }) => (
						<Select
							onChange={(category) => {
								onChange(category?.value);
							}}
							className='text-black mt-2'
							options={WIFI_SPEED}
						/>
					)}
				/>
			</label>

			<div className='mt-8 flex flex-col gap-4'>
				<p className='text-lg'>Facilities:</p>

				<Input
					label='Meeting room(s)'
					type='number'
					{...register('meetingRoom', {
						valueAsNumber: true,
					})}
				></Input>

				<Input
					label='Bathroom(s)'
					type='number'
					{...register('bathrooms', {
						valueAsNumber: true,
					})}
				></Input>
			</div>

			<div className='mt-8 flex flex-col'>
				<p className='text-lg -mb-2'>Tags:</p>

				<Controller
					control={control}
					name='tags'
					render={({ field: { ref, onChange } }) => (
						<Select
							components={{ MultiValueRemove, ClearIndicator }}
							ref={ref}
							onChange={(e) => {
								const newValue: Record<string, boolean> = {};

								e.forEach((tag) => {
									const { value } = tag as TagsFields;
									newValue[value] = true;
								});

								onChange(newValue);
							}}
							className='text-black my-6'
							options={TAGS}
							isMulti
						/>
					)}
				/>
			</div>

			<label htmlFor='descriptionArea' className='text-lg'>
				Description:
			</label>
			<textarea
				id='descriptionArea'
				cols={30}
				rows={6}
				maxLength={300}
				{...register('description')}
				placeholder='A lovely place (max 300 characters)'
				className='text-black px-2 py-1 mt-1 mb-2 rounded'
			></textarea>
			{errors.contactInfo && 	<FormError message={errors.contactInfo.message} />}
			{errors.contactInfo &&
				Object.keys(errors.contactInfo).map((e) => {
					const value = e as keyof FormValues['contactInfo'];
					return (
						<div className='flex gap-2'>
							<span>{value}:</span>
							<FormError message={errors.contactInfo?.[value]?.message} />
						</div>
					);
				})}
		</>
	);
};
export default DetailsTab;
