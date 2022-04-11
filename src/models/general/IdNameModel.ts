export default class IdNameModel {
    Id: number = null
    Name: string = null
    constructor(obj?: Partial<IdNameModel>) {
        obj && Object.assign(this, obj);
    }
}