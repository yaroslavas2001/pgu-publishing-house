export default class EnterpriseForOthers {
    State: number 
    TimeDifferenceHours: number 
    QlaunchOperators: any
    PosCode: string = ""
    Shops: any
    PaymentType: number = null
    Operators: any
    NdsCodeDe: string = ""
    EntCodeDe: string = ""
    Code: string = ""
    ContractDate: string 
    ContractNumber: number = null
    Account: string = ""
    Account2: string = ""
    Id: number 
    IsBlocked: boolean
    IsNdsPayer: boolean
    IsMini: boolean
    Name: string = ""
    FullName: string = ""
    Address: string = ""
    PostAddress: string = ""
    Phone: string = ""
    Fax: string = ""
    Email: string = ""
    BankRequisite: string = ""
    BillingType: number = 0
    Inn: string = ""
    Kpp: string = ""
    CashRegister: any = null
    TimeDifference: string = "0"
    FullPayment: number = 1
    AddBalanceType: number = 1
    RewardFromPayPercent: number 
    RewardFromPayAmount: number 
    InsuredLimit: number = null
    InsuredBlockSum: number = null
    InsuredBlockPrice: number = null
    InsuredBlockEndDate: Date
    IsVerified: boolean
    DaysForPay: number 
    AgreementAmount: number = null
    ExtraLimit: number = null
    ReportSendPeriodicity: number 
    EmoneyRegistrationCoast: number = null
    IsCreatePayment: boolean
    LastReportDate: Date = new Date()
    ReportSendTime: string = ""
    ChildEntIdList: []
    AllowedCurrencyList: string[] = []
    SignaturePosition: string = ""
    SignatureFIO: string = ""
    ChiefAccountantFio: string = ""
    CuratorFio: string = ""
    InsertEncashmentPayment: boolean
    ChangeTranDate: boolean
    ShowInReport: boolean = true
    BalanceRecalc: boolean
    ActHeader: string = ""
    EmailSendPeriodicity: string = ""
    Notes: string = ""
    DateAdd: Date = new Date()
    DateChange: Date = new Date()
    ProvisionModel: any
    IsBalanceFromLastAct: boolean
    Editor: any = null
    MaxLimitSize: number = null
    constructor(obj?: Partial<EnterpriseForOthers>) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}