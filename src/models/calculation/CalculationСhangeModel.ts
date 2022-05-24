export default class CalculationСhangeModel {
    Circulation: number = 0
    Volume: number = 0

    IsEditing: boolean = false
    IsFirstProofreading: boolean = false
    IsRevision: boolean = false
    IsTyping: boolean = false
    IsPrototyping: boolean = false
    IsReplication: boolean = false
    IsColor:boolean=false
    constructor(obj?: Partial<CalculationСhangeModel>) {
        obj && Object.assign(this, obj);
    }
}