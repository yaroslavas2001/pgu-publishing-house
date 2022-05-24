export default class CalculationConstModel {
    Id: number = null
    Name: string = null
    constructor(obj?: Partial<CalculationConstModel>) {
        obj && Object.assign(this, obj);
    }
}