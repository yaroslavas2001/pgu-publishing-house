export default class AllAuthorModel {
    id: number
    firstName: string
    lastName: string
    sureName: string

    contacts: string
    email: string
    isTeacher: boolean = false

    departmentId: string
    positionId: number
    degreeId:number
    
    nonStuffPosition: string
    nonStuffWorkPlace: string


    constructor(obj?: Partial<AllAuthorModel>) {
        obj && Object.assign(this, obj);
    }
}