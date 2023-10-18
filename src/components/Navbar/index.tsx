import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
	return (
		<nav>
			<h2>
				<Link to={'/'}>Remote Office</Link>
			</h2>
			<div>
				<ul>
					<li>
						<Link to={'/signup'}>Sign Up</Link>
					</li>
					<li>
						<Link to={'/login'}>Login</Link>
					</li>
					<li>
						<Link to={'/logout'}>Logout</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
export default Navbar
