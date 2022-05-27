export default class CalculationFormConstModel {
    PaperA5: number = 26.5
    DyeA5:number=970
    MasterFilmA5:number=1779

    PaperA4: number = 26.5
    DyeA4:number=970
    MasterFilmA4:number=1618

    PaperA3: number = 26.5
    DyeA3:number=970
    MasterFilmA3:number=1618
    constructor(obj?: Partial<CalculationFormConstModel>) {
        obj && Object.assign(this, obj);
    }
}