export class User {
    accountId: number;
    email: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
