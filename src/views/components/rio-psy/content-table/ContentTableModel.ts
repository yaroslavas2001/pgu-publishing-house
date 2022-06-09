export default class ContentTableModel {
    Response:{
        Items:any
        Count:number
    }
    StatusText:string
    constructor(obj?: Partial<ContentTableModel>) {
        obj && Object.assign(this, obj);
    }
}