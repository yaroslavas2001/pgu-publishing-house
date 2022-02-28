import Shop from "./common-payments/Shop"
import Enterprise from "./common-payments/Enterprise"
import Operator from "./common-payments/Operator"

export default class PaymentsDetailItem {
    AcceptDate?: Date
    Accept_Date?: Date
    BanknotesSum?: number
    BeepayId?: number
    CanceledInGatewayType?: number
    CheckRequestId?: any
    CoinsSum?: number
    CommissionTotal?: number
    ConfirmationRequestId?: any
    Currency?: number
    Currency_Type?: number
    DefaultCurrency?: number
    DeleteMarkDate?: Date
    Description?: string
    Enterprise?: Enterprise
    EnterpriseState?: number
    FiscalId?: number
    FullSumma?: number
    GatewayAttempts?: number
    GatewayName?: string
    Id?: number
    IsMarkedAsDeleted?: boolean
    IsOffline?: boolean
    IsTranCopy?: boolean
    Note?: any
    Operator?: Operator
    OperatorCurrency?: any
    OperatorId?: number
    OperatorName?: string
    PayNotes?: any
    PaymentType?: number
    PaymentTypeName?: string
    PercentPos?: number
    Phone?: string
    PosAddress?: string
    PosCode?: string
    Rate?: number
    ReportState?: number
    Request1Date?: Date
    Request1Error?: number
    Request1Id?: string
    Request2Date?: Date
    Request2Error?: number
    Request2Id?: string
    RequestError?: number
    RequestErrorDescription?: string
    Shop?: Shop
    Status?: number
    StatusDate?: Date
    StatusName?: string
    StatusType?: number
    Summ?: number
    Summa?: number
    TransactionDate?: Date
    TransactionNumber?: any
    WMnotes?: any
}