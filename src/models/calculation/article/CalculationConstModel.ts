export default class CalculationConstModel {
    
    Paper:number=17.5
    MasterFilm:number=1157.8
    Dye:number=586
    Glue:number=360
    Сover:number=1.5
    

    constructor(obj?: Partial<CalculationConstModel>) {
        obj && Object.assign(this, obj);
    }
}