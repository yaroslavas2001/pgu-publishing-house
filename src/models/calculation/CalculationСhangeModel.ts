import CalculationConstModel from "./CalculationConstModel"
export default class CalculationСhangeModel {
    Circulation: number = 0
    Volume: number = 0

    IsEditing: boolean = false
    IsFirstProofreading: boolean = false
    IsRevision: boolean = false
    IsTyping: boolean = false
    IsPrototyping: boolean = false
    IsReplication: boolean = false

    IsColor: boolean = false
    const: CalculationConstModel = new CalculationConstModel()
    get salary(): number {
        return ((this.IsEditing ? this.const.Editing : 0) +
            (this.IsFirstProofreading ? this.const.FirstProofreading : 0) +
            (this.IsRevision ? this.const.Revion : 0) +
            (this.IsTyping ? this.const.Typing : 0) +
            (this.IsPrototyping ? this.const.Prototyping : 0) +
            (this.IsReplication ? this.const.Replication : 0))
    }
    get contributionsToBudget(): number {
        return this.salary * 0.25
    }
    get paper(): number {
        return this.Circulation <= 50 ? (0.54 * 70 * (100 + 27) / 100 / 2 / 1000) : (0.54 * 70 * (100 + 15) / 100 / 2 / 1000)
    }
    constructor(obj?: Partial<CalculationСhangeModel>) {
        obj && Object.assign(this, obj);
    }
}