import PageTitle from '../../components/PageTitle'
import magnifyingGlasses from '../../assets/magnifying-glass-1976105_1280.webp'
import HomeButtonGroup from '../../components/HomeButtonGroup'
import Button from '../../components/Button'
import { useState } from 'react'

const Home = () => {
	const [modal, setModal] = useState<{ isOpen: boolean; selected: string }>({
		isOpen: false,
		selected: '',
	})

	const handleModal = (selected: string) => {
		setModal((prevModal) => {
			if (prevModal.selected !== selected && prevModal.isOpen) {
				return {
					isOpen: prevModal.isOpen,
					selected,
				}
			}
			if (prevModal.isOpen) {
				return {
					isOpen: false,
					selected: '',
				}
			}
			return {
				isOpen: true,
				selected,
			}
		})
	}

	return (
		<>
			<div
				className={`${
					modal.isOpen &&
					'bg-neutral-800 bg-opacity-95  z-10 w-11/12 h-5/6 absolute left-1/2 -translate-x-1/2'
				}`}
				onClick={() => handleModal(modal.selected)}
			></div>
			<div className='flex flex-col items-center justify-center mx-auto gap-2 z-auto'>
				<PageTitle>Remote Office</PageTitle>
				<h2 className='-mt-5 text-xl mb-5 font-light text-gray-600  dark:text-gray-400'>
					Find your perfect place to work remotely
				</h2>
				<div>
					<div className='flex flex-col gap-1  justify-center relative md:flex-row'>
						<label htmlFor='searchBar'>Search: </label>
						<input
							type='search'
							name='searchBar'
							id='searchBar'
							placeholder='Awesome Café'
							className={`text-black  placeholder:text-slate-400 ps-1 rounded md:min-w-full`}
						/>
						<img
							src={magnifyingGlasses}
							alt='magnifying glasses'
							width={15}
							className='absolute right-5 top-10 -translate-y-1/2 md:-right-2 md:top-1/2'
						/>
					</div>

					<HomeButtonGroup heading='Find a'>
						<Button
							onClick={() => {
								handleModal('Café')
							}}
						>
							Café
						</Button>
						<Button
							onClick={() => {
								handleModal('Coworking')
							}}
						>
							Coworking
						</Button>
						<Button
							onClick={() => {
								handleModal('Hotel Lobby')
							}}
						>
							Hotel Lobby
						</Button>
						<Button
							onClick={() => {
								handleModal('Library')
							}}
						>
							Library
						</Button>
					</HomeButtonGroup>

					<HomeButtonGroup heading='Looking for?'>
						<Button>WiFi Speed</Button>
						<Button>Quietness</Button>
						<Button>Plugs</Button>
						<Button>Meeting Room</Button>
					</HomeButtonGroup>
				</div>

				{modal.isOpen && (
					<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20'>
						<div className='flex flex-col gap-4 bg-neutral-700 border-2 border-solid rounded px-4 py-6 relative'>
							<span
								className='absolute right-2 top-1 text-white hover:cursor-pointer'
								onClick={() => handleModal(modal.selected)}
							>
								X
							</span>
							<p className='mt-4 text-white'>Where do you want to find your {modal.selected}?</p>
							<div className='flex gap-2 justify-center items-baseline'>
								<label htmlFor='searchCity' className='text-white'>
									City:
								</label>
								<input
									id='searchCity'
									className='text-black ps-1 rounded py-1'
									placeholder='Paris'
								/>
								<Button className='py-0.5'>Go</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
export default Home
