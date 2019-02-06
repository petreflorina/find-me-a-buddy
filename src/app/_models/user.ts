import {Profile} from "./profile";
export class User {
    accountId: number;
    email: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    role: string = '';
    profile: Profile;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
