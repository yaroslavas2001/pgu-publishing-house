export default class CalculationConstModel {
    Editing: number = 58.7
    FirstProofreading: number =26.96
    Revion: number = 15.48
    Typing: number = 22.61
    Prototyping: number = 16.61
    Replication: number = 39.18
    Paper:number=0
    MasterFilm:number=4/216
    Dye:number=8*2/(15000/2)
    Glue:number=0.0033
    Staples:number=0.1
    OtherConsumables:number=0.25
    AcquisitionOfOF:number=0.12


    ExpendableMaterialsColor:number = 4
    AccessoriesColor:number = 1.6

    constructor(obj?: Partial<CalculationConstModel>) {
        obj && Object.assign(this, obj);
    }
}