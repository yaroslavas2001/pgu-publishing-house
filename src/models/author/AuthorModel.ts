export default class AuthorModel {
    id: number
    firstName: string
    sureName: string
    secondName: string
    constructor(obj?: Partial<AuthorModel>) {
        obj && Object.assign(this, obj);
    }
}