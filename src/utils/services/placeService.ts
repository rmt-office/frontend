import { ApiConnect } from '../../lib/axios'

type NewPlace = {
  name: string,
			category: string,
			contactInfo: {
				website: string,
			},
			price?: number,
			meetingRooms?: number,
			address: {
				country: string,
				city: string,
				street: string,
				zipCode: string,
			},
}

class PlaceService extends ApiConnect {
	constructor() {
		super('places')
	}

	async createPlace(place: NewPlace) {
		return this.post<NewPlace, {data: NewPlace}>('/', place)
	}
}

const placeService = new PlaceService()
export { placeService }
