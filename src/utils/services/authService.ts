import { ApiConnect } from '../../lib/axios'

class AuthService extends ApiConnect {
	constructor() {
		super('auth')
	}

	async signup<TData>(newUser: TData) {
		return this.post('/signup', newUser)
	}
	async login() {}
	async verify() {}
}

const authService = new AuthService()
export { authService }
