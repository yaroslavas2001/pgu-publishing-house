export default class ReportUpsertItem{
	EnterpriseId?: number
    ContractId?:number
    RegionId ?: number
    ShopId?:number
    PosCode?:string
    StatusId?: number
    OperatorId?:number
    PaymentTypeId?:number
    IsControlFinance?:boolean
    ExcludeCanceledPayments?: boolean
    DateStart?:Date
    DateEnd?:Date
}