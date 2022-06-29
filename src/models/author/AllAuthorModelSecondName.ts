export default class AllAuthorModelSecondName {
    id: number
    firstName: string
    secondName: string
    sureName: string

    contacts: string
    email: string
    isTeacher: boolean = false

    departmentId: number
    employerPosition: number
    academicDegree:number
    
    nonStuffPosition: string
    nonStuffWorkPlace: string


    constructor(obj?: Partial<AllAuthorModelSecondName>) {
        obj && Object.assign(this, obj);
    }
}