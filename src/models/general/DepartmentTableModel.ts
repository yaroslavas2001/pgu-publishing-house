import ResponseGetAllDepartmentModel from "@/api/plugins/models/Department/ResponseGetAllDepartmentModel";

export default class DepartmentTableModel {
    facultyId:number
    facultyName:string
    departments:Array<ResponseGetAllDepartmentModel>
    constructor(obj?: Partial<DepartmentTableModel>) {
        obj && Object.assign(this, obj);
    }
}