export class Country {
    countryId: number;
    name: string = '';
    code: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}