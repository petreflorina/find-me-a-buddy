export class City {
    cityId: number;
    regionId: number;
    latitude: string;
    longitude: string;
    name: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}