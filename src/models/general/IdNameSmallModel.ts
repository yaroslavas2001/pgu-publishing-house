export default class IdNameSmallModel {
    id: number = null
    name: string = null
    constructor(obj?: Partial<IdNameSmallModel>) {
        obj && Object.assign(this, obj);
    }
}