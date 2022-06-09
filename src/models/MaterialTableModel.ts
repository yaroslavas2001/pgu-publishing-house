export default class MaterialTableModel {
    Response: {
        Items: Array<{
            id: number
            name: string
            status: number
            autors: Array<number>
        }>
        Count: number
    }
    StatusText: string
    constructor(obj?: Partial<MaterialTableModel>) {
        obj && Object.assign(this, obj);
    }
}