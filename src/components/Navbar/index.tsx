import { Link } from 'react-router-dom'
import NavMenu from '../NavMenu'
import { useEffect, useState } from 'react'
import PlusIcon from '../Icons/PlusIcon'
import RemoteOfficeLogo from '../Icons/RemoteOfficeLogo'

function getWindowSize() {
	const { innerWidth } = window
	return innerWidth
}

const Navbar = () => {
	// TODO: GEOLOCATION
	// navigator.geolocation.getCurrentPosition(
	// 	({ coords: { latitude, longitude, accuracy } }) => {
	// 		console.log({ latitude, longitude, accuracy })
	// 	},
	// 	(err) => console.log(err),
	// 	{ enableHighAccuracy: true }
	// )
	const [width, setWidth] = useState<number>(getWindowSize())

	useEffect(() => {
		function handleWindowResize() {
			setWidth(getWindowSize())
		}

		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	return (
		<nav className='mb-8 flex items-end justify-between'>
			<div className='flex items-baseline gap-12'>
				<h2>
					<Link to={'/'} className='text-2xl'>
						<RemoteOfficeLogo />
					</Link>
				</h2>
				{width >= 768 && (
					<span className='justify-self-start'>
						<Link to={'/login'}>
							<span className='flex gap-1 items-center'>
								<PlusIcon />
								Add a place
							</span>
						</Link>
					</span>
				)}
			</div>
			<div>
				<ul className='flex gap-2 items-center'>
					<NavMenu width={width} />
				</ul>
			</div>
		</nav>
	)
}
export default Navbar
