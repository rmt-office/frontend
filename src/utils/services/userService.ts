import { ApiConnect } from '../../lib/axios'

interface Base {
	currentPassword: string
}
export interface UserUpdate extends Base {
	email: string
	password: string
}

export interface PasswordUpdate extends Base {
	confirmPassword: string
	password: string
}

interface PhotoUpload {
	profilePicture: string
}

class UserService extends ApiConnect {
	constructor() {
		super('user')
	}

	async uploadPhoto(photo: PhotoUpload) {
		return this.put('/photo', photo)
	}
	async updateUser(user: UserUpdate | PasswordUpdate) {
		return this.put('/', user)
	}
}

const userService = new UserService()
export { userService }
