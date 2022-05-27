import CalculationConstModel from "./CalculationConstModel"
export default class CalculationСhangeModel {
    Circulation: number = 8
    Volume: number = 8

    IsEditing: boolean = false
    IsFirstProofreading: boolean = false
    IsRevision: boolean = false
    IsTyping: boolean = false
    IsPrototyping: boolean = false
    IsReplication: boolean = true

    const: CalculationConstModel = new CalculationConstModel()
    get salary(): number {
        return ((this.IsEditing ? this.const.Editing*this.Volume : 0) +
            (this.IsFirstProofreading ? this.const.FirstProofreading*this.Volume : 0) +
            (this.IsRevision ? this.const.Revion*this.Volume : 0) +
            (this.IsTyping ? this.const.Typing*this.Volume : 0) +
            (this.IsPrototyping ? this.const.Prototyping*this.Volume : 0) +
            (this.IsReplication ? this.const.Replication * this.Circulation * this.Volume / 100 : 0))
    }
    get householdExpenses(): number {
        return this.salary * 0.15
    }
    get contributionsToBudget(): number {
        return this.salary * 0.25
    }
    get paper(): number {
        return this.Circulation <= 50 ? 0.024003 : 0.021735
    }
    get paperFact(): number {
        return this.paper * this.Circulation * this.Volume * this.const.Paper + this.Circulation * 1.8
    }
    get masterFilm(): number {
        return this.Volume > 50 ? (this.const.MasterFilm * this.VolumeNumber * 2054.86)
            : (this.const.MasterFilm * this.VolumeNumber * 2045.85)
    }
    get dye(): number {
        console.log(this.const.Dye, this.Circulation, this.VolumeNumber)
        console.log(this.const.Dye * this.Circulation * this.VolumeNumber * 1003.3)
        return this.Circulation < 50 ?
            (this.const.Dye * this.Circulation * this.VolumeNumber * 1003.3) :
            (this.const.Dye * this.Circulation * this.VolumeNumber * 1115.5)
    }
    get VolumeNumber(): number {
        return Number(this.Volume + 0.25)
    }
    get glue(): number {
        return this.Volume > 6 ? (this.Circulation * this.const.Glue * 193 * 1.15 * (this.Volume / 11)) : 0
    }
    get staples(): number {
        return this.Circulation * this.const.Staples * 2.6
    }
    get otherExpenses(): number {
        return (this.paperFact + this.dye + this.masterFilm) * this.const.OtherConsumables
    }
    get expendableMaterials(): number {
        return this.paperFact + this.dye + this.glue + this.staples + this.masterFilm + this.otherExpenses
    }

    get acquisitionOfOF(): number {
        return this.Circulation * this.Volume * this.const.AcquisitionOfOF
    }
    //NEN
    get paymentForGoods(): number {
        return this.householdExpenses + this.expendableMaterials
    }

    get all(): number {
        return this.contributionsToBudget + this.salary + this.acquisitionOfOF + this.paymentForGoods
    }
    get one(): number {
        return this.all / this.Circulation
    }
    constructor(obj?: Partial<CalculationСhangeModel>) {
        obj && Object.assign(this, obj);
    }
}