export default class ReviewerModel {
    Id:number
    firstName: string
    fatgerName: string
    secondName: string
    email:string
    constructor(obj?: Partial<ReviewerModel>) {
        obj && Object.assign(this, obj);
    }
}