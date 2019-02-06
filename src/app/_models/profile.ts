import {City} from "./city";
import {Hobby} from "./hobby";

export class Profile {
    profileId: number;
    firstName: string = '';
    lastName: string = '';
    gender: string = '';
    birthday: string = '';
    city: City;
    hobbies: Array<Hobby>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}