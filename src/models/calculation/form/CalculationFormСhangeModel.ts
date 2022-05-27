import CalculationFormConstModel from "./CalculationFormConstModel"
export default class CalculationFormСhangeModel {
    Circulation: number = 0
    IsBuplex: boolean = false
    const: CalculationFormConstModel = new CalculationFormConstModel()
    //    A5
    get paperA5(): number {
        return 0.215 * 0.15 * 0.07 * 1.15 * this.Circulation * this.const.PaperA5
    }
    get dyeA5(): number {
        return this.IsBuplex ? this.Circulation / 12500 * 1.15 * this.const.DyeA5
            : this.Circulation / 12500 * this.const.DyeA5 * 1.15 * 0.5
    }
    get masterFilmA5Part(): number {
        return this.IsBuplex ? 1 / 200 * this.const.MasterFilmA5 * 2
            : 1 / 200 * this.const.MasterFilmA5
    }
    get masterFilmA5(): number {
        return this.Circulation > 3999 ? this.masterFilmA5Part * 2 : this.masterFilmA5Part
    }
    get allA5(): number {
        return this.paperA5 + this.dyeA5 + this.masterFilmA5
    }
    // A4 
    get paperA4(): number {
        return 0.215 * 0.3 * 0.07 * 1.15 * this.Circulation * this.const.PaperA4
    }
    get dyeA4(): number {
        return this.IsBuplex ? this.Circulation/12500*1.15*this.const.DyeA4*2
        :this.Circulation/12500*this.const.DyeA4*1.15
    }
    get masterFilmA4Part(): number {
        return this.IsBuplex ? 1 / 200 * this.const.MasterFilmA5 * 2
            : 1 / 200 * this.const.MasterFilmA5
    }
    get masterFilmA4(): number {
        return this.Circulation > 3999 ? this.masterFilmA4Part * 2 : this.masterFilmA4Part
    }
    get allA4(): number {
        return this.paperA4 + this.dyeA4+ this.masterFilmA4
    }
    // A3
    get paperA3(): number {
        return 0.3*0.43*0.07*1.15 * this.Circulation * this.const.PaperA3
    }
    get dyeA3(): number {
        return this.IsBuplex ? this.Circulation / 12500 * 1.15 * this.const.DyeA3 * 4
            : this.Circulation / 12500 * this.const.DyeA3 * 1.15*2
    }
    get masterFilmA3Part(): number {
        return this.IsBuplex ? 1 / 200 * this.const.MasterFilmA5 * 2
            : 1 / 200 * this.const.MasterFilmA5
    }
    get masterFilmA3(): number {
        return this.Circulation > 3999 ? this.masterFilmA3Part * 2 : this.masterFilmA3Part
    }
    get allA3(): number {
        return this.paperA3 + this.dyeA3 + this.masterFilmA3
    }
    constructor(obj?: Partial<CalculationFormСhangeModel>) {
        obj && Object.assign(this, obj);
    }
}