import CalculationConstModel from "./CalculationConstModel"
export default class CalculationСhangeModel {
    Circulation: number = 0
    Volume: number = 0

    get paper(): number {
        return (this.Volume * 2 * this.Circulation * 1.15 * 0.43 * 0.3 * 0.07) * this.const.Paper
    }
    get masterFilm(): number {
        return (this.Volume * 4 / 220 * 1.15) * this.const.MasterFilm
    }
    get dye(): number {
        return (this.Volume * 4 * 1.15 * this.Circulation / 5000) * this.const.Dye
    }
    get glue(): number {
        return (1.15 * this.Volume * this.Circulation / 12 * 0.00265) * this.const.Glue
    }
    get cover(): number {
        return (this.Circulation * 1.15) * this.const.Сover
    }
    get otherExpenses():number{
        return (this.paper+this.masterFilm+this.dye+this.glue+this.cover)*0.25
    }
    get all():number{
        return this.paper+this.masterFilm+this.dye+this.glue+this.cover+this.otherExpenses
    }
    const: CalculationConstModel = new CalculationConstModel()

    constructor(obj?: Partial<CalculationСhangeModel>) {
        obj && Object.assign(this, obj);
    }
}