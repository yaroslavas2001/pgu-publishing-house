import CashRegister from "../common/CashRegister"
import Editor from "../common/Editor"

export default class EnterpriseDetailItem{
    State?:number
    TimeDifferenceHours?:number
    QlaunchOperators?:any
    PosCode?:string
    Shops?:any
    PaymentType?:number
    Operators?:any
    NdsCodeDe?:string
    EntCodeDe?:string
    Code?:string
    ContractDate?:string
    ContractNumber?:number
    Account?:string
    Account2?:string
	Id?: number
	IsBlocked?: boolean
    IsNdsPayer ?: boolean
    IsMini ?: boolean
    Name?: string
    FullName ?:string
    Address?: string
    PostAddress?: string
    Phone?:string
    Fax ?: string
    Email?:string
    BankRequisite?:string
    BillingType?: number
    Inn?: string
    Kpp?: string
    CashRegister ?: CashRegister
    TimeDifference?: string
    FullPayment?:number
    AddBalanceType?:number
    RewardFromPayPercent?: number
    RewardFromPayAmount ?: number
    InsuredLimit?: number
    InsuredBlockSum ?:number
    InsuredBlockPrice?:number
    InsuredBlockEndDate?:Date
    IsVerified?:boolean
    DaysForPay?:number
    AgreementAmount?:number
    ExtraLimit?:number
    ReportSendPeriodicity?:number
    EmoneyRegistrationCoast?:number
    IsCreatePayment?: boolean
    LastReportDate?:Date
    ReportSendTime?: string
    ChildEntIdList?:[]
    AllowedCurrencyList?:string[]
    SignaturePosition?: string
    SignatureFIO?: string
    ChiefAccountantFio	?:string
    CuratorFio?:string
    InsertEncashmentPayment?:boolean
    ChangeTranDate?:boolean
    ShowInReport?:boolean
    BalanceRecalc?: boolean
    ActHeader?:string
    EmailSendPeriodicity?:string
    Notes?:string
    DateAdd?:Date
    DateChange?: Date
    ProvisionModel?:any
    Editor?:Editor
    IsBalanceFromLastAct?:boolean
    MaxLimitSize?: number
}