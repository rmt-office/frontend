import { ApiConnect } from '../../lib/axios'

class UtilServices extends ApiConnect {
	constructor() {
		super('api')
	}

	async uploadPhoto(imageFile: FormData) {
		return this.post<FormData, string>('/picture', imageFile)
	}

	async uploadPhotos(imageFile: FormData) {
		return this.post<FormData, string[]>('/pictures', imageFile)
	}
}

const utilServices = new UtilServices()
export { utilServices }
