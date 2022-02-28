export default class ReportDetailItem {
	EnterpriseId?: number
    ContractId?:number
    RegionId ?: number
    ShopId?:number
    PosCode?:string
    StatusId?: number
    OperatorId?:number
    PaymentTypeId?:number
    ExcludeCanceledPayments?: boolean
    GroupByShop?:boolean
    GroupByPos?:boolean
    GroupByOperator?:boolean
    GroupByEnterprise?:boolean
    DateStart?:Date
    DateEnd?:Date
}