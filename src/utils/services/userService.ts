import { ApiConnect } from '../../lib/axios'

// interface User {
// 	email: string
// 	password: string
// }

// interface NewUser extends User {
// 	confirmPassword: string
// 	username?: string
// }

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
}

const userService = new UserService()
export { userService }
