export default class AllAuthorModel {
    id: number
    firstName: string
    lastName: string
    fatherName: string

    contacts:string
    email:string
    isTeacher:boolean = false
    departmentId:string
    positionId:number
    degreeId:number

 
    // PlaceWork: string
    // IdFaculty: number




    constructor(obj?: Partial<AllAuthorModel>) {
        obj && Object.assign(this, obj);
    }
}