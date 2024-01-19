import { ApiConnect } from '../../lib/axios';

interface User {
	email: string;
	password: string;
}

interface NewUser extends User {
	confirmPassword: string;
	username?: string;
}

class AuthService extends ApiConnect {
	constructor() {
		super('auth');
	}

	async signup(newUser: NewUser) {
		return this.post('/signup', newUser);
	}
	async login(user: User) {
		return this.post<User, { token: string }>('/login', user);
	}
	async verify() {
		return this.get('/verify');
	}
}

const authService = new AuthService();
export { authService };
