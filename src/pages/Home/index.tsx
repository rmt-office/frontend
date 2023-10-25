import PageTitle from '../../components/PageTitle'
import magnifyingGlasses from '../../assets/magnifying-glass-1976105_1280.webp'
import HomeButtonGroup from '../../components/HomeButtonGroup'
import Button from '../../components/Button'

const Home = () => {
	return (
		<div className='flex flex-col items-center justify-center mx-auto gap-2'>
			<PageTitle>Remote Office</PageTitle>
			{/* mb-5 text-4xl */}
			<h2 className='-mt-5 text-xl mb-5 font-thin text-gray-400'>
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
					<Button>Café</Button>
					<Button>Coworking</Button>
					<Button>Hotel Lobby</Button>
				</HomeButtonGroup>

				<HomeButtonGroup heading='Looking for'>
					<Button>WiFi Speed</Button>
					<Button>Quietness</Button>
					<Button>Plugs</Button>
					<Button>Meeting Room</Button>
				</HomeButtonGroup>
			</div>
		</div>
	)
}
export default Home
