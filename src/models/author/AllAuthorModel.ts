export default class AllAuthorModel {
    id: number
    firstName: string
    lastName: string
    sureName: string

    contacts: string
    email: string
    isTeacher: boolean = false

    departmentId: string
    employeerPosition: number
    academicDegree:number
    
    nonStuffPosition: string
    nonStuffWorkPlace: number


    constructor(obj?: Partial<AllAuthorModel>) {
        obj && Object.assign(this, obj);
    }
}