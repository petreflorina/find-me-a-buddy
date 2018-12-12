export class User {
    accountId: number;
    email: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
