import ApiDataSource from "@/api/dataSource/api/ApiDataSource";


export default class InitService {
    private api: ApiDataSource
    constructor(api: ApiDataSource) {
        this.api = api;
    }

    private _SettlementType: Array<any>
    private _DeviceType: Array<any>
    private _PosType: Array<any>
    private _StreetType: Array<any>
    private _BuildingType: Array<any>
    private _Color: Array<any>
    private _TechStateList: Array<any>
    private _PosPaymentType: Array<any>
    // public async GetSettlementType(): Promise<Array<any>> {
    //     if (this._SettlementType)
    //         return this._SettlementType;
    //     const res = await this.api.PointOfSalesService.GetSettlementType();
    //     return this._SettlementType = (res.data)
    // }
    // public async GetDeviceType(): Promise<Array<any>> {
    //     if (this._DeviceType)
    //         return this._DeviceType;
    //     const res = await this.api.PointOfSalesService.GetDeviceType();
    //     return this._DeviceType = (res.data)
    // }
    // public async GetPosType(): Promise<Array<any>> {
    //     if (this._PosType)
    //         return this._PosType;
    //     const res = await this.api.PointOfSalesService.GetPosType();
    //     return this._PosType = (res.data)
    // }
    // public async GetStreetType(): Promise<Array<any>> {
    //     if (this._StreetType)
    //         return this._StreetType;
    //     const res = await this.api.PointOfSalesService.GetStreetType();
    //     return this._StreetType = (res.data)
    // }
    // public async GetBuildingType(): Promise<Array<any>> {
    //     if (this._BuildingType)
    //         return this._BuildingType;
    //     const res = await this.api.PointOfSalesService.GetBuildingType();
    //     return this._BuildingType = (res.data)
    // }
    // public async GetColor(): Promise<Array<any>> {
    //     if (this._Color)
    //         return this._Color;
    //     const res = await this.api.PointOfSalesService.GetColor();
    //     return this._Color = (res.data)
    // }
    // public async GetTechStateList(): Promise<Array<any>> {
    //     if (this._TechStateList)
    //         return this._TechStateList;
    //     const res = await this.api.PointOfSalesService.GetTechStateList();
    //     return this._TechStateList = (res.data)
    // }
    // public async GetPosPaymentType(): Promise<Array<any>> {
    //     if (this._PosPaymentType)
    //         return this._PosPaymentType;
    //     const res = await this.api.PosPaymentTypeService.getList();
    //     return null
    // }
}