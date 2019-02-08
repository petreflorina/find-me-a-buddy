import {User} from "./user";
export class Account {
    account: User;
    matchScore: number;
    photo: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}