import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../components/Input';
import InputLegend from '../../../components/InputLegend';
import { FormValues, TABS, TagsTypes } from '../types';
import Select, {
	ClearIndicatorProps,
	GroupBase,
	MultiValueRemoveProps,
	components,
} from 'react-select';
import FormError from '../../../components/FormError';
import { CSSProperties, useEffect, useState } from 'react';
import CloseIcon from '../../../components/Icons/CloseIcon';
import { useAddPlace } from '../../../context/addPlace/useAddPlace';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { placeService } from '../../../utils/services/placeService';
import { utilServices } from '../../../utils/services';
import Arrow from '../../../components/Icons/Arrows';
import Button from '../../../components/Button';

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

type Urls = { url: string; filename: string; file: File };
type ErrorField = { path: string; message: string };

// Component Starts here
const DetailsTab = () => {
	const [photos, setPhotos] = useState<Urls[]>([]);
	const [photoData, setPhotoData] = useState<FormData>();
	const [tags, setTags] = useState<TagsFields[]>([]);
	const [customErrors, setCustomErrors] = useState<ErrorField[]>([]);
	const { formData, setFormData } = useAddPlace();

	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		register,
		setValue,
		unregister,
		getValues,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: formData });

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

	const ClearIndicator = (props: ClearIndicatorProps<TagsFields, true, GroupBase<TagsFields>>) => {
		const {
			getStyles,
			innerProps: { ref, ...restInnerProps },
		} = props;
		const previousClickEvent = props.innerProps.onMouseDown;
		props.innerProps.onMouseDown = (event) => {
			unregister(`tags`);
			setValue('tags', undefined);
			const newTags = getValues('tags');
			setFormData({ ...formData, tags: newTags });

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
					const newUrl = URL.createObjectURL(file);
					if (!urls.find((url: Urls) => url.filename === file.name)) {
						urls.push({ url: newUrl, filename: file.name, file });
					}
				});
			}

			urls.forEach(({ file }) => {
				let found: boolean = false;
				data.forEach((entry) => {
					const entryValue = entry.valueOf();
					if (typeof entryValue === 'object' && 'name' in entryValue) {
						if (entryValue.name === file.name) found = true;
					}
				});
				if (!found) {
					data.append('images', file);
				}
			});

			return urls;
		});

		setPhotoData(data);
	};

	const removePicture = (filename: string) => {
		setPhotos((previousPhotos) => {
			const newPhotos = previousPhotos.filter((photo) => photo.filename !== filename);

			photoData?.delete('images');
			newPhotos.forEach(({ file }) => photoData!.append('images', file));
			return newPhotos;
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async () => {
		setCustomErrors([]);

		try {
			if (photoData) {
				const { data: photosUploaded } = await utilServices.uploadPhotos(photoData);
				setValue('photos', photosUploaded);
			}
			const newValues = getValues();
			console.log(newValues)
			await placeService.createPlace(newValues);
			reset();
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorsArray = error.response?.data.errors;

				if (Array.isArray(errorsArray)) {
					const errors: ErrorField[] = [];
					errorsArray.forEach((e: { message: string; path: string[]; received?: unknown }) => {
						const path = e.path[e.path.length - 1];
						switch (path) {
							case 'contactInfo':
								errors.push({ path, message: 'Should add at least one contact info' });
								break;
							case 'website':
								errors.push({ path, message: e.message });
								break;
							case 'facebook':
								errors.push({ path, message: e.message });
								break;
							case 'instagram':
								errors.push({ path, message: e.message });
								break;
							case 'telephone':
								errors.push({ path, message: e.message });
								break;
							case 'price':
								errors.push({ path, message: e.message });
								break;
							case 'zipCode':
								errors.push({ path, message: 'Required' });
								break;
							case 'street':
								errors.push({ path, message: 'Required' });
								break;
							case 'city':
								errors.push({ path, message: 'Required' });
								break;
							case 'country':
								break;
							case 'category':
								errors.push({ path, message: 'Choose one category from the existing options' });
								break;
							case 'name':
								errors.push({ path, message: 'Required' });
								break;
							default:
								console.log(`shouldn't be here`);
								break;
						}
					});
					setCustomErrors(errors);
				}
			}
		}
	};

	const returnPreviousPage = () => {
		const values = getValues();
		console.log(values);
		setFormData({ ...formData, ...values });
		navigate(TABS.CONTACT_INFO);
	};

	const getWifiSpeed = () => {
		const index = WIFI_SPEED.findIndex((wifiSpeed) => wifiSpeed.value === getValues('wifiSpeed'));
		return WIFI_SPEED[index];
	};

	useEffect(() => {
		const tags = getValues('tags');
		const recoveredTags: TagsFields[] = [];
		if (tags) {
			Object.keys(tags).forEach((key) => {
				const found = TAGS.find((tag) => tag.value === key);
				found && recoveredTags.push(found);
			});
		}

		setTags(recoveredTags);
	}, [getValues]);

	return (
		<>
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

			<label htmlFor='wifiSpeed'>
				Wi-Fi Speed:
				<Controller
					control={control}
					name='wifiSpeed'
					render={({ field: { onChange } }) => (
						<Select
							onChange={(wifiSpeed) => {
								onChange(wifiSpeed?.value);
							}}
							defaultValue={getWifiSpeed()}
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
					min={0}
					{...register('meetingRoom', {
						valueAsNumber: true,
					})}
				></Input>

				<Input
					label='Bathroom(s)'
					type='number'
					min={0}
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
							onChange={(tags) => {
								const newValue: Record<string, boolean> = {};

								tags.forEach((tag) => {
									const { value } = tag as TagsFields;
									newValue[value] = true;
								});
								setTags([...tags]);
								onChange(newValue);
							}}
							value={[...tags]}
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

			{customErrors.length > 0 &&
				customErrors.map((e: ErrorField) => {
					return (
						<div className='flex gap-2' key={e.path}>
							<span>{e.path}:</span>
							<FormError message={e.message} />
						</div>
					);
				})}

			<div className='flex justify-between'>
				<Arrow next={false} onClick={returnPreviousPage} />
				<Button onClick={handleSubmit(onSubmit)}>Create</Button>
			</div>
		</>
	);
};
export default DetailsTab;
