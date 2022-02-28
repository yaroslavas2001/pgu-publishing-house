export default class ReportListRequest{
	Id?: number
    Code?:string
    Name?:string
    ContractId?:number
    EnterpriseId?:number
    DateStart?:Date
    DateEnd?:Date
    RegionId?:number
    ShopId?:number
    PosCode?:number
    ReportType?:string
    StatusId?:number
    OperatorId?:number
    IsControlFinance?:boolean
    ExcludeCanceledPayments?:boolean
    PaymentTypeId?:number
    GroupByShop?:boolean
    GroupByPos?:boolean
    GroupByOperator?:boolean
    GroupByEnterprise?:boolean
    IncludeExternalPayments?:boolean
}