export class User {
    accountId: number;
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    gender: string = '';
    birthday: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
