import { ApiConnect } from '../../lib/axios';
import { FormValues } from '../../pages/AddPlaceSplit/types';

type NewPlace = FormValues

class PlaceService extends ApiConnect {
	constructor() {
		super('places');
	}

	async createPlace(place: NewPlace) {
		return this.post<NewPlace, { data: NewPlace }>('/', place);
	}
}

const placeService = new PlaceService();
export { placeService };
