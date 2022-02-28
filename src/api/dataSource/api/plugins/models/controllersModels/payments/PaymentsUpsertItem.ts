import Name from "../common/Name"

export default class PaymentsUpsertItem {
    Id?:number
    TransactionDate?:Date
    Phone?:string
    Summa?:number
    BeepayId?:number
    OperatorName?:string
    Enterprise?:Name
    PointOfSaleCode?:number
    PaymentTypeName?:string //тип не был указан
    RequestErrorDescription?:number
    StatusName?:string // тип не был указан
    FiscalId?:number
    IsOffline?:boolean
    IsTranCopy?:boolean
    // EnterpriseId?:number
    // ShopId?:number
    // PosCode?:string
    // PosTypeId?:number
    // StatusId?:number
    // StatusDateTypeId?:number
    // OnlyTranCopies?:boolean
    // Phone?:string
    // Id?:number
    // Note?:string
    // IdN4Check?:number
    // IdOperator?:number
    // GatewayId?:number
    // OperatorId?:number
    // PaymentTypeId?:number
    // IdFiscal?:number
    // DateStart?:Date
    // DateEnd?:Date
}