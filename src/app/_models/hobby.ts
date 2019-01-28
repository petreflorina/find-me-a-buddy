export class Hobby {
    hobbyId: number;
    name: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}