export class City {
    cityId: number;
    regionId: number;
    latitude: number;
    longitude: number;
    name: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}