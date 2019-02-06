import {User} from "./user";
export class Account {
    account: User;
    matchScore: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}